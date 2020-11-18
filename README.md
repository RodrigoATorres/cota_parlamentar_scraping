# Cotas Pralamentares Scraping

## Funcionalidades

Código utilizado para:
- Processar dados relativos à [cota para o exercício da atividade parlamentar](https://www.camara.leg.br/cota-parlamentar/)
- Extrair dados relativos às notas fiscais relacionadas a cada despesa:
  - Chave das NFs
  - Dados gerais da nota (quando o documento fornecido pelo site da câmara perimitir)
- Fazer o download das notas fiscais relacionadas a cada despesa, quando necessário
- Fazer o download de cupons fiscais referênciados nas notas fiscais
- Extrair dados das notas e cupons baixados
- Processar dados extraídos, com o objetivo de identificar possíveis irregularidades
- Gerar relatórios com os dados extraídos

## Utilização
#### Adicionar registros de gastos (em formato json) ao banco de dados.
> nfDownloader json-to-db \<ARQUIVO JSON\>

Dados podem ser baixados [aqui](https://www2.camara.leg.br/transparencia/cota-para-exercicio-da-atividade-parlamentar/dados-abertos-cota-parlamentar)


#### Fazer donwload de arquivos relativos às despesas dos parlamentares
> nfDownloader donwload-doc-files \<JSON COM IDS DOS DOCUMENTOS\>

#### Localizar chave das NFs nos documentos baixados, em formato PDF
> nfDownloader find-keys \<JSON COM IDS DOS DOCUMENTOS\>

O códgio tenta localizar o texto com a chave no PDF, caso isso não seja possível (porque o PDF é formado por imagens, por exemplo) o PDF será aberto. O usuário deverá, então, tirar um print screen da área em que o texto da chave se encontra, e apertar as teclas CTRL+SHIFT+ALT, para que o programa possa continuar rodando. O código usuará uma API da Google para extrair o texto da imagem e repetirá o processo para as próximas notas fiscais.
[]!(/docs/find_keys_pdf.gif)

#### Localizar chave das NFs nos documentos baixados, em formato PDF
> nfDownloader gen-key-html \<JSON COM IDS DOS DOCUMENTOS\>

  
  gen-key-html [options]
  process-key-data
  donwload-nf-list [options]
  donwload-doc-list [options]
  donwload-doc-children [options]
  process-docs
  process-nfs
  process-nfs-children
  generate-report
  no-child-report
