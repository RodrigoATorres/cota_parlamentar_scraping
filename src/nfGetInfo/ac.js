module.exports = {

    AC: [
        {
            url: 'http://sefaznet.ac.gov.br/nfce/consulta.xhtml',
            capchaVersion: 'image',
            codeInputSelector: '#chave_acesso',
            captchaImageSelector: '#img',
            captchaInputSelector: '#consulta_nfce > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > input[type=text]',
            confirmSelector: '#j_idt22',
            nTries: 3,
        }
    ],

}


