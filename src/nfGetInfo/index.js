let tmp_obj = {}

require("fs").readdirSync(__dirname).forEach(function(file) {
    if (file != 'index.js'){
        tmp_obj = {...tmp_obj, ...require("./" + file)}
    }
});

module.exports = tmp_obj