module.exports = {

    DF: [
        {
            url: 'https://dec.fazenda.df.gov.br/AConsulta.aspx?tp=consultaCompleta',
            preFunc: async (browser, page) => {
                page.on('dialog', async dialog => {
                    await page.waitFor(1 * 1000);
                    await dialog.accept();
                });
                return page
            },
            capchaVersion: 'image',
            codeInputSelector: '#txtChaveAcessoNFe',
            captchaImageSelector: '#imgC > img',
            captchaInputSelector: '#CodImg',
            confirmSelector: '#btnContinuar',
            nTries: 3,
            // posFunc: async (browser, page) => {
            //     await page.click('#PORTAL_NFE_IMPRESSORA > a:nth-child(1) > img')
            //     return page
            // }
        }
    ],

}


