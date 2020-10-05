const fs = require('fs');
const cheerio = require('cheerio');

const findInHtml = require('../helpers/htmlFindData').findInHtml;
const keySearchInfo = require('../dataSearchInfo');

let unregistred_domains = [];

const getNfData = async (fPath) =>{

    let html = fs.readFileSync(fPath, 'utf8').toString();
    const list_$ = [cheerio.load(html)];
    let idx = 0

    while (fs.existsSync(fPath.replace('.html', `_frame${idx}.html`))) {
        html = fs.readFileSync(fPath.replace('.html', `_frame${idx}.html`), 'utf8').toString();
        list_$.push(cheerio.load(html));
        idx+=1;
    }

    let url = list_$[0]('#currentUrl').text()
    let domain = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img)[0];
    let data = null

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
        if (!unregistred_domains.includes(domain)){
            console.log(domain, url)
            console.log(fPath)
            unregistred_domains.push(domain)
        }
    }

    return data
}

let files

const getAllData = async () =>{

    files = fs.readdirSync('./unprocessedDocuments')

    // files = ['6992896.html']

    for (let file of files){
        if (!file.includes('frame') && (file !='.gitignore')){
            await getNfData(`./unprocessedDocuments/${file}`)
        }
    }
    console.log([ ...new Set(unregistred_domains)])

}

getAllData()
