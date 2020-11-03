module.exports = {

    AM: [
        {
            url: 'https://sistemas.sefaz.am.gov.br/nfceweb/formConsulta.do',
            capchaVersion: 'image',
            codeInputSelector: '#txtChaveAcessoNFe',
            captchaImageSelector: '#imgAntiRobo',
            captchaInputSelector: '#txtCodigoImpresso',
            confirmSelector: '#confirm',
            nTries: 3,
        }
    ],

}


