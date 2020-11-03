const fs = require("fs");
const puppeteer = require('puppeteer-extra')
// const puppeteer = require('puppeteer')
const captchaSolvers = require('../helpers/captchaSolvers');
const clipboardy = require('clipboardy');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const ufFromCode = require('../helpers/ufFromCode');
const nfGetInfo = require('../nfGetInfo');

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}   

String.prototype.format = function () {
    let a = this;
    for (let k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

const downloadNF = async (nfCode, browser = null, delaySecs = 2) => {

    let nfSource = ufFromCode(nfCode);
    if (nfCode.slice(20, 22) == '55'){
        nfSource = 'BR'
    }
    else if (nfCode.slice(20, 22) == '59'){
        nfSource += '2'
    }
    console.log(nfSource)
    let getInfo = nfGetInfo[nfSource];
    if (!getInfo){
        return
    }

    if (!browser) {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 10,
            defaultViewport: null,
            ignoreHTTPSErrors: true,
        });
    }

    const context = await browser.createIncognitoBrowserContext();
    let page = await context.newPage();
    // let page = await browser.newPage();
    await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: `unprocessedNFs/${nfCode}`})

    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font'){
            req.abort();
        }
        else {
            req.continue();
        }
    });
    
    infoLoop:
    for (let info of getInfo) {
        for (let i = 0; i < info.nTries; i++) {
            try {
                let url = info.url.format(nfCode)
                await page.goto(url, {
                    waitUntil: 'networkidle2',
                    timeout: 3000000
                });
                await page.waitFor(delaySecs * 1000);
                if (info.preFunc) {
                    page = await info.preFunc(browser, page)
                }

                if (info['capchaVersion'] == 'recapchaV2') {
                    let siteKey

                    if (info.siteKey) {
                        siteKey = info.siteKey;
                    }
                    else {
                        siteKey = await page.evaluate(`document.querySelector("${info.siteKeySelector}").getAttribute("${info.siteKeyAttr || "data-sitekey"}")`);
                        siteKey = siteKey.replace(/\W/g, '')
                    }

                    await clipboardy.write(nfCode)
                    let input= await page.$(info.codeInputSelector)
                    await input.focus()
                    await page.keyboard.down('Control')
                    await page.keyboard.press('V')
                    await page.keyboard.up('Control')

                    let response = await captchaSolvers.recaptchaV2Solver(siteKey, url)
                    await page.evaluate(`document.getElementById("g-recaptcha-response").innerHTML="${response}";`);

                    if (info.siteKeySelector) {
                        for (let callback_type in ['data-callback', 'on-success']) {
                            let tmp_callback = await page.evaluate(`document.querySelector("${info.siteKeySelector}").getAttribute("${callback_type}")`);
                            if (tmp_callback) {
                                if (tmp_callback.includes('(')) {
                                    await page.evaluate(`${callBack}`)
                                }
                                else {
                                    await page.evaluate(`${callBack}()`)
                                }
                            }
                        }
                    }

                    await page.click(info.confirmSelector);
                    await page.waitFor(delaySecs * 1000);
                }
                if (info['capchaVersion'] == 'image') {

                    await clipboardy.write(nfCode)
                    let input= await page.$(info.codeInputSelector)
                    await input.focus()
                    await page.keyboard.down('Control')
                    await page.keyboard.press('V')
                    await page.keyboard.up('Control')

                    let imageElem = await page.$(info.captchaImageSelector);
                    let base64 = await imageElem.screenshot({
                        encoding: "base64",
                    });
                    let response_img = await captchaSolvers.imageCaptchaV2Solver(base64);
                    await page.type(info.captchaInputSelector, response_img)
                    await page.waitFor(delaySecs * 1000);
                    await page.click(info.confirmSelector)
                    await page.waitFor(delaySecs * 1000);
                }
                if (info['capchaVersion'] == 'hiddenReCaptcha') {
                    await page.waitFor(delaySecs * 1000);
                    await clipboardy.write(nfCode)
                    let input= await page.$(info.codeInputSelector)
                    await page.waitFor(delaySecs * 1000);
                    await input.focus()
                    await page.keyboard.down('Control')
                    await page.keyboard.press('V')
                    await page.keyboard.up('Control')
                    await page.waitFor(delaySecs * 1000);

                    await page.waitFor(delaySecs * 1000);
                    await page.click(info.confirmSelector)
                    await page.waitFor(delaySecs * 1000);
                }

                if (info.waitForSelector){
                    await page.waitForSelector(info.waitForSelector)
                }

                if (info.posFunc) {
                    page = await info.posFunc(browser, page)
                }


                await page.waitFor(delaySecs * 1000);
                let html = await page.content();
                html += `\n<span id='currentUrl'>${page.url()}</span>`
                fs.writeFileSync(`./unprocessedNFs/${nfCode}.html`, html);
                await page.screenshot({path: `./unprocessedNFs/${nfCode}.png`});

                for (const [idx, frame] of page.mainFrame().childFrames().entries()){
                    let html = await frame.content();
                    fs.writeFileSync(`./unprocessedNFs/${nfCode}_frame${idx+1}.html`, html);
                }

                break infoLoop;
            }
            catch {
                console.log('error', nfCode)
            }
        }
    }
    await page.close();
}
module.exports.downloadNF = downloadNF;


const downloadNfList = async(nfList) =>{

    let browser = await puppeteer.launch({
        headless: false,
        slowMo: 10,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
    });
    
    for (nfCode of nfList){
        await downloadNF(nfCode, browser)
    }
}

const  paralalelDonwloadNfList = async (nfList, nJobs, rewrite = false) =>{
    console.log(nfList)
    nfList = [... new Set(nfList)]
    if (!rewrite){
        nfList = nfList.filter(x => !fs.existsSync(`./unprocessedNFs/${x}.html`))
        // console.log(`./unprocessedNFs/${x}.html`)
    }
    console.log(nfList)

    let i,j,temparray,chunk = Math.ceil(nfList.length/nJobs);
    for (i=0,j=nfList.length; i<j; i+=chunk) {
        temparray = nfList.slice(i,i+chunk);
        await sleep(1000)
        downloadNfList(temparray)
    }

}


if (require.main === module) {

    // let nfList = require('../../list_children.json')
    let nfList = require('../../error_codes.json')
    // downloadNF('50200602394473000146650010003142721064020423')
    paralalelDonwloadNfList(nfList, 15, true)


    // require('dotenv').config()

    // const MongoClient = require('mongodb').MongoClient
    // const MONGO_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_ADDRES}/${process.env.DB_NAME}?authSource=admin`;
    // console.log(MONGO_URL)

    // MongoClient
    // .connect(
    //     MONGO_URL
    // )
    // .then( async(db) =>{
        
    //     let dbObj = db.db('cota_parlamentar')
    //     let nfList = []

    //     let res = await dbObj.collection('despesas').find({"descricao":'COMBUSTÍVEIS E LUBRIFICANTES.', 'chave':{'$exists':true}}).toArray()
    //     for (let el of res){
    //         if (!fs.existsSync(`unprocessedNFs/${el.chave}.html`)){
    //             nfList.push(el.chave)
    //             console.log(2, el.idDocumento)
    //         }
    //     }

    //     res = await dbObj.collection('despesas').find({"descricao":'COMBUSTÍVEIS E LUBRIFICANTES.', 'chavePDF':{'$exists':true}}).toArray()
    //     for (let el of res){
    //         if (!fs.existsSync(`unprocessedNFs/${el.chavePDF[0]}.html`)){
    //             nfList.push(el.chavePDF[0])
    //             console.log(1, el.idDocumento)
    //         }
    //     }
        
    //     console.log(nfList)
    //     let i,j,temparray,chunk = Math.ceil(nfList.length/9);
    //     for (i=0,j=nfList.length; i<j; i+=chunk) {
    //         temparray = nfList.slice(i,i+chunk);
    //         downloadNfList(temparray)
    //     }

    // });
}




// downloadNF('53200107822636000168650010005588641325055266');
// downloadNF('26191270081518000182650030000659761551909706'); 
// downloadNF('24200110797331000239650010002712171536061059');
// downloadNF('14200101468484000160650010000435331128905442');
// downloadNF('43200111115559000183650010001210501001225007');
// downloadNF('15191015329606000142650650001651331299909901');
// downloadNF('17200108036185000104650020001735591453348955');
// downloadNF('22200109641208000164650040000111831234298181');
// downloadNF('33200101904245000106650050000004381000012921');
// downloadNF('25200105747008000130651250001218811001298628');
// downloadNF('21200129018539000311650020000150341542040894');
// downloadNF('16200109405430000400650030000900661002006657');
// downloadNF('32200139385059000180650010000738231000931152');
// downloadNF('28191207855647000144650010007334531012548159');
// downloadNF('12200103492648000200650020001278581967439834');
// downloadNF('27200112630679000181650030002741601896042686');
// downloadNF('29200211170833000117650010003572859001603495');