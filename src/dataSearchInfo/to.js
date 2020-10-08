module.exports = {

    'http://www.sefaz.to.gov.br':[
        {
            // idDocumento ex.: 6993301,
            'chave':{
                selector: '#j_id_19\\:j_id_2o\\:j_id_39 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)',
            },
            'estab_name':{
                selector: '#j_id_19\\:j_id_1t_content > div:nth-child(1) > div:nth-child(1)',
            },
            'estab_cnpj':{
                selector: "#j_id_19\\:j_id_1v",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'n_items':{
                selector: "#j_id_19\\:j_id_2h_content > div:nth-child(1) > div:nth-child(2)",
            },
            'items_name':{
                selector: "tr.ui-widget-content > td:nth-child(2)",
                func: x=> x.replace("Descrição", '')
            },
            'items_qt':{
                selector: "tr.ui-widget-content > td:nth-child(3)",
                func: x=> x.replace("Quant.", '')
            },
            'items_un':{
                selector: "tr.ui-widget-content > td:nth-child(4)",
                func: x=> x.replace("Val. UnitR$", '')
            },
            'items_un_value':{
                selector: "tr.ui-widget-content > td:nth-child(5)",
                func: x=> x.replace("Val.", '')
            },            
            'items_total_value':{
                selector: "tr.ui-widget-content > td:nth-child(6)",
                func: x=> x.replace("Val. TotalR$", '')
            },
            'total':{
                selector: "#j_id_19\\:j_id_2h_content > div:nth-child(2) > div:nth-child(2)",
                func: x=> x.replace("R$", '')
            },        
            'payment_type':{
                selector: "#respostaWS > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)",
                func: x=> x.replace("div.ui-panelgrid-cell:nth-child(4)", '')
            },          
            'customer_name':{
                selector: "#j_id_19\\:j_id_2o\\:j_id_3f > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)",
            },     
            'customer_cpf':{
                selector: "#j_id_19\\:j_id_2o\\:j_id_3f > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)",
            },            
        },
    ],

    'http://apps.sefaz.to.gov.br':[
        {
            // idDocumento ex.: 6993515,
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('404 - Not Found')
                },
            'chave':{
                re: /qrcodeNFCe\?p=([0-9]{44})/,
            },
        },
    ],

}