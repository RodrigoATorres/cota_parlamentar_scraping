const MongoClient = require('mongodb').MongoClient
const MONGO_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_ADDRES}/${process.env.DB_NAME}?authSource=admin`;
console.log(MONGO_URL)

const dbObj = require('./controllers/dbConnection')
const fs = require('fs');

const allInfo = require('./doc_info')

const getDocList = async () =>{
    let docList = []
    for (let info of allInfo){
    
        let res = await dbObj.collection('despesas').find({"descricao":'COMBUSTÍVEIS E LUBRIFICANTES.', 'nomeParlamentar':info[0], 'valorLiquido':info[1]}).toArray()
        
        for (row of res){
            docList.push(row.idDocumento)
        }
    }
    console.log(docList)
    var jsonString = JSON.stringify(docList);
    fs.writeFile("./docList.json", jsonString, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 

}

getDocList()