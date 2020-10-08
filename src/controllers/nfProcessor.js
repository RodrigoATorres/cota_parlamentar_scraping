require('dotenv').config()
const fs = require('fs');
const cheerio = require('cheerio');

const findInHtml = require('../helpers/htmlFindData').findInHtml;
const keySearchInfo = require('../dataSearchInfo');

let unregistred_domains = {};

const getNfData = async (fPath) =>{

    let html = fs.readFileSync(fPath, 'utf8').toString();
    const list_$ = [cheerio.load(html, { decodeEntities: false })];
    let idx = 1

    while (fs.existsSync(fPath.replace('.html', `_frame${idx}.html`))) {
        html = fs.readFileSync(fPath.replace('.html', `_frame${idx}.html`), 'utf8').toString();
        list_$.push(cheerio.load(html, { decodeEntities: false }));
        idx+=1;
    }

    let url = list_$[0]('#currentUrl').text()
    let domain = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img)[0];
    let data = {}

    if (keySearchInfo[domain]){
        data = await findInHtml(list_$,keySearchInfo[domain])
        if (files.length ==1 ){console.log(data)}
        if (Object.keys(data).length === 0 || (data.chave.length == 0 ) || (data.chave[0].length < 44)) {
            console.log('-------------------------')
            console.log(data)
            console.log(url)
            console.log(fPath)
            console.log('-------------------------')
        }
    }
    else{
        if (domain == 'https://www4.sefaz.pb.gov.br'){
            console.log(fPath, url)
        }
        let domain_count = unregistred_domains[domain] || 0
        unregistred_domains[domain] = domain_count + 1
    }

    data = {...data, domain, url}
    return data
}

let files

var MongoClient = require('mongodb').MongoClient
const MONGO_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_ADDRES}/${process.env.DB_NAME}?authSource=admin`;
console.log(MONGO_URL)

MongoClient
  .connect(
    MONGO_URL
  )
  .then( async(db) =>{
    let dbObj = db.db('cota_parlamentar')

    files = fs.readdirSync('./unprocessedDocuments')

    // files = ['6996139.html']

    for (let file of files){
        if (!file.includes('frame') && (file !='.gitignore')){
            let data = await getNfData(`./unprocessedDocuments/${file}`)
            await dbObj.collection('despesas').updateOne({idDocumento:Number(file.replace('.html',''))}, {$set:{dados:data}})
        }
    }
    console.log(unregistred_domains)
})
