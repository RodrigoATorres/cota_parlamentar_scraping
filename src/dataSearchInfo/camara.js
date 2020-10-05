module.exports = {

    "https://www.camara.leg.br":[
        {
            'chave':{
                xpath: "//*[local-name()='chdfe']/text()"
            }
        },
        {
            'chave':{
                re: /NFCEC_consulta_chave_acesso.aspx\?p=([0-9]+)\|/
            }
        },
    ]
}