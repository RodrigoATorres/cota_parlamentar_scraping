module.exports = {

    'http://nfe.sefaz.go.gov.br':[

        {
            // idDocumento ex.: 7021563,
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('Não foi possível encontrar o XML da nota')
                },
            'chave':{
                re: /danfeNFCe\?p=([0-9]{44})/,
            },
            'error':{
                func: x=>'Acesso negado!'
            }
        }
    
    ],

}