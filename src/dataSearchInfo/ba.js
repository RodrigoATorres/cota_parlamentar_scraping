module.exports = {

    'http://nfe.sefaz.ba.gov.br':[
        {
        // idDocumento ex.: 6992896,
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
                re: /Vl. Unit.: ([0-9,\.]+)/
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
                selector: "#infos > div:nth-child(3) > div > ul > li",
                re: /Nome:([A-Za-z,\s]+)/,
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')

            },     
           'customer_cpf':{
                selector: "div.ui-collapsible:nth-child(3) > div:nth-child(2)",
                re: /CPF: ([0-9,\.\-]+)/,
            },
            'datetime':{
                selector:'#infos > div:nth-child(1) > div > ul > li',
                re: /Emissão:[\s]+([0-9]{2}\/[0-9]{2}\/[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2})/
            }        
        },

        {
            '__verifyFunc':
            async ($) =>{
                return $.html().includes('HashCode inválido')
            },
            // idDocumento ex.: 7016921,
            'chave':{
                func: x=>'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
            },
            'error':{
                func: x=>'HashCode inválido'
            }
        },

        {
            '__verifyFunc':
            async ($) =>{
                return $.html().includes('CSC revogado')
            },
            // idDocumento ex.: 7016921,
            'chave':{
                func: x=>'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
            },
            'error':{
                func: x=>'CSC revogado'
            }
        }
    ],

}