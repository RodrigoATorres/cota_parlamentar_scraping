module.exports = {

    AL: [
        {
            url: 'https://nfce.sefaz.al.gov.br/consultaNFCe.htm',
            capchaVersion: 'recapchaV2',
            codeInputSelector: '#chaveAcesso',
            siteKeySelector: '.g-recaptcha',
            confirmSelector: '#Corpo > div:nth-child(4) > form > input[type=submit]:nth-child(10)',
            nTries: 3,
        }
    ],

}