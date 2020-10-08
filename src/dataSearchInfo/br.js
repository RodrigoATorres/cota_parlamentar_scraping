module.exports = {

    'https://www.sefazvirtual.fazenda.gov.br':[

        {
            // idDocumento ex.: 7057849
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('403 - Forbidden: Access is denied.')
                },
            'chave':{
                re: /NFeAutorizacao4.asmx\?p=([0-9]{44})/,
            },
            'error':{
                func: x=>'Acesso negado!'
            }
        }
    
    ],

}