module.exports = {

    PR: [
        {
            url: 'http://www.sped.fazenda.pr.gov.br/modules/conteudo/nfce.php?consulta=completa',
            preFunc: async( browser, page) =>{
                await page.waitFor(1000)
                await page.click('#nfceCompletaCaptcha')
                await page.waitFor(1000)
                return page
            },
            capchaVersion: 'image',
            codeInputSelector: '#nfceCompletaChaveAcesso',
            captchaImageSelector: '#nfceImgCaptcha > img:nth-child(1)',
            captchaInputSelector: '#nfceCompletaCaptcha',
            confirmSelector: '#nfceCompletaChaveAcesso',
            nTries: 3,
            posFunc: async (browser, page) => {
                // page.close()
                let newHtml = await page.evaluate(() => {
                    let ready = false
                    let output = ''
                    $.ajax({
                        url: "http://www.sped.fazenda.pr.gov.br/webservices/consulta.php",
                        type: "POST",
                        data: {
                            chaveAcesso: $("#nfceCompletaChaveAcesso").val(),
                            captcha: $("#nfceCompletaCaptcha").val(),
                            tpAmbiente: $("input[name='nfceCompletaTpAmbiente']:checked").val(),
                            tipo: "nfceCompleta",
                            ano: $("#nfceCompletaAno option:selected").val(),
                            mes: $("#nfceCompletaMes option:selected").val(),
                            cnpj: $("#nfceCompletaCNPJ").val(),                
                        },
                        async: false,
                        dataType: "json",
                        success: function(resultado) {
                            console.log(resultado)
                            ready = true
                            output = resultado.body
                            document.querySelector('html').innerText = resultado.body
                        }
                    });
                    while (!ready){}
                    return output
                    })
                page.setContent(newHtml)
                return page
            }
        }
    ],

}