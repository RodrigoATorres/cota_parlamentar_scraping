module.exports = {

    AP: [
        {
            url: 'http://www.sefaz.ap.gov.br/sate/fis/FISf_ConsultarNFCE.do?limparSessao=true',
            capchaVersion: 'image',
            codeInputSelector: '#edtID',
            captchaImageSelector: 'body > table > tbody > tr:nth-child(2) > td > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > img',
            captchaInputSelector: '#edtCaptchaResponse',
            confirmSelector: 'body > table > tbody > tr:nth-child(2) > td > form > table > tbody > tr:nth-child(4) > td > input:nth-child(3)',
            nTries: 3,
        }
    ],

}


