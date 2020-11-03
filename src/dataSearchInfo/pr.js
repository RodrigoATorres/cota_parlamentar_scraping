module.exports = {

    'http://sped.fazenda.pr.gov.br':[
        {
        // ex.: 41200635516139000177650010000133081054417431,
            'chave':{
                selector: 'body > div.GeralXslt > fieldset > table > tbody > tr > td:nth-child(1) > span',
                func: x => x.replace(/[^0-9]/g, '')
            },
            'estab_name':{
                selector: "#NFe > fieldset:nth-child(2) > table > tbody > tr > td.col-2 > span",
            },
            'estab_cnpj':{
                selector: "#NFe > fieldset:nth-child(2) > table > tbody > tr > td:nth-child(1) > span",
            },
            'items_name':{
                selector: "#Prod > fieldset > div > table > tbody > tr > td.fixo-prod-serv-descricao > span",
            },
            'items_qt':{
                selector: "#Prod > fieldset > div > table > tbody > tr > td.fixo-prod-serv-qtd > span",
            },
            'items_un':{
                selector: "#Prod > fieldset > div > table > tbody > tr > td.fixo-prod-serv-uc > span",
            },
            'items_un_value':{
                selector: "#Prod > fieldset > div > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(4) > td:nth-child(1) > span",
            },            
            'items_total_value':{
                selector: "#Prod > fieldset > div > table > tbody > tr > td.fixo-prod-serv-vb > span",
            },
           'total':{
                selector: "#NFe > fieldset:nth-child(1) > table > tbody > tr > td:nth-child(6) > span",
            },        
           'payment_type':{
                selector: "#Cobranca > fieldset > table.toggle.box.opened > tbody > tr > td:nth-child(2) > span",
            },          
           'customer_name':{
                selector: "#DestRem > fieldset > table > tbody > tr:nth-child(1) > td > span",
            },     
           'customer_cpf':{
                selector: "#DestRem > fieldset > table > tbody > tr:nth-child(2) > td:nth-child(1) > span",
            },
            'datetime':{
                selector:'#NFe > fieldset:nth-child(1) > table > tbody > tr > td:nth-child(4) > span',
            }        
        },
    ],

}