require('dotenv').config()
const dbObj = require('./dbConnection')

const {getNfData} = require('./nfProcessor');
const ufFromCode = require('../helpers/ufFromCode');
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);

const pretty = require('pretty');
const { prependOnceListener } = require('process');


let nfCodesError = [];
let nfCodesFine = []
let noData = []
let all_md = []

const getSimilarSecretary = async (depName, searchName, dbObj) =>{
  if (searchName && searchName[0]){
    let res = await dbObj.collection('secretarios').find({'Parlamentar':depName,$text: {$search: searchName[0]}}, {score: {$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}}).toArray()
    let names = [... new Set(res.map(el => el['Nome do Secretário']))]

    if (names){
      return names.slice(0,3)
    }
  }
  return ['-']
}


const objStr2Num = (obj) =>{
  for (let key of ['items_qt', 'items_total_value', 'total']){
    if (obj[key]){
      obj[key] = obj[key].map(
        el =>{
         if (el.includes(','))
          return Number(
            el
            .replace('R$','')
            .replace('.','')
            .replace(',','.')
          )
        else{
          return Number(
            el
            .replace('R$','')
            .replace(',','.')
          )
        }
      }
    )
    }
  }
}

let minExpense = [{}, 500000]
let maxExpense = [{}, 0]

const analyzeData = (nfData, childData) =>{
  
  if (childData.reduce((prev,el) => (prev) && el.items_total_value, true)){
    nfData.nExpenses = childData.reduce((prev,el) => prev + el.items_total_value.length, 0)
    nfData.nCupons = childData.length
    childData.forEach(element => {
      element.date = element.datetime.map(el => el.match(/([0-9]{2}\/[0-9]{2}\/[0-9]{4})/)[1])
    })

    let uniqueDays = [... new Set(childData.reduce((prev,el) => prev.concat(el.date) ,[]))]
    nfData.days = uniqueDays
    nfData.dayExpensesCount = uniqueDays.map(day =>{
      return childData.reduce((prev,el) => (el.date[0] === day) ? prev + el.items_name.length : prev ,0)
    })
    nfData.dayCuponsCount = uniqueDays.map(day =>{
      return childData.reduce((prev,el) => (el.date[0] === day) ? prev + 1 : prev ,0)
    })
    nfData.dayTotalExpense = uniqueDays.map(day =>{
      return childData.reduce((prev,el) => (el.date[0] === day) ? prev + el.total[0] : prev ,0)
    })

    let allExpenses = childData.reduce((prev,child) => prev.concat(child.items_total_value), [])

    nfData.minExpense = allExpenses.length > 0 ? Math.min.apply(null, allExpenses): null
    nfData.maxExpense = allExpenses.length > 0 ? Math.max.apply(null, allExpenses): null

    if (nfData.minExpense  && (nfData.minExpense < minExpense[1])){minExpense = [nfData, nfData.minExpense]}
    if (nfData.maxExpense > maxExpense[1]){maxExpense = [nfData, nfData.maxExpense]}

    let score = 0
    score += allExpenses.reduce((prev, el) => el > 300 ? prev + el/100 - 2: prev,0)
    score += childData.reduce((prev, el) => el.total[0] > 500 ? prev + el.total[0]/100 - 4: prev,0)
    score += nfData.dayTotalExpense.reduce((prev, el) => el > 500 ? prev + el/100 - 4: prev,0)
    score += nfData.dayExpensesCount.reduce((prev, el) => el > 5 ? prev + el - 4: prev,0)
    score += childData.reduce((prev, el) => el.items_total_value.length > 4 ? prev + el.items_total_value.length - 4: prev,0)
    score += (nfData.valorDocumento - nfData.sumCheck)  > 300 ? (nfData.valorDocumento - nfData.sumCheck)/100 - 2: 0

    if (nfData.minExpense < 10){
      score += 1
    }

    nfData.score = score

    nfData.isValid = true
  }
  else{
    nfData.isValid = false
  }

}


const genNFeReport = async (nfeData, dbObj) => {

  if(!nfeData.dados || !nfeData.dados.children){
    noData.push()
    console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
    return
  }
  let error = false
  let markdown_str = `---\n`
  markdown_str += `---\n`
  markdown_str += `---\n`

  if (fs.existsSync(`./unprocessedNFs/${nfeData.dados.chave}.html`)){
    await copyFile(`./unprocessedNFs/${nfeData.dados.chave}.html`, `./HTML_reports/NFs/${nfeData.dados.chave}.html`)  
    markdown_str += `# NF [${nfeData.dados.chave}](../NFs/${nfeData.dados.chave}.html) \n\n`
  }
  else if (fs.existsSync(`./unprocessedDocuments/${nfeData.idDocumento}.html`)){
    let tmpHtml = fs.readFileSync(`./unprocessedDocuments/${nfeData.idDocumento}.html`, 'utf8')
    await writeFile(`./HTML_reports/NFs/${nfeData.dados.chave}.txt`, pretty(tmpHtml))
    markdown_str += `# NF [${nfeData.dados.chave}](../NFs/${nfeData.dados.chave}.txt) \n\n`
  }
  else{
    markdown_str += `# NF ${nfeData.dados.chave}\n\n`
  }

  let labels = {
    'items_name': 'Nome dos itens', 'items_qt': 'Quantidade de cada item', 'items_total_value': 'Valor de cada item',
    'total': 'Valor total do cupom','customer_name':'Nome do consumidor','customer_cpf': 'CPF do consumidor',
    'payment_type': 'Forma de pagamento','datetime':'Data de emissão do cupom', 'chave': 'Chave do cupom',
    'possibleSecretaries': 'Possíveis Secretários',
    'checkSum': 'Soma itens (verificação)'
  }


  let refTableKeys = ['total','checkSum', 'customer_cpf', 'customer_name', 'possibleSecretaries', 'payment_type', 'datetime']
  let refTable = `|#|Chave|${refTableKeys.map(el => labels[el]).join('|')}|\n`
  refTable += `|-|-|${refTableKeys.map(el => '-').join('|')}|\n`

  let itensTableKeys = ['items_name', 'items_qt', 'items_total_value']
  let itensTable = `|Cupom #|${itensTableKeys.map(el => labels[el]).join('|')}|\n`
  itensTable += `|-|${itensTableKeys.map(el => '-').join('|')}|\n`

  let sumCheck = 0
  let childData =[]
  for (const [nfc_idx, nfc] of nfeData.dados.children.entries()){
    if (fs.existsSync(`./unprocessedNFs/${nfc}.html`)){
      let tmp_data =  await getNfData(`./unprocessedNFs/${nfc}.html`)
      objStr2Num(tmp_data)
      tmp_data.possibleSecretaries = (await getSimilarSecretary(nfeData.nomeParlamentar, tmp_data.customer_name, dbObj)).join('; ')
      if (tmp_data.items_total_value){
        tmp_data.checkSum = tmp_data.items_total_value.reduce((sum, el) => sum + el, 0)
      }
      else{
        tmp_data.checkSum = '-'
      }

      if (tmp_data.total){
        sumCheck += tmp_data.total[0] ? tmp_data.total[0] : 0 
      }

      if (tmp_data.fileName && fs.existsSync(`./unprocessedNFs/${tmp_data.fileName}`)){
        await copyFile(`./unprocessedNFs/${tmp_data.fileName}`, `./HTML_reports/NFs/${nfc}.html`)  
        refTable += `|${nfc_idx+1}|[${nfc}](../NFs/${nfc}.html)|${refTableKeys.map(el => tmp_data[el]?tmp_data[el]:'error').join('|')}|\n`
      }
      else{
        refTable += `|${nfc_idx+1}|${nfc}|${refTableKeys.map(el => tmp_data[el]?tmp_data[el]:'error').join('|')}|\n`
      }
      childData.push(tmp_data)
      if (!tmp_data.items_name){
        nfCodesError.push(nfc)
        console.log(`error ${nfc}`)
        error = true
      }
      else{
        nfCodesFine.push(nfc)
        for (let i = 0; i< Math.max.apply(Math,itensTableKeys.map(el => tmp_data[el].length)); i++){
          itensTable += `|${nfc_idx+1}|${itensTableKeys.map(el => tmp_data[el][i]).join('|')}|\n`
        }
      }
    }
    else{
      refTable += `|${nfc}| (arquivo da nota não encontrado)|\n`
      console.log(`missing ${nfc}`)
      nfCodesError.push(nfc)
      error = true
    }
  }

  nfeData.sumCheck = sumCheck
  objStr2Num(nfeData.dados)
  analyzeData(nfeData,childData)

  markdown_str += '|Parlamentar|UF|Ano|Cnpj/cpf|idDocumento|Valor Reembolso|Valor Nota|Soma Cupons|Número de cupons|Número de abastecimentos|Pontuação de Supeita|\n'
  markdown_str += '|-|-|-|-|-|-|-|-|-|-|-|\n'
  markdown_str += `|${nfeData.nomeParlamentar}|${nfeData.siglaUF}|${nfeData.ano}|${nfeData.cnpjCPF}|${nfeData.idDocumento}|${nfeData.valorDocumento}|${nfeData.valorLiquido}|${nfeData.sumCheck}|${nfeData.nCupons}|${nfeData.nExpenses}|${nfeData.score}|`
  markdown_str += '\n\n'

  if (nfeData.isValid){
    markdown_str += '|Dia|Número de cupons|Número de abastecimentos| Gasto total|\n'
    markdown_str += '|-|-|-|-|\n'
    for (let i =0; i< nfeData.days.length; i++){
      markdown_str += `|${nfeData.days[i]}|${nfeData.dayCuponsCount[i]}|${nfeData.dayExpensesCount[i]}|${nfeData.dayTotalExpense[i]}|\n`
    }
    markdown_str += '\n\n'  
  }

  markdown_str += `<details><summary>Detalhes</summary>\n\n`
  markdown_str += `# Cupons referenciados\n`
  markdown_str += refTable
  markdown_str += `---\n`
  markdown_str += itensTable
  markdown_str += `---\n`
  markdown_str += `---\n`
  markdown_str += `</details>`
  markdown_str += `---\n`
  markdown_str += `---\n`
  all_md.push(`./mds/${nfeData.dados.chave}.md`)
  await writeFile(`./mds/${nfeData.dados.chave}.md`, markdown_str)
}



module.exports.reportFromDocs = async(docIdList) => {

  let depData = {}
  let allData = []

  let res = await dbObj.collection('despesas').find({idDocumento: { $in: docIdList }}).toArray()
  
  for (row of res){
    if (!depData[row.nomeParlamentar]){
      depData[row.nomeParlamentar] = []
    }
    depData[row.nomeParlamentar].push(row)
    allData.push(row)
    await genNFeReport(row, dbObj)
  }

  console.log(nfCodesError)
  console.log(nfCodesFine)

  fs.writeFile(

      'error_codes.json',
  
      JSON.stringify(nfCodesError.sort()),
  
      function (err) {
          if (err) {
              console.error('Crap happens');
          }
      }
  );

  for (tmp_code of nfCodesError){
    try{
      await copyFile(`./unprocessedNFs/${tmp_code}.png`, `./error_nfs/${tmp_code}.png`)
    }
    catch{
    }
  }

  console.log(allData)
  allData.sort( (a,b) => b.score - a.score )
  console.log(allData)
  let scoredOnly = allData.filter( el => (el.score && (el.score > 0)) )
  let scoreMd = scoredOnly.reduce( (prev, el) => prev + fs.readFileSync(`./mds/${el.chave}.md`), '')
  await writeFile(`HTML_reports/Geral/Ranking.md`, scoreMd)

  let invalidData = allData.filter( a => !a.isValid )
  invalidData = invalidData.filter( el => fs.existsSync(`./mds/${el.chave}.md`) )

  let invalidMd = invalidData.reduce( (prev, el) => prev + fs.readFileSync(`./mds/${el.chave}.md`), '')
  await writeFile(`HTML_reports/Geral/Erros.md`, invalidMd)

  console.log(minExpense)
  console.log(maxExpense)

}


module.exports.noChildReport = async() => {

  let res = await dbObj.collection('despesas').find({"dados.children":[], ano: 2019}).toArray()

  let keys = ["urlDocumento","nomeParlamentar","cpf","idDeputado","numeroCarteiraParlamentar","legislatura","siglaUF","siglaPartido","codigoLegislatura","numeroSubCota","descricao","numeroEspecificacaoSubCota","descricaoEspecificacao","fornecedor","cnpjCPF","numero","tipoDocumento","dataEmissao","valorDocumento","valorGlosa","valorLiquido","mes","ano","lote","numeroDeputadoID","idDocumento"]
  let noChildCsv = keys.join(',') + '\n'

  res.forEach(el => {
      for (let key of keys){
          noChildCsv += el[key]+ ','
      }
      noChildCsv+='\n'
  }
  )
  fs.writeFileSync('./noChildData2.csv',  noChildCsv);

}
