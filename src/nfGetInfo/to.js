module.exports = {

    TO: [
        {
            url: 'http://www.sefaz.to.gov.br/nfce/consulta.jsf',
            capchaVersion: 'recapchaV2',
            siteKey: '6Lc3BmAUAAAAAH-l6pmN_QyMk09swnN3Xxua42K8',
            codeInputSelector: '#form\\:j_id_1h',
            confirmSelector: '#form\\:j_id_1u > span.ui-button-text.ui-c',
            nTries: 3,
            posFunc: async(browser, page) =>{
                await page.click('#j_id_19\\:dynaButton > span.ui-button-text.ui-c')
                await page.waitFor(1 * 1000)
                await page.click('#j_id_19\\:j_id_1j > ul > li:nth-child(3) > a > span.ui-menuitem-text')
                return page
            }
        }
    ],

}