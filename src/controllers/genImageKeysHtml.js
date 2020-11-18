const dbObj = require('./dbConnection')
const fs = require('fs');
var path = require("path");

module.exports = async (docIdList, savePath) =>{

    let html = '<form  id="mainForm" action="">'

    let res = await dbObj.collection('despesas').find({idDocumento: { $in: docIdList }}).toArray()

    for (let el of res){
        if ( fs.existsSync(`./unprocessedKeyImages/${el.idDocumento}.png`)){
            html+=`<a href="./nfPdfs/${el.idDocumento}.pdf">${el.idDocumento}</a>`
            html+='<div>'
            html+=`<input name="${el.idDocumento}" type="text" value="${el.infoChave.keyFromOcr}" style='font-size: 35px;' maxlength="80" size="44" data-inputmask="'mask': '99-9999-99.999.999/9999-99-99-999-999.999.999-999.999.999-9'" />`
            html+='</div>'
            html+=`<img src="../unprocessedKeyImages/${el.idDocumento}.png" alt="HTML5 Icon" width="1024">`
            html+=`<br><br><br>`
        }
    }
    html += '  <input type="submit" value="Submit"> </form>'
    html +=`
        <script>
            const mult = '4329876543298765432987654329876543298765432'

            const validator = item => {
                let valid = false
                let chave = item.value.replace(/\\D+/g, '')
                if (chave.length == 44){
                    let sum = 0;
                    let i = 0;
                    console.log(chave.slice(0,43))
                    for (let digit of chave.slice(0,43)){
                        console.log(mult)
                        sum += Number(digit) * Number(mult[i])
                        i+=1
                    }
                    console.log(sum)
                    console.log(11-sum%11)
                    let div = (sum%11 <2) ? 0 : (11-sum%11)
                    if (div === Number(chave[43])){
                        item.style.color = color = 'green'
                        return
                    }
                }
                item.style.color = color = 'red'
                return
            }

            document.querySelectorAll('input').forEach(item => {
                validator(item)
                item.addEventListener('input', event => validator(item))
            })

            function downloadObjectAsJson(exportObj, exportName){
                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
                var downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href",     dataStr);
                downloadAnchorNode.setAttribute("download", exportName + ".json");
                document.body.appendChild(downloadAnchorNode); // required for firefox
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
            }
        
            document.getElementById('mainForm').onsubmit = (event)=>{
                let data = {}
                const formData = new FormData(document.querySelector('form'))
                for (var pair of formData.entries()) {
                    data[pair[0]]=pair[1];
                }
                downloadObjectAsJson(data, '${path.basename(savePath).replace('.html',"_keys")}')
                return false
            };

        </script>
        
`

    fs.writeFileSync(savePath, html);

}

