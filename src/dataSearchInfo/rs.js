module.exports = {

    'https://www.sefaz.rs.gov.br':[

        {
            // idDocumento ex.: 6993265
            '__frame':1,
            'chave':{
                selector: '#respostaWS > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: "td.NFCCabecalho_SubTitulo:nth-child(2)",
            },
            'estab_cnpj':{
                selector: "#respostaWS > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
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
                selector: "[id^='Item\\ \\+\\ '] > td:nth-child(6)",
            },
            'total':{
                selector: "#respostaWS > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)",
            },        
            'payment_type':{
                selector: "#respostaWS > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)",
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },          
            'customer_name':{
                selector: ".borda-pontilhada-top > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /\ \-\ ([A-Za-z,\s]+)/,
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')

            },     
            'customer_cpf':{
                selector: ".borda-pontilhada-top > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /CPF:[\s]+([0-9,\.\-]+)/,
            },            
        },
        {
            // idDocumento ex.: 7018033
            '__frame':1,
            'chave':{
                selector: '#respostaWS > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: "td.NFCCabecalho_SubTitulo:nth-child(2)",
            },
            'estab_cnpj':{
                selector: "#respostaWS > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
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
                selector: "[id^='Item\\ \\+\\ '] > td:nth-child(6)",
            },
            'total':{
                selector: "#respostaWS > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)",
            },        
            'payment_type':{
                selector: "#respostaWS > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)",
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },          
            'customer_name':{
                selector: ".borda-pontilhada-top > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /\ \-\ ([A-Za-z,\s]+)/,
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')

            },     
            'customer_cpf':{
                selector: ".borda-pontilhada-top > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /CPF:[\s]+([0-9,\.\-]+)/,
            },            
        },

        {
            // idDocumento ex.: 7061402,
            '__frame':1,
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('Digite a chave de acesso da NFC-e')
                },
            'chave':{
                re: /input id="chaveNFe" name="chaveNFe" value="([0-9]{44})/,
            },
            'error':{
                func: x=>'Documento Inexistente'
            }
        }
    ],

    'https://nfce.sefazrs.rs.gov.br':[
        {
            // idDocumento ex.: 7016921,
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('403 - Forbidden: Access is denied.')
                },
            'chave':{
                re: /NFeAutorizacao4.asmx\?p=([0-9]{44})/,
            },
            'error':{
                func: x=>'Acesso negado!'
            }
        },

        {
            // idDocumento ex.: 7016921,
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('The following operations are supported.')
                },
            'chave':{
                re: /NFeAutorizacao4.asmx\?p=([0-9]{44})/,
            },
            'error':{
                func: x=>'Acesso negado!'
            }
        },
    ],

}