require('dotenv').config()
const fs = require('fs');
const util = require('util');
const rename = util.promisify(fs.rename);
const request = require("request-promise-native");

const vision = require('@google-cloud/vision');
const visionClient = new vision.ImageAnnotatorClient();
const { exec } = require("child_process");
const ioHook = require('iohook');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const extract = util.promisify(require('pdf-text-extract'))


const allInfo = require('./doc_info')


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}   

async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
}

const getImageText = async (filename) => {
    // Performs label detection on the image file
    const [result] = await visionClient.documentTextDetection(filename, {languageHints: "Korean"});
    return result.fullTextAnnotation.text;
}

const getKeyFromPDF = async(filePath) =>{
    let text = await extract(filePath, { splitPages: false })
    console.log(text)
    text = text.reduce( (el, prev) => prev+el, '')
    regexs = [
        /([0-9]{2}-[0-9]{2}\/[0-9]{2}-[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}-55-[0-9]{3}-[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{3}\.[0-9]{3}\.[0-9]{4})/,
        /([0-9]{2}-[0-9]{4}-[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}-55-[0-9]{3}-[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{1})/,
        /([0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4} 55[0-9]{2} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4})/,
    ]
    let matches = regexs.reduce((prev, re) =>{
        if (text.match(re) && text.match(re)[1]){
            return prev.concat( [text.match(re)[1].replace(/\D+/g, '')])
        }
        else{
            return prev
        }
    }, [])
    return matches
}


if (require.main === module) {
    require('dotenv').config()

    let wait = true;

    ioHook.start();

    ioHook.registerShortcut([29, 42, 56], async (keys) => {
        await exec('xclip -selection clipboard -t image/png -o > tmp.png')
        await sleep(200)
        wait=false
    });

    const MongoClient = require('mongodb').MongoClient
    const MONGO_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_ADDRES}/${process.env.DB_NAME}?authSource=admin`;
    console.log(MONGO_URL)

    MongoClient
    .connect(
        MONGO_URL
    )
    .then( async(db) =>{

        let browser = await puppeteer.launch({
            headless: false,
            slowMo: 10,
            defaultViewport: null,
            ignoreHTTPSErrors: true,
        });
        let page = await browser.newPage();
        
        let dbObj = db.db('cota_parlamentar')

        for (let info of allInfo){
            let res = await dbObj.collection('despesas').find({"descricao":'COMBUSTÍVEIS E LUBRIFICANTES.', 'nomeParlamentar':info[0], 'valorLiquido':info[1]}).toArray()
            for (el of res){
                console.log(el.urlDocumento)
                if ( el.urlDocumento  && (el.urlDocumento.includes('.pdf')) && (!el.chaveOCR)  && (!el.chavePDF)){
                    await downloadPDF(el.urlDocumento, `./nfPdfs/${el.idDocumento}.pdf`);

                    let extract_key = await(getKeyFromPDF(`./nfPdfs/${el.idDocumento}.pdf`))

                    if (extract_key.length >0){
                        console.log(extract_key)
                        await dbObj.collection('despesas').updateOne({idDocumento:el.idDocumento}, {$set:{chavePDF:extract_key}})
                    }
                    else{
                        page.goto(el.urlDocumento)
                        while (wait){await sleep(200)}
                        wait = true
                        await rename(`./tmp.png`, `./unprocessedKeyImages/${el.idDocumento}.png`)
                        await sleep(200)
                        let guessKey = await getImageText(`./unprocessedKeyImages/${el.idDocumento}.png`)
                        await dbObj.collection('despesas').updateOne({idDocumento:el.idDocumento}, {$set:{chaveOCR:guessKey}})
                    }
                }
            }
            console.log('finished')


        }

    });
}


