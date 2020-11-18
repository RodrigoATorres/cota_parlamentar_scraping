const fs = require('fs')
const dbObj = require('./dbConnection')

module.exports = async (filePath) =>{
    let jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8')).dados
    let newDocs = []
    let res
    let count = 0
    for (let el of jsonData){
        if (el.descricao === "COMBUSTÍVEIS E LUBRIFICANTES."){
            count += 1
            console.log(count)
            res = await dbObj.collection('despesas').findOne({"idDocumento":el.idDocumento,"ano":el.ano,"mes":el.mes})
            if (res){
                console.log('já tem')
                // await dbObj.collection('despesas').deleteOne({"_id":res._id})
            }
            else{
                console.log('tem não', el.ano, el.mes)
                newDocs.push(el)
            }
            if (newDocs.length > 100){
                let tmpRes = await dbObj.collection('despesas').insertMany(newDocs)
                console.log(tmpRes.insertedIds)
                newDocs = []
            }
        }
    }
    let tmpRes = await dbObj.collection('despesas').insertMany(newDocs)
    console.log(tmpRes)
}