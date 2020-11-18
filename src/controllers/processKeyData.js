const dbObj = require('./dbConnection')

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

module.exports = async (keyData) => {

  let keys = Object.values(keyData)
  keys = keys.map(x=>x.replace(/\D+/g, ''))
  let dupKeys = findDuplicates(keys)
  console.log(dupKeys)

  for (let dupKey of dupKeys){
    console.log(Object.keys(keyData).filter(key => keyData[key].replace(/\D+/g, '') === dupKey))
  }

  for (let key of Object.keys(keyData)){
    console.log(key)
    // console.log(await dbObj.collection('despesas').findOne({idDocumento:Number(key)}))
    console.log(await dbObj.collection('despesas').updateOne({idDocumento:Number(key)}, {$set:{chave:keyData[key].replace(/\D+/g, '')}}))
  }

}