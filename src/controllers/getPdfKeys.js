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

const dbObj = require('./dbConnection')


const allInfo = require('../doc_info')


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
    console.log(result)
    return result.fullTextAnnotation.text;
}

const getKeyFromPDF = async(filePath) =>{
    let text = await extract(filePath, { splitPages: false })

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

module.exports = async (docIdsList) =>{
    console.log(docIdsList)
    let wait = true;

    ioHook.start();

    // Control
    ioHook.registerShortcut([29, 42, 56], async (keys) => {
        await exec('xclip -selection clipboard -t image/png -o > tmp.png')
        await sleep(200)
        wait=false
    });

    let browser = await puppeteer.launch({
        headless: false,
        slowMo: 10,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
    });
    let page = await browser.newPage();
    
    const allInfo = []

    for (let docId of docIdsList){

        let res = await dbObj.collection('despesas').findOne({"idDocumento":docId})

        if (!res || !res.urlDocumento.includes('.pdf')){
            allInfo.push({})
            continue
        }
        if (res.infoChave){
            allInfo.push(res.infoChave)
            console.log('Já tem info')
            continue
        }

        let pdfPath = `./files/nfPdfs/${res.idDocumento}.pdf`

        let info = {}
        info.keysFromText = await(getKeyFromPDF(pdfPath))

        if (info.keysFromText.length == 0){
            page.goto(`file://${process.cwd()}/${pdfPath}`)
            while (wait){await sleep(200)}
            wait = true
            await rename(`./tmp.png`, `./files/keyImages/${res.idDocumento}.png`)
            await sleep(200)
            info.keyImage = `./files/keyImages/${res.idDocumento}.png`

            if (process.env.GOOGLE_APPLICATION_CREDENTIALS){
                info.keyFromOcr = await getImageText(`./files/keyImages/${res.idDocumento}.png`)
            }
            else{
                info.keyFromOcr = ''
            }
        }

        await dbObj.collection('despesas').updateOne({idDocumento:res.idDocumento}, {$set:{infoChave:info}})
        allInfo.push(info)
    }

    browser.close()

    return allInfo

}