require('dotenv').config()

const fs = require("fs");
const puppeteer = require('puppeteer');
var MongoClient = require('mongodb').MongoClient

const MONGO_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_ADDRES}/${process.env.DB_NAME}?authSource=admin`;
console.log(MONGO_URL)

MongoClient
  .connect(
    MONGO_URL
  )
  .then( async(db) =>{
    let dbObj = db.db('cota_parlamentar')
    console.log(dbObj)

    dbObj.collection('despesas').find(
      {
        "descricao":'COMBUSTÍVEIS E LUBRIFICANTES.',
      }
    )
    .toArray()
    .then(async (res)=>{
      const browser = await puppeteer.launch(
        { 
          headless: false,
          args: [ '--ignore-certificate-errors' ]
        }
      );
      const page = await browser.newPage();

      for (let row of res){
        if (row.urlDocumento && !row.urlDocumento.includes('.pdf') && !fs.existsSync(`unprocessedDocuments/${row.idDocumento}.html`)){
          try{
            await page.goto(row.urlDocumento);
            await page.waitFor(1 * 1000);
    
            let html = await page.content();
            html += `\n<span id='currentUrl'>${page.url()}</span>`
            fs.writeFileSync(`unprocessedDocuments/${row.idDocumento}.html`, html);
    
            for (const [idx, frame] of page.mainFrame().childFrames().entries()){
              let html = await frame.content();
              fs.writeFileSync(`unprocessedDocuments/${row.idDocumento}_frame${idx+1}.html`, html);
            }
          }
          catch{
            console.log('error')
          }
        }      
       
      }
      await browser.close();
    })
  }
)