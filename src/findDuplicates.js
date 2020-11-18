const dbObj = require('./controllers/dbConnection')
const fs = require('fs');

const findDuplicates = async () =>{
    let res = await dbObj.collection('despesas').aggregate([
        {"$group" : { "_id": "$chave", "count": { "$sum": 1 } } },
        {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } }, 
        {"$project": {"chave" : "$_id", "_id" : 0} }
    ]).toArray()
    console.log(res)

    let res2
    for (let row of res){
        res2 = await dbObj.collection('despesas').find({chave:row.chave}).toArray()
        console.log('----------------')
        for (let el of res2){
            console.log(el.idDocumento, el.urlDocumento, el.chave, el.chaveOCR, el.nomeParlamentar, el.valorDocumento)
        }
    }
}

const findError = async () =>{
    let res = await dbObj.collection('despesas').find({chave:{$exists:true}}).toArray()
    console.log(res.length)

    for (let el of res){

        if (el.dados && el.dados.total && el.dados.total[0]){
            let total = el.dados.total[0].includes(',') ? Number(el.dados.total[0].replace('.','').replace(',','.')) : Number(el.dados.total[0])
            if (total !==  Number(el.valorDocumento)){
            console.log(el.idDocumento, el.urlDocumento, el.chave, el.chaveOCR, el.nomeParlamentar, el.valorDocumento, el.dados.total)
            console.log(el)
            }
        }
        // if (el.dados){
        //     console.log(el.dados.total, el.valorDocumento)
        // }
    }
}

findDuplicates()