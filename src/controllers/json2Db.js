const fs = require('fs')
const dbObj = require('./dbConnection')

module.exports = async (filePath) =>{
    let jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8')).dados
    let newDocs = []
    let res
    let count = 0

    const result = await dbObj.collection('despesas').createIndex({ idDocumento: 1 }, { unique: true });
    console.log(result)
    let tmpRes = await dbObj.collection('despesas').insertMany(jsonData, { ordered: false } )
    console.log(tmpRes.insertedIds)

}