module.exports = {

    'http://nfce.sefaz.pe.gov.br':[
        {
            'chave':{
                xpath: '//*[@id="currentUrl"]/text()',
                re:/\?p=([0-9]+)\|/
            }
        },
    ]

}