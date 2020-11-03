module.exports = {

    SP: [
        {
            url: 'https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica/Paginas/ConsultaPublica.aspx',
            capchaVersion: 'recapchaV2',
            siteKey: '6Le-PrMUAAAAABVqWmdkUJK1zdOThsHKiL78gOPp',
            codeInputSelector: '#Conteudo_txtChaveAcesso',
            confirmSelector: '#Conteudo_btnConsultaResumida',
            nTries: 3,
        }
    ],
    SP2: [
        {
            url: 'https://satsp.fazenda.sp.gov.br/COMSAT/Public/ConsultaPublica/ConsultaPublicaCfe.aspx',
            capchaVersion: 'recapchaV2',
            preFunc: async (browser, page) =>{
                await page.evaluate(()=> reCaptchaCallback())
                return page
            },
            siteKey: '6LeEy8wUAAAAAHN6Wu2rNdku25fyHUVgovX-rJqM',
            codeInputSelector: '#conteudo_txtChaveAcesso',
            confirmSelector: '#conteudo_btnConsultar',
            nTries: 3,
        }
    ],

}