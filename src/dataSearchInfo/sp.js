module.exports = {

    'https://nfce.fazenda.sp.gov.br':[
        {
        // ex.: 35200109259017000132650010000894131421667753,
            'chave':{
                selector: '#infos > div:nth-child(2) > div > ul > li > span',
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
                selector:'#infos > div:nth-child(1) > div > ul > li',
                re: /Emissão:[\s]+([0-9]{2}\/[0-9]{2}\/[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2})/
            }        
        },
    ],

    'https://satsp.fazenda.sp.gov.br':[
        {
        // ex.: 35200110356701000111590005570241536854435490,
            'chave':{
                selector: '#conteudo_lblIdCfe',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: "#conteudo_lblNomeEmitente",
            },
            'estab_cnpj':{
                selector: "#conteudo_lblCnpjEmitente",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'items_name':{
                selector: "#tableItens > tbody > tr > td:nth-child(3)",
            },
            'items_qt':{
                selector: "#tableItens > tbody > tr > td:nth-child(4)",
            },
            'items_un':{
                selector: "#tableItens > tbody > tr > td:nth-child(5)",
            },
            'items_un_value':{
                selector: "#tableItens > tbody > tr > td:nth-child(6)",
                re: /([0-9,\.]+)/
            },            
            'items_total_value':{
                selector: "#tableItens > tbody > tr > td:nth-child(8)",
                re: /([0-9,\.]+)/
            },
           'total':{
                selector: "#conteudo_lblTotal",
            },        
           'payment_type':{
                selector: "#totalNota > div:nth-child(4) > label:nth-child(1)",
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },          
           'customer_name':{
                selector: "#conteudo_lblRazaoSocial",
            },     
           'customer_cpf':{
                selector: "#conteudo_lblCpfConsumidor",
            },
            'datetime':{
                selector:'#conteudo_lblDataEmissao',
            }        
        },
    ],

}