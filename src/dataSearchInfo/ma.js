module.exports = {

    'https://www4.sefaz.pb.gov.br':[

        {
            // idDocumento ex.: 6996139,
            '__frame':2,
            'chave':{
                re: /type="text" name="edtID" class="caixas" size="60" value="([0-9]{44})/,
            },
            'error':{
                func: x=>'Recaptcha requerido'
            }
        },
    ],
}