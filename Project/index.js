const path = require('path')
const fn = require('./funcoes')

const caminho = path.join(__dirname, '..', 'data')

const symbols = [
    "!", '"', "?", "\r", ".", ",", "-",
    "♪", "_", "<i>", "</i>", "[", "]", "(", ")",
    "<", ">", "/"
]

fn.lerDiretorio(caminho)
    .then(fn.elementosTerminadosCom('srt'))
    .then(fn.lerArquivos)
    .then(fn.juntarConteudo)
    .then(fn.separarPor('\n'))
    .then(fn.removerSeVazio)
    .then(fn.removerSe('-->'))
    .then(fn.removerSeApenasNumeros)
    .then(fn.removerSimbolos(symbols))
    .then(fn.juntarConteudo)
    .then(fn.separarPor(' ')) 
    .then(fn.removerSeVazio)
    .then(fn.removerSeApenasNumeros)
    .then(fn.agruparElementos)
    .then(fn.ordenarPorAttNumerico)
    .then(console.log)


