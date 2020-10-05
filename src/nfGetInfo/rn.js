module.exports = {

    RN: [
        {
            url: 'https://nfce.set.rn.gov.br/portalDFE/NFCe/ConsultaNFCe.aspx',
            capchaVersion: 'image',
            codeInputSelector: '#ctl03_txt_chave_acesso',
            captchaImageSelector: '#img_captcha',
            captchaInputSelector: '#txt_cod_antirobo',
            confirmSelector: '#btn_consulta_resumida',
            nTries: 3,
            // posFunc: async (browser, page) => {
            //     await page.click('#PORTAL_NFE_IMPRESSORA > a:nth-child(1) > img')
            //     return page
            // }
        }
    ],

}


