const fs = require('fs');
const cheerio = require('cheerio');

const path = require('path')
const dbObj = require('./dbConnection')
const findInHtml = require('../helpers/htmlFindData').findInHtml;
const keySearchInfo = require('../dataSearchInfo');

const util = require('util');
const copyFile = util.promisify(fs.copyFile);

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
    domain = domain.replace('//www.','//')
    let data = {}
    if (keySearchInfo[domain]){
        data = await findInHtml(list_$,keySearchInfo[domain])
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
    // console.log(data)
    return data
}
module.exports.getNfData = getNfData;


module.exports.getNfDataFromDocFiles = async (docIdList, nfFolder = './unprocessedDocuments/') => {

    const noChild = []
    const files = docIdList.map( el => path.join(nfFolder, String(el)) + '.html')
    for (let [i, file] of files.entries()){

        if (!fs.existsSync(file)){
            continue
        }

        let data = await getNfData(file)
        let error_keys = []

        if (!data.chave){
            error_keys.push(file.replace(/\D+/g, ''))
        }
        else if (data.error){
            error_keys.push(data.chave[0])
          
        }
        else if ((data.chave[0].slice(20, 22) == '55') && (!data.has_refs || data.has_refs.length === 0)){
            noChild.push(data)
        }


        if (data.chave){
            await dbObj.collection('despesas').updateOne({idDocumento:docIdList[i]}, {$set:{chave:data.chave[0]}})
            await dbObj.collection('despesas').updateOne({idDocumento:docIdList[i]}, {$set:{dados:data}})
            await copyFile(file, `./HTML_reports/NFs/${data.chave}.html`)
            let idx = 1
            while (fs.existsSync(file.replace('.html', `_frame${idx}.html`))) {
                await copyFile(file.replace('.html', `_frame${idx}.html`), `./HTML_reports/NFs/${data.chave}_frame${idx}.html`)
                console.log(file.replace('.html', `_frame${idx}.html`), `./HTML_reports/NFs/${data.chave}_frame${idx}.html`)
                idx+=1;
            }

        }
    }
}


module.exports.getNfDataFromDocIds = async (docIdList, nfFolder = './unprocessedNFs/') => {

    let res = await dbObj.collection('despesas').find({idDocumento: { $in: docIdList }}).toArray()
    let nfList = res.reduce((prev,el) => el.chave? prev.concat([el.chave]): prev, [])
    let error_keys = []


    const files = nfList.map( el => path.join(nfFolder, el) + '.html')
    for (let [i, file] of files.entries()){
        
        if (!fs.existsSync(file)){
            error_keys.push(file.replace(/\D+/g, ''))
            continue
        }

        let data = await getNfData(file)
        console.log(data)

        if (!fs.existsSync(file) || !data.chave){
            error_keys.push(file.replace(/\D+/g, ''))
        }
        else if (data.error){
            error_keys.push(data.chave[0])
        }

        if (data.chave){
            await dbObj.collection('despesas').updateOne({idDocumento:res[i].idDocumento}, {$set:{chave:data.chave[0]}})
            await dbObj.collection('despesas').updateOne({idDocumento:res[i].idDocumento}, {$set:{dados:data}})
        }
    }
}

module.exports.getChildrenNfDataFromDocIds = async (docIdList, nfFolder = './unprocessedNFs/') => {

    let res = await dbObj.collection('despesas').find({idDocumento: { $in: docIdList }}).toArray()
    const error_keys = []

    for (let docObj of res){

        if (docObj.dados.children){
            const files = docObj.dados.children.map(el => path.join(nfFolder, el) + '.html')
            const childrenData = []
    
            for (let [i, file] of files.entries()){
                let data
                try{
                    data = await getNfData(file)
                }
                catch{
                    data = {}
                }
        
                if (!data.chave || data.error){
                    error_keys.push(docObj.dados.children[i])
                }
                childrenData.push(data)
            }
                
            await dbObj.collection('despesas').updateOne({idDocumento:docObj.idDocumento}, {$set:{childrenData}})
        }
        else{
            error_keys.push(docObj.dados.chave[0])
        }


    }
    console.log(error_keys)

}

// 52200204489287000116650010002733601111575979