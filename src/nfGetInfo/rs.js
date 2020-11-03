module.exports = {

    RS: [
        {
            url: 'https://dfe-portal.svrs.rs.gov.br/Dfe/ConsultaPublicaDfe?chaveNFe=',
            capchaVersion: 'recapchaV2',
            codeInputSelector: '#ChaveAcessoDfe',
            siteKeySelector: '.g-recaptcha',
            confirmSelector: '#frmConsulta > button.btn.btn-primary',
            nTries: 3,
            posFunc: async (browser, page) => {
                await page.waitFor(10 * 1000);
                return page
            }
        }
    ],

}