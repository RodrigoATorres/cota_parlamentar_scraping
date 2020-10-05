module.exports = {

    RJ: [
        {
            url: 'http://www4.fazenda.rj.gov.br/consultaDFe/paginas/consultaChaveAcesso.faces',
            capchaVersion: 'image',
            codeInputSelector: '#chaveAcesso',
            captchaImageSelector: '#showphoto',
            captchaInputSelector: '#captcha',
            confirmSelector: '#consultar',
            nTries: 3,
            waitForSelector:'#linhaTotal > span',
            // posFunc: async (browser, page) => {
            //     await page.click('#PORTAL_NFE_IMPRESSORA > a:nth-child(1) > img')
            //     return page
            // }
        }
    ],

}


