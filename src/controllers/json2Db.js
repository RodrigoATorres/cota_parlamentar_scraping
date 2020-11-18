const fs = require('fs')
const dbObj = require('./dbConnection')

module.exports = async (filePath) =>{
    let jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8')).dados

    const result = await dbObj.collection('despesas').createIndex({ idDocumento: 1 }, { unique: true });
    console.log(result)

    try{
        let tmpRes = await dbObj.collection('despesas').insertMany(jsonData, { ordered: false } )
        console.log(`All rows inserted.`)
    }
    catch (e){
        console.log(`${e.result.result.nInserted} rows inserted. ${e.writeErrors.length} rows not inserted`)
    }
    return 'Sucess'
}
