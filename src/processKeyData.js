const data = require('../keyData.json')

const findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
    // JS by default uses a crappy string compare.
    // (we use slice to clone the array so the
    // original array won't be modified)
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  }


let keys = Object.values(data)
keys = keys.map(x=>x.replace(/\D+/g, ''))
let dupKeys = findDuplicates(keys)
console.log(dupKeys)

for (let dupKey of dupKeys){
    console.log(Object.keys(data).filter(key => data[key].replace(/\D+/g, '') === dupKey))
}



if (require.main === module) {
    require('dotenv').config()

    const MongoClient = require('mongodb').MongoClient
    const MONGO_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_ADDRES}/${process.env.DB_NAME}?authSource=admin`;
    console.log(MONGO_URL)

    MongoClient
    .connect(
        MONGO_URL
    )
    .then( async(db) =>{
        
        let dbObj = db.db('cota_parlamentar')

        for (let key of Object.keys(data)){
            console.log(key)
            // console.log(await dbObj.collection('despesas').findOne({idDocumento:Number(key)}))
            console.log(await dbObj.collection('despesas').updateOne({idDocumento:Number(key)}, {$set:{chave:data[key].replace(/\D+/g, '')}}))
        }

    });
}


