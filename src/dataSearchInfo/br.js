module.exports = {

    'https://www.sefazvirtual.fazenda.gov.br':[


    
    ],


    'http://nfe.fazenda.gov.br':[
        {
            // idDocumento ex.: 7057849
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('Falha na validação do Captcha.')
                },
            'chave':{
                re: /value="([0-9]{44})"/,
            },
            'error':{
                func: x=>'Erro na validação do captcha'
            }
        },
        {
            'chave':{
                selector: "#conteudoDinamico > div:nth-child(3) > div.GeralXslt > fieldset > table > tbody > tr > td:nth-child(1) > span",
                func:x=>x.replace(/\D+/g, '')
            },
            'estab_name':{
                selector:'#NFe > fieldset:nth-child(2) > table > tbody > tr > td.col-2 > span'
            },
            'estab_cnpj':{
                selector: '#NFe > fieldset:nth-child(2) > table > tbody > tr > td:nth-child(1) > span',
            },
            'children':{
                selector:'#Inf > fieldset > fieldset > fieldset > table > tbody > tr > td',
                re: /Chave de Acesso(.+)/,
                func:x=>x.replace(/\D+/g, '')
            },
            'items_name':{
                selector:'#Prod > fieldset > div > table > tbody > tr > td.fixo-prod-serv-descricao > span'
            },
            'items_qt':{
                selector:'#Prod > fieldset > div > table > tbody > tr > td.fixo-prod-serv-qtd > span'
            },
            'items_un':{
                selector:'#Prod > fieldset > div > table > tbody > tr > td.fixo-prod-serv-uc > span'
            },
            'items_total_value':{
                selector:'#Prod > fieldset > div > table > tbody > tr > td.fixo-prod-serv-vb > span'
            },     
            'total':{
                selector:'#Cobranca > fieldset > table.toggle.box > tbody > tr > td:nth-child(3) > span'
            },
            'customer_name':{
                    selector: '#DestRem > fieldset > table > tbody > tr:nth-child(1) > td > span',
            },
            'customer_cpf':{
                    selector: '#DestRem > fieldset > table > tbody > tr:nth-child(2) > td:nth-child(1) > span',
            },        
        },
    
    ],
}