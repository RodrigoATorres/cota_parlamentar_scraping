module.exports = {

    'https://nfce.set.rn.gov.br':[
        {
        // ex.: 24200208473985000184650040000411451201758270,
            'chave':{
                selector: '#lblChave',
                func: x => x.replace(/\s/g, '')
            },
            'estab_name':{
                selector: "#lblRazaoSocialEmitente",
                re: /RAZÃO SOCIAL: (.+)/
            },
            'estab_cnpj':{
                selector: "#lblCPFCNPJEmitente",
                re: /([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2})/
            },
            'items_name':{
                selector: "[id^='tbItensList_lblTbItensDescricao_']",
            },
            'items_qt':{
                selector: "[id^='tbItensList_lblTbItensQtde_']",
            },
            'items_un':{
                selector: "[id^='tbItensList_lblTbItensUnidade_']",
            },
            'items_un_value':{
                selector: "[id^='tbItensList_lblTbItensValorUnid_']",
            },            
            'items_total_value':{
                selector: "[id^='tbItensList_lblTbItensValorTotal_']",
            },
           'total':{
                selector: "#lblValorTotal",
            },        
           'payment_type':{
                selector: "#lblFormaPagamento",
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
            },          
           'customer_name':{
                selector: "#lblNomeRazaoSocialDestinatario",
                re: /Nome:([A-Za-z,\s]+)/,
                func: x=> x.replace(/^\s+|\s+$|\s+(?=\s)/g, '')

            },     
           'customer_cpf':{
                selector: "#lblCPFCNPJDestinatario",
                re: /CPF: ([0-9,\.\-]+)/,
            },
            'datetime':{
                selector:'#lblDataEmissao',
                re: /Emissão: ([0-9]{2}\/[0-9]{2}\/[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2})/
            }        
        },
    ],

}