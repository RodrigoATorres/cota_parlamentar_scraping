module.exports = {

    'http://nfce.fazenda.mg.gov.br':[
        {
        // ex.: 31200717176561000149650010001229141105697325,
            'chave':{
                selector: '#formPrincipal\\:j_idt103_content > h5:nth-child(1)',
                func: x => x.replace(/[^0-9]/g, '')
            },
            'estab_name':{
                selector: "div.table-responsive:nth-child(7) > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)",
            },
            'estab_cnpj':{
                selector: "div.table-responsive:nth-child(7) > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)",
            },
            'items_name':{
                selector: "div.table-responsive:nth-child(16) > table:nth-child(2) > tbody:nth-child(2) > tr > td:nth-child(2)",
            },
            'items_qt':{
                selector: "div.table-responsive:nth-child(16) > table:nth-child(2) > tbody:nth-child(2) > tr > td:nth-child(3)",
            },
            'items_un':{
                selector: "div.table-responsive:nth-child(16) > table:nth-child(2) > tbody:nth-child(2) > tr > td:nth-child(4)",
            },
            'items_un_value':{
                selector: "div.table-responsive:nth-child(16) > table:nth-child(2) > tbody:nth-child(2) > tr > td:nth-child(5)",
            },            
            'items_total_value':{
                selector: "div.table-responsive:nth-child(16) > table:nth-child(2) > tbody:nth-child(2) > tr > td:nth-child(6)",
            },
           'total':{
                selector: "#formPrincipal\\:j_idt108\\:j_idt109 > table:nth-child(5) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)",
            },        
           'payment_type':{
                selector: "#formPrincipal\\:j_idt108\\:j_idt215",
            },          
           'customer_name':{
                selector: "table.table:nth-child(10) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)",
            },     
           'customer_cpf':{
                selector: "table.table:nth-child(10) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)",
            },
            'datetime':{
                selector:'#formPrincipal\\:j_idt108\\:j_idt109 > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(4)',
            }        
        },
    ],

}