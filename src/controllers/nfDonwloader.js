const fs = require("fs");
const puppeteer = require('puppeteer-extra')
const dbObj = require('./dbConnection')
// const puppeteer = require('puppeteer')
const captchaSolvers = require('../helpers/captchaSolvers');
const clipboardy = require('clipboardy');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const ioHook = require('iohook');
const {default: PQueue} = require('p-queue');
const manualCaptchaQueue = new PQueue({concurrency: 1});

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

let wait = true
if (!process.env.ANTI_CAPTCH_API_KEY){

    ioHook.start();

    ioHook.registerShortcut([29, 42, 56], async (keys) => {
        wait=false
    });
}

const manualCaptcha = async (page) =>{
    await manualCaptchaQueue.add(async () =>{
        wait = true
        await page.bringToFront()
        while (wait){await sleep(500); await page.bringToFront()}
        await sleep(1000)
    })
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
    await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: `files/NFs&NFCs/${nfCode}`})

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

                if (!process.env.ANTI_CAPTCH_API_KEY){
                    await clipboardy.write(nfCode)
                    let input= await page.$(info.codeInputSelector)
                    await input.focus()
                    await page.keyboard.down('Control')
                    await page.keyboard.press('V')
                    await page.keyboard.up('Control')
                    await manualCaptcha(page)
                    await page.click(info.confirmSelector);
                    await page.waitFor(delaySecs * 1000);
                }
                else if (info['capchaVersion'] == 'recapchaV2') {
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
                else if (info['capchaVersion'] == 'image') {

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
                else if (info['capchaVersion'] == 'hiddenReCaptcha') {
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
                fs.writeFileSync(`./files/NFs&NFCs/${nfCode}.html`, html);
                await page.screenshot({path: `./files/NFs&NFCs/${nfCode}.png`});

                for (const [idx, frame] of page.mainFrame().childFrames().entries()){
                    let html = await frame.content();
                    fs.writeFileSync(`./files/NFs&NFCs/${nfCode}_frame${idx+1}.html`, html);
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

module.exports.paralalelDonwloadNfList = async (nfList, nJobs, rewrite = false) =>{
    console.log(nfList)
    nfList = [... new Set(nfList)]
    if (!rewrite){
        nfList = nfList.filter(x => !fs.existsSync(`./files/NFs&NFCs/${x}.html`))
        // console.log(`./files/NFs&NFCs/${x}.html`)
    }
    console.log(nfList)

    let temparray
    let chunk = Math.ceil(nfList.length/nJobs);

    for (let i=0; i<nfList.length; i+=chunk) {
        temparray = nfList.slice(i,i+chunk);
        await sleep(1000)
        console.log(temparray)
        downloadNfList(temparray)
    }

}

module.exports.paralalelDonwloadDocList = async (docIdList, nJobs, rewrite = false) =>{
    let res = await dbObj.collection('despesas').find({idDocumento: { $in: docIdList }}).toArray()
    let nfList = []
    res.forEach(el => el.chave? nfList.push(el.chave): console.log(el))
    await this.paralalelDonwloadNfList(nfList, nJobs, rewrite = false)
}

module.exports.paralalelDonwloadDocChildren = async (docIdList, nJobs, rewrite = false) =>{
    let res = await dbObj.collection('despesas').find({idDocumento: { $in: docIdList }}).toArray()
    let nfList = res.reduce((prev,el) => prev.concat(el.dados.children), [])
    await this.paralalelDonwloadNfList(nfList, nJobs, rewrite = false)
}