require('dotenv').config()

const deasync = require('deasync');
const MongoClient = require('mongodb').MongoClient
const MONGO_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_ADDRES}/${process.env.DB_NAME}?authSource=admin`;
console.log(MONGO_URL)

let isDbReady = false
let dbObj

MongoClient
.connect(
    MONGO_URL
)
.then( async(db) =>{
    dbObj = db.db('cota_parlamentar')
    isDbReady = true
});


deasync.loopWhile( () => !isDbReady );

module.exports = dbObj