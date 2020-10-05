const fs = require("fs");
const puppeteer = require('puppeteer-extra')
const captchaSolvers = require('../helpers/captchaSolvers');
const clipboardy = require('clipboardy');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


const urlFromCode = require('../helpers/ufFromCode');
const nfGetInfo = require('./nfGetInfo');

String.prototype.format = function () {
    let a = this;
    for (let k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

const downloadNF = async (nfCode, browser = null) => {

    if (!browser) {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 10,
            defaultViewport: null,
            ignoreHTTPSErrors: true,
        });
    }

    let page = await browser.newPage();
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
    

    let ufShort = urlFromCode(nfCode);
    let nfSource = nfCode.slice(20, 22) == '55' ? 'BR' : ufShort;
    console.log(nfSource)
    let getInfo = nfGetInfo[nfSource];
    infoLoop:
    for (let info of getInfo) {
        for (let i = 0; i < info.nTries; i++) {
            //           try {

            let url = info.url.format(nfCode)
            await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 3000000
            });
            await page.waitFor(1 * 1000);
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
                await page.waitFor(1 * 1000);
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
                await page.waitFor(1 * 1000);
                await page.click(info.confirmSelector)
                await page.waitFor(1 * 1000);
            }

            if (info.waitForSelector){
                await page.waitForSelector(info.waitForSelector)
            }

            if (info.posFunc) {
                page = await info.posFunc(browser, page)
            }


            await page.waitFor(1 * 1000);
            let html = await page.content();
            html += `\n<span id='currentUrl'>${page.url()}</span>`
            fs.writeFileSync(`./unprocessedNFs/${nfCode}.html`, html);

            for (const [idx, frame] of page.mainFrame().childFrames().entries()){
                let html = await frame.content();
                fs.writeFileSync(`./unprocessedNFs/${nfCode}_frame${idx+1}.html`, html);
            }

            break infoLoop;
            //            }
            //            catch {
            //                
            //            }
        }
    }
    await page.close();
}
module.exports.downloadNF = downloadNF;


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
