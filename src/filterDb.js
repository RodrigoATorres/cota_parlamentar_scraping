const dbObj = require('./controllers/dbConnection')
const fs = require('fs');

const filterDb = async () =>{
    let res = await dbObj.collection('despesas').find({ano:2019,descricao:"COMBUSTÍVEIS E LUBRIFICANTES.",}).toArray()

    let pdfDocs = []
    let xmlDocs = []
    let noUrlDocs = []
    for (let doc of res){
        if (!doc.urlDocumento){
            noUrlDocs.push(doc)
        } 
        else if ((Number(doc.valorLiquido)>=400)){
            if (doc.urlDocumento.includes('.pdf')){
                pdfDocs.push(doc)
            }
            else{
                xmlDocs.push(doc)
            }
        }
    }
    console.log(pdfDocs.length)
    console.log(xmlDocs.length)
    console.log(noUrlDocs.reduce((prev,el) => prev+ Number(el.valorLiquido), 0))

    // let keys = ["nomeParlamentar","cpf","idDeputado","numeroCarteiraParlamentar","legislatura","siglaUF","siglaPartido","codigoLegislatura","numeroSubCota","descricao","numeroEspecificacaoSubCota","descricaoEspecificacao","fornecedor","cnpjCPF","numero","tipoDocumento","dataEmissao","valorDocumento","valorGlosa","valorLiquido","mes","ano","lote","numeroDeputadoID","idDocumento"]
    // let noUrlCsv = keys.join(',') + '\n'

    // noUrlDocs.forEach(el => {
    //     for (let key of keys){
    //         noUrlCsv += el[key]+ ','
    //     }
    //     noUrlCsv+='\n'
    // }
    // )
    // console.log(noUrlDocs.length)
    // fs.writeFileSync('./noUrlData.csv',  noUrlCsv);

    let pdfDocIds = pdfDocs.map(el=>el.idDocumento)
    let xmlDocIds = xmlDocs.map(el=>el.idDocumento)
    fs.writeFileSync('./jsonInputs/pdfDocIds_201111.json',  JSON.stringify(pdfDocIds));
    fs.writeFileSync('./jsonInputs/xmlDocIds_201111.json',  JSON.stringify(xmlDocIds));
}


filterDb()