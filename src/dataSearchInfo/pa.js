module.exports = {

    'https://appnfc.sefa.pa.gov.br':[
        {
            // idDocumento ex.: 6999988,
            'chave':{
                selector: '#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1)',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: '#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)',
            },
            'estab_cnpj':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'n_items':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)",
            },
            'items_name':{
                func: x=> ''
            },
            'items_qt':{
                func: x=> ''
            },
            'items_un':{
                func: x=> ''
            },
            'items_un_value':{
                func: x=> ''
            },            
            'items_total_value':{
                func: x=> ''
            },
            'total':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)",
                func: x=> x.replace("R$", '')
            },        
            'payment_type':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)",
                func: x=> x.replace("div.ui-panelgrid-cell:nth-child(4)", '')
            },          
            'customer_name':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /\ \-\ ([A-Za-z,\s]+)/,
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },     
            'customer_cpf':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /CPF:[\s]+([0-9,\.\-]+)/,
            },            
        },
        {
            // idDocumento ex.: 7003443,
            'chave':{
                selector: '#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1)',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: '#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)',
            },
            'estab_cnpj':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'n_items':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)",
            },
            'items_name':{
                func: x=> ''
            },
            'items_qt':{
                func: x=> ''
            },
            'items_un':{
                func: x=> ''
            },
            'items_un_value':{
                func: x=> ''
            },            
            'items_total_value':{
                func: x=> ''
            },
            'total':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)",
                func: x=> x.replace("R$", '')
            },        
            'payment_type':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)",
                func: x=> x.replace("div.ui-panelgrid-cell:nth-child(4)", '')
            },          
            'customer_name':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /\ \-\ ([A-Za-z,\s]+)/,
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },     
            'customer_cpf':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /CPF:[\s]+([0-9,\.\-]+)/,
            },
        },

        {
            // idDocumento ex.: 6999988,
            'chave':{
                selector: '#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1)',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: '#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)',
            },
            'estab_cnpj':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'n_items':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)",
            },
            'items_name':{
                func: x=> ''
            },
            'items_qt':{
                func: x=> ''
            },
            'items_un':{
                func: x=> ''
            },
            'items_un_value':{
                func: x=> ''
            },            
            'items_total_value':{
                func: x=> ''
            },
            'total':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)",
                func: x=> x.replace("R$", '')
            },        
            'payment_type':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)",
                func: x=> x.replace("div.ui-panelgrid-cell:nth-child(4)", '')
            },          
            'customer_name':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /\ \-\ ([A-Za-z,\s]+)/,
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },     
            'customer_cpf':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /CPF:[\s]+([0-9,\.\-]+)/,
            },            
        },
    ],

}