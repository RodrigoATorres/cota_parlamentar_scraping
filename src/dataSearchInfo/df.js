module.exports = {

    'https://dec.fazenda.df.gov.br':[
        {
            // idDocumento ex.: 6992157,
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
                selector: "div.ui-collapsible:nth-child(3) > div:nth-child(2)",
                re: /Nome:([A-Za-z,\s]+)/,
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')

            },     
            'customer_cpf':{
                selector: "div.ui-collapsible:nth-child(3) > div:nth-child(2)",
                re: /CPF: ([0-9,\.\-]+)/,
            },
        },

        {
            // idDocumento ex.: 7001930
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('403 - Forbidden: Access is denied.')
                },
            'chave':{
                re: /NFCE\/\?p=([0-9]{44})/,
            },
            'error':{
                func: x=>'Acesso negado!'
            }
        },

        {
            // idDocumento ex.: 7084932
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('<iframe src="../HomeNew.aspx?tp=" id="fundoif"')
                },
            'chave':{
                re: /NFCE\/\?p=([0-9]{44})/,
            },
            'error':{
                func: x=>'Página não encontrada!'
            }
        },

    ],

    'https://ww1.receita.fazenda.df.gov.br':[
        {
            // idDocumento ex.: 6992519,
            'chave':{
                selector: '#collapse3 > ul:nth-child(1) > li:nth-child(1) > div:nth-child(3) > div:nth-child(1) > p:nth-child(1)',
            },
            'estab_name':{
                selector: '#heading1 > div:nth-child(1)',
            },
            'estab_cnpj':{
                selector: "#heading1 > div:nth-child(2)",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'n_items':{
                selector: "ul.list-group:nth-child(2) > li:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1) > strong:nth-child(1)",
            },
            'items_name':{
                selector: "#collapse1 > ul:nth-child(1) > li > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)",
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },
            'items_qt':{
                selector: "#collapse1 > ul:nth-child(1) > li > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)",
                re: /Qtde\.:\n[\s]+(.+)\n/
            },
            'items_un':{
                selector: "#collapse1 > ul:nth-child(1) > li > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)",
                re: /UN:\n[\s]+(.+)\n/            },
            'items_un_value':{
                selector: "#collapse1 > ul:nth-child(1) > li > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)",
                re: /Vl\. Unit\.:\n[\s]+(.+)/
            },            
            'items_total_value':{
                selector: "#collapse1 > ul:nth-child(1) > li > div:nth-child(2) > div:nth-child(2) > span:nth-child(1)",
            },
            'total':{
                selector: "ul.list-group:nth-child(4) > li:nth-child(1) > div:nth-child(2) > div:nth-child(2) > p:nth-child(1) > strong:nth-child(1)",
            },        
            'payment_type':{
                selector: "#respostaWS > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)",
                func: x=> x.replace("div.ui-panelgrid-cell:nth-child(4)", '')
            },          
            'customer_name':{
                selector: "#j_id_19\\:j_id_2o\\:j_id_3f > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)",
            },     
            'customer_cpf':{
                selector: "div.col-8:nth-child(2) > p:nth-child(1)",
            },            
        },
        {
            // idDocumento ex.: 6992892
            '__verifyFunc':
                async ($) =>{
                    return ($.html().includes('<b>QR Code Inválido</b>') || $.html().includes('<b>Inconsistência de Informações no QR Code</b>') )
                },
            'chave':{
                re: /Captcha\?Chave=([0-9]{44})/,
            },
            'error':{
                func: x=>'QR Code Inválido'
            }
        },
        {
            // idDocumento ex.: 7003234
            '__verifyFunc':
                async ($) =>{
                    return ($.html().includes('The resource you are looking for has been removed, had its name changed, or is temporarily unavailable.') )
                },
            'chave':{
                re: /consulta\?p=([0-9]{44})/,
            },
            'error':{
                func: x=>'Recurso não encontrado'
            }
        }

    ],

    'http://www.fazenda.df.gov.br':[
        {
            // idDocumento ex.: 7002017,
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('404 - File or directory not found.')
                },
            'chave':{
                re: /consulta\?p=([0-9]{44})/,
            },
        },
        {
            // idDocumento ex.: 7003234
            '__verifyFunc':
                async ($) =>{
                    return ($.html().includes('The resource you are looking for has been removed, had its name changed, or is temporarily unavailable.') )
                },
            'chave':{
                re: /consulta\?p=([0-9]{44})/,
            },
            'error':{
                func: x=>'Recurso não encontrado'
            }
        }

    ]

}