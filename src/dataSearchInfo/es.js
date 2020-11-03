module.exports = {

    'http://app.sefaz.es.gov.br':[
        {
        // ex.: 32200710985134000162650010000188299000204266,
            'chave':{
                selector: '.chave',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: "#u20",
            },
            'estab_cnpj':{
                selector: "#conteudo > div.txtCenter > div:nth-child(2)",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'items_name':{
                selector: "[id^='Item\\ \\+\\ '] > td:nth-child(1) > span.txtTit",
            },
            'items_qt':{
                selector: "[id^='Item\\ \\+\\ '] > td:nth-child(1) > span.Rqtd",
                re: /Qtde.:([0-9,\.]+)/
            },
            'items_un':{
                selector: "[id^='Item\\ \\+\\ '] > td:nth-child(1) > span.RUN",
                re: /UN: (.+)/
            },
            'items_un_value':{
                selector: "[id^='Item\\ \\+\\ '] > td:nth-child(1) > span.RvlUnit",
                re: /Vl. Unit.:[\s]+([0-9,\.]+)/
            },            
            'items_total_value':{
                selector: "[id^='Item\\ \\+\\ '] > td.txtTit.noWrap > span",
            },
           'total':{
                selector: ".txtMax",
            },        
           'payment_type':{
                selector: "#totalNota > div:nth-child(4) > label:nth-child(1)",
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },          
           'customer_name':{
                selector: "div.ui-collapsible:nth-child(3) > div:nth-child(2)",
                re: /Nome:([A-Za-z,\s]+)/,
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')

            },     
           'customer_cpf':{
                selector: "div.ui-collapsible:nth-child(3) > div:nth-child(2)",
                re: /CPF: ([0-9,\.\-]+)/,
            },
            'datetime':{
                selector:'#infos > div:nth-child(1) > div ',
                re: /Emissão: ([0-9]{2}\/[0-9]{2}\/[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2})/
            }        
        },
    ],

}