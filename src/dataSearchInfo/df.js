module.exports = {

    'https://dec.fazenda.df.gov.br':[
        {
            'chave':{
                selector: '.chave',
                func: x => x.replace(/\s/g, '')
            }
        },
        {
            'chave':{
                xpath: '//*[@id="currentUrl"]/text()',
                re:/\?p=([0-9]+)\|/
            }
        },

    ],

    'https://ww1.receita.fazenda.df.gov.br':[
        {
            // idDocumento ex.: 6992519,
            'chave':{
                selector: '#collapse3 > ul > li > div:nth-child(3) > div > p',
                func: x => x.replace(/\s/g, '')
            }
        },
        {
            // idDocumento ex.: 6992892,
            'chave':{
                selector: '#currentUrl',
                re:/\?Chave=([0-9]+)\&/
            }
        },

    ],   

}