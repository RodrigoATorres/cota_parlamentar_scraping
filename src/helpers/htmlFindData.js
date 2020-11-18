const xpath = require('xpath');
const dom   = require('xmldom').DOMParser;

const getSingleData = async ($, searchInfo) => {

    let res;

    if (searchInfo.selector){
        let tmp = $(searchInfo.selector)
        if (tmp){
            res = []
            tmp.each(function(i, elm) {
                res.push($(this).text())
            })
        }
        else{
            res = ['']
        }
        delete selector_dom
    }
    else if (searchInfo.xpath){
        const doc = new dom({
            locator: {},
            errorHandler: { 
                warning: function (w) { }, 
                error: function (e) { }, 
                fatalError: function (e) { console.error(e) }
            }
        }).parseFromString($.html())
        res = xpath.select(searchInfo.xpath, doc)
            .map( el => el.data)
        delete doc;
    }
    else{
        res = [$.html()]
    }
    if (searchInfo.re){

        res = res.reduce(
            (acum, el) => {
                if (el.match(searchInfo.re)){
                    return acum.concat(
                        [el.match(searchInfo.re)[1]]
                    )
                }
                else{
                    return acum
                }
            },
            []
        )
    }

    if (searchInfo.func){
        res = res.reduce(
            (acum, el) => {
                let tmp_res = searchInfo.func(el);
                return acum.concat(
                    Array.isArray(tmp_res)?tmp_res:[tmp_res]
                )
            },
            []  
        )
    }

    return res
}



const findInHtml = async (list_$, allSearchInfo) =>{

    if (allSearchInfo instanceof Array){
        let res = {}
        for (let info of allSearchInfo){
            let res = await this.findInHtml(list_$, info)
            if (Object.keys(res).length != 0)
                {
                    return res
                }
        }
        return res
    }

    let $;
    if (allSearchInfo['__frame'] && list_$.length > allSearchInfo['__frame']){
        $ = list_$[allSearchInfo['__frame']]
    }
    else{
        $ = list_$[0]
    }

    if (allSearchInfo['__verifyFunc']){
        if (! await allSearchInfo['__verifyFunc']($)){
            return {}
        }
    }
    else if (allSearchInfo['chave']){
        let chave = await getSingleData($, allSearchInfo['chave']);
        if ((chave.length == 0) || !chave[0]){
            return {}
        }
    }

    let output = {};
    for (let key of Object.keys(allSearchInfo)){
        if (!key.includes('__')){
            output[key] = await getSingleData($, allSearchInfo[key])
        }
    }

    output.fileName = `${output.chave[0]}${allSearchInfo['__frame'] ? '_frame' + allSearchInfo['__frame'] : ''}.html`
    return output
}

module.exports.findInHtml = findInHtml;