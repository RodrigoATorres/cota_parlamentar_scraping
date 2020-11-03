module.exports = {

    'http://sefaz.to.gov.br':[
        {
        // 17200409217206000142650010001447831184484480,
            'chave':{
                selector: '#j_id_19\\:j_id_2o\\:j_id_39 > table > tbody > tr:nth-child(2) > td:nth-child(2)',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: "#j_id_19\\:j_id_1u",
            },
            'estab_cnpj':{
                selector: "#j_id_19\\:j_id_1v",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'items_name':{
                selector: "#j_id_19\\:j_id_1z_data > tr > td:nth-child(2)",
            },
            'items_qt':{
                selector: "#j_id_19\\:j_id_1z_data > tr > td:nth-child(3)",
                re: /Quant.([0-9,\.]+)/
            },
            'items_un':{
                selector: "#j_id_19\\:j_id_1z_data > tr > td:nth-child(6)",
                re: /UN: (.+)/
            },
            'items_un_value':{
                selector: "#j_id_19\\:j_id_1z_data > tr > td:nth-child(4)",
                re: /Val. UnitR\$ ([0-9,\.]+)/
            },            
            'items_total_value':{
                selector: "#j_id_19\\:j_id_1z_data > tr > td:nth-child(5)",
                re: /Val. TotalR\$ ([0-9,\.]+)/
            },
           'total':{
                selector: "#j_id_19\\:j_id_2h_content > div:nth-child(2) > div:nth-child(2)",
            },        
           'payment_type':{
                selector: "#j_id_19\\:j_id_2h_content > div:nth-child(1) > div:nth-child(4)",
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },          
           'customer_name':{
                selector: "#j_id_19\\:j_id_2o\\:j_id_3s",
                re: /Nome:([A-Za-z,\s]+)/,
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')

            },     
           'customer_cpf':{
                selector: "#j_id_19\\:j_id_2o\\:j_id_3s",
                re: /CPF: ([0-9,\.\-]+)/,
            },
            'datetime':{
                selector:'#j_id_19\\:j_id_2o\\:j_id_2p > table > tbody > tr:nth-child(4) > td:nth-child(2)',
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