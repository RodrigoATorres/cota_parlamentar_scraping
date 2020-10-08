module.exports = {

    'https://www.sefaz.pi.gov.br':[
        {
        //     // idDocumento ex.: 6993800,
            '__frame':1,
            'chave':{
                selector: '#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1)',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)",
            },
            'estab_cnpj':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'n_itens':{
                selector:'#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)'
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
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)",
            },        
           'payment_type':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)",
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },          
           'customer_name':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /Nome:[\s]+([0-9,\.\-]+)/,
            },     
           'customer_cpf':{
                selector: "#tbLeiauteDANFENFCe > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)",
                re: /CPF:[\s]+([0-9,\.\-]+)/,
            },            
        },

        {
            // idDocumento ex.: 6999420,
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('<span class="ui-messages-warn-summary">HashCode inválido com base nos parâmetros!</span>')
                },
            'chave':{
                re: /qrcode\?p=([0-9]{44})/,
            },
            'error':{
                func: x=>'HashCode inválido'
            }
        },
        {
            // idDocumento ex.: 6999422,
            '__verifyFunc':
                async ($) =>{
                    return $.html().includes('<span id="currentUrl">https://www.sefaz.pi.gov.br/nfce/erro</span>')
                },
            'chave':{
                func: x => 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            },
            'error':{
                func: x=>'No info!'
            }
        }

    ],

}