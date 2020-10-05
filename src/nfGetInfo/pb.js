module.exports = {

    PB: [
        {
            url: 'https://www4.sefaz.pb.gov.br/atf/seg/SEGf_AcessarFuncao.jsp?cdFuncao=FIS_1410&chNFe=',
            preFunc: async (browser, page) =>{
                await page.goto('https://www4.sefaz.pb.gov.br/atf/fis/FISf_ConsultarNFCE.do?limparSessao=true&chNFe=')
                return page
            },
            capchaVersion: 'recapchaV2',
            codeInputSelector: 'body > table > tbody > tr:nth-child(2) > td > form > table > tbody > tr:nth-child(2) > td > input',
            siteKeySelector: '#recaptcha > div.g-recaptcha',
            confirmSelector: 'body > table > tbody > tr:nth-child(2) > td > form > table > tbody > tr:nth-child(4) > td > input.botoes',
            nTries: 3,
            posFunc: async (browser, page) =>{
                await page.waitForSelector('body > table > tbody > tr:nth-child(2) > td > form > table > tbody > tr:nth-child(4) > td > input:nth-child(3)')
                await page.click('body > table > tbody > tr:nth-child(2) > td > form > table > tbody > tr:nth-child(4) > td > input:nth-child(3)')
                return page
            }
        }
    ],

}