module.exports = {

    'http://www.nfce.sefaz.ma.gov.br':[

        {
            // idDocumento ex.: 7005100,
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('Ocorreu um erro no sistema')
                },
            'chave':{
                re: /\?p=([0-9]{44})/,
            },
            'error':{
                func: x=>'Erro no sistema'
            }
        },
    ],

    'http://nfce.sefaz.ma.gov.br':[

        {
            // idDocumento ex.: 7005100,
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('Ocorreu um erro no sistema')
                },
            'chave':{
                re: /\?p=([0-9]{44})/,
            },
            'error':{
                func: x=>'Erro no sistema'
            }
        },
    ],
    
}