module.exports = {

    PA: [
        {
            url: 'https://app.sefa.pa.gov.br/consulta-nfce/#/resumida',
            capchaVersion: 'recapchaV2',
            codeInputSelector: '#input_3',
            siteKeySelector: '#content > div > div > div > async-loader > div > md-card > md-card-content > form > div.ng-isolate-scope.flex-xs-100.flex-sm-60.flex-md-40.flex-25',
            siteKeyAttr: 'key',
            confirmSelector: '#consultarChave > span',
            nTries: 3,
            posFunc: async (browser, page) => {
                await page.evaluate(`document.querySelector("#consultarChave > span").removeAttribute("disabled");`)
                await page.waitFor(5 * 1000);
                await page.click("#consultarChave > span")
                await page.waitFor(5 * 1000);
                return page
            }
        }
    ],

}
