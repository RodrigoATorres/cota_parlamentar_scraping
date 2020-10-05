module.exports = {

    BR: [
        {
            url: 'http://www.nfe.fazenda.gov.br/portal/consultaRecaptcha.aspx?tipoConsulta=completa&tipoConteudo=XbSeqxE8pl8=',
            capchaVersion: 'recapchaV2',
            codeInputSelector: '#ctl00_ContentPlaceHolder1_txtChaveAcessoResumo',
            siteKeySelector: '#ctl00_ContentPlaceHolder1_pnlBotoes > div.g-recaptcha',
            confirmSelector: '#ctl00_ContentPlaceHolder1_btnConsultar',
            nTries: 3,
            addFunc: async (browser, page) => {
                await page.click('#ctl00_ContentPlaceHolder1_hplImprimir')
                await page.waitFor(1 * 1000);
                const newTarget = await browser.waitForTarget(target => target.opener() === page.target()); //check that you opened this page, rather than just checking the url
                const newPage = await newTarget.page(); //get the page object
                await page.close()
                return newPage
            }
        }
    ],

}