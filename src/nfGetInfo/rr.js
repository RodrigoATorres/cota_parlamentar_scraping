module.exports = {

    RR: [
        {
            url: 'https://portalapp.sefaz.rr.gov.br/nfce/consulta',
            capchaVersion: 'image',
            codeInputSelector: '#vNFCE_NR_DANF',
            captchaImageSelector: '#captchaImage > img',
            captchaInputSelector: '#_cfield',
            confirmSelector: '#TABLE1 > tbody > tr:nth-child(3) > td > input',
            nTries: 3,
            posFunc: async (browser, page) => {
                await page.waitFor(5 * 1000);
                return page
            }
        }
    ],

}


