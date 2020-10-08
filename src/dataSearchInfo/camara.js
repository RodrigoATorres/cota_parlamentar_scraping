module.exports = {

    "https://www.camara.leg.br":[
        {
        // idDocumento ex.: 6992119,
            'chave':{
                selector: "body > div:nth-child(1) > nferesultmsg:nth-child(1) > retdistxml:nth-child(1) > chdfe:nth-child(6)"
            },
            'estab_name':{
                selector:'[id^="NFe"] > emit:nth-child(2) > xnome:nth-child(2)'
            },
            'estab_cnpj':{
                selector: '[id^="NFe"] > emit:nth-child(2) > cnpj:nth-child(1)',
            },
            'children':{
                selector:'[id^="NFe"] > ide:nth-child(1) > nfref > refnfe'
            },
            'items_name':{
                selector:'[id^="NFe"] > det > prod > xprod'
            },
            'items_qt':{
                selector:'[id^="NFe"] > det > prod > qcom'
            },
            'items_un':{
                selector:'[id^="NFe"] > det > prod > ucom'
            },
            'items_un_value':{
                selector:'[id^="NFe"] > det > prod > vuncom'
            },            
            'items_total_value':{
                selector:'[id^="NFe"] > det > prod > qcom'
            },     
            'total':{
                selector:'[id^="NFe"] > total > icmstot > vnf'
            },
            'customer_name':{
                    selector: '[id^="NFe"] > dest > xnome',
            },
            'customer_cpf':{
                    selector: '[id^="NFe"] > dest > cpf',
            },        
        },

        {
            // idDocumento ex.: 7077255,7077610
            'chave':{
                selector: '#corpo > div.GeralXslt > fieldset > table > tbody > tr > td:nth-child(1) > span',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: "#NFe > fieldset:nth-child(2) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(2)",
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },
            'estab_cnpj':{
                selector: "#NFe > fieldset:nth-child(2) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > span:nth-child(2)",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'total':{
                    selector: "#NFe > fieldset:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(6) > span:nth-child(2)",
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
                },
            'customer_name':{
                    selector: "#NFe > fieldset:nth-child(3) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(2)",
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },
            'customer_cpf':{
                    selector: "#NFe > fieldset:nth-child(3) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > span:nth-child(2)",
                    re: /([0-9,\.\-]+)/,
            },            
        },

        {
            //     // idDocumento ex.: 7077241,
                'chave':{
                    selector: '#lbl_cod_chave_acesso',
                    func: x => x.replace(/\s/g, '')
                },
                'estab_name':{
                    selector: "#NFe > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(2)",
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
                },
                'estab_cnpj':{
                    selector: ".fixo-nfe-cpf-cnpj > span:nth-child(2)",
                    re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
                },
                'items_name':{
                    selector: ".fixo-prod-serv-descricao > span",
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
                },
                'items_qt':{
                    selector: ".fixo-prod-serv-qtd > span",
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
                },
                'items_un':{
                    selector: ".fixo-prod-serv-uc > span",
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
                },
                'items_un_value':{
                    selector: '[id^="table"] > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > span:nth-child(2)',
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
                },            
                'items_total_value':{
                    selector: ".fixo-prod-serv-vb > span",
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
                },
               'total':{
                    selector: ".col-6 > td:nth-child(6) > span:nth-child(2)",
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
                },        
               'payment_type':{
                    selector: "#NFe > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3) > span:nth-child(2)",
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
                },          
               'customer_name':{
                    selector: "#DestRem > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > span:nth-child(2)",
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
    
                },     
               'customer_cpf':{
                    selector: "#DestRem > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(1) > span",
                    func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
                },            
        },

        {
            // idDocumento ex.: 7084249,
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('Para mais detalhes será necessário realizar uma consulta no')
                },
            'chave':{
                re: / com a chave: ([0-9]{44})/,
            },
            'error':{
                func: x=>'Apenas chave'
            }
        },

    ]
}