module.exports = {

    GO: [
        {
            url: 'http://nfe.sefaz.go.gov.br/nfeweb/sites/nfe/consulta-completa',
            capchaVersion: 'recapchaV2',
            codeInputSelector: '#chaveAcesso',
            siteKeySelector: '.g-recaptcha',
            confirmSelector: 'button.btn:nth-child(2)',
            nTries: 3,
            posFunc: async (browser, page) => {
                await page.waitFor(5 * 1000);
                return page
            }
        }
    ],

}