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

// getNfData('./unprocessedNFs/35200405794555000176550010000025761010025760.html')


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

        let count = 0
        let count_pdf = 0
        let files = [];
        const allInfo = require('../doc_info')
        for (let info of allInfo){
            let res = await dbObj.collection('despesas').find({"descricao":'COMBUSTÍVEIS E LUBRIFICANTES.', 'nomeParlamentar':info[0], 'valorLiquido':info[1]}).toArray()

            for (el of res){
                if (fs.existsSync(`./unprocessedNFs/${el.chave}.html`)){
                    files.push([`./unprocessedNFs/${el.chave}.html`, el.idDocumento])
                }
                else if(el.chavePDF && fs.existsSync(`./unprocessedNFs/${el.chavePDF[0]}.html`)){
                    files.push([`./unprocessedNFs/${el.chavePDF[0]}.html`, el.idDocumento])
                }
                else if (fs.existsSync(`./unprocessedDocuments/${el.idDocumento}.html`)){
                    files.push([`./unprocessedDocuments/${el.idDocumento}.html`, el.idDocumento])
                }
                else{
                    console.log(el.idDocumento)
                    console.log(el.chavePDF)
                }
                count +=1
                if (el.urlDocumento && el.urlDocumento.includes('.pdf')){
                    count_pdf+=1
                }
            }
        }

        files = [...new Set(files)]
        console.log(files)
        console.log(count)
        console.log(count_pdf)
        let error_keys = []
        let noChild= []
        let all_child = []
        for (let [file, idDocumento] of files){
            if (!file.includes('frame') && (file !='.gitignore')){
                let data = await getNfData(file)
                console.log(file)
                if (!data.chave){
                    error_keys.push(file.replace(/\D+/g, ''))
                }
                else if (data.error){
                    error_keys.push(data.chave[0])
                }
                else if (!data.children){
                    noChild.push(file)
                }
                
                if (data.children){
                    console.log(data.children.length)
                    all_child = all_child.concat(data.children)
                }

                if (data.chave){
                    await dbObj.collection('despesas').updateOne({idDocumento:idDocumento}, {$set:{chave:data.chave[0]}})
                    await dbObj.collection('despesas').updateOne({idDocumento:idDocumento}, {$set:{dados:data}})
                }
            }
        }
        // console.log(error_keys)
        // console.log(noChild)
        // console.log(unregistred_domains)
        // console.log(all_child.sort())
        // fs.writeFile(

        //     'list_children.json',
        
        //     JSON.stringify(all_child.sort()),
        
        //     function (err) {
        //         if (err) {
        //             console.error('Crap happens');
        //         }
        //     }
        // );
    });
    }


