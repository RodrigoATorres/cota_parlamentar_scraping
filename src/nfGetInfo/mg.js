module.exports = {

    MG: [
        {
            url: 'http://nfce.fazenda.mg.gov.br/portalnfce/sistema/consultaarg.xhtml',
            capchaVersion: 'recapchaV2',
            siteKey: '6Ld6lAgTAAAAACxm3XIcuxTeokgjz3TPHeTYP_m5',
            codeInputSelector: '#formPrincipal\\:chaveacesso',
            confirmSelector: '.btn',
            posFunc: async (browser, page) =>{
                await page.waitFor(5000);
                return page
            },
            nTries: 3,
        }
    ],

}