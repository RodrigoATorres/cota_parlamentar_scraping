const dbObj = require('./dbConnection')
const puppeteer = require('puppeteer');
const fs = require('fs');
const http = require('http');

const donwloadFile = async(filePath, url) =>{
    const file = fs.createWriteStream(filePath);
    const response = await  http.get(url)
    await response.pipe(file);
}

module.exports = async (docIdList) =>{
    const browser = await puppeteer.launch(
        { 
          headless: false,
          args: [ '--ignore-certificate-errors' ]
        }
    );
    const page = await browser.newPage();
    
    for (let docId of docIdList){
        let res = await dbObj.collection('despesas').findOne({"idDocumento":docId})
        if (!res.urlDocumento.includes('.pdf')){
            try{
                await page.goto(res.urlDocumento);
                await page.waitFor(1 * 1000);
        
                let html = await page.content();
                html += `\n<span id='currentUrl'>${page.url()}</span>`
                fs.writeFileSync(`files/documents/${res.idDocumento}.html`, html);
        
                for (const [idx, frame] of page.mainFrame().childFrames().entries()){
                  let html = await frame.content();
                  fs.writeFileSync(`files/documents/${res.idDocumento}_frame${idx+1}.html`, html);
                }
              }
              catch{
                console.log('error')
              }
        }
    }

}