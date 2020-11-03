module.exports = {

    'http://nfce.sefaz.ma.gov.br':[
        {
        // ex.: 21200527125360000176650010000335221047721633,
            'chave':{
                selector: '#j_idt44 > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(5) > td',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: "#j_idt44 > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.NFCCabecalho_SubTitulo",
            },
            'estab_cnpj':{
                selector: "#j_idt44 > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table:nth-child(2) > tbody > tr:nth-child(2) > td",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'items_name':{
                selector: "[id^='Item\\ \\+\\ '] > td:nth-child(2)",
            },
            'items_qt':{
                selector: "[id^='Item\\ \\+\\ '] > td:nth-child(3)",
            },
            'items_un':{
                selector: "[id^='Item\\ \\+\\ '] > td:nth-child(4)",
            },
            'items_un_value':{
                selector: "[id^='Item\\ \\+\\ '] > td:nth-child(5)",
            },            
            'items_total_value':{
                selector: "[id^='Item\\ \\+\\ '] > td:nth-child(7)",
            },
           'total':{
                selector: "#j_idt44 > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)",
            },        
           'payment_type':{
                selector: "#j_idt44 > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(5) > td:nth-child(1)",
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },          
           'customer_name':{
                selector: "#j_idt44 > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(6) > td > table > tbody > tr:nth-child(2) > td",
                re: /Nome:([A-Za-z,\s]+)/,
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },     
           'customer_cpf':{
                selector: "#j_idt44 > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(6) > td > table > tbody > tr:nth-child(2) > td",
                re: /CPF: ([0-9,\.\-]+)/,
            },
            'datetime':{
                selector:'#j_idt44 > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(2) > td',
                re: /Emissão: ([0-9]{2}\/[0-9]{2}\/[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2})/
            }        
        },
    ],

}