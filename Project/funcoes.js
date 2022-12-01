const fs = require('fs')
const path = require('path')

function lerDiretorio(caminho) {
    return new Promise((resolve, reject) => {
        try {
            let arquivos = fs.readdirSync(caminho)
            arquivos = arquivos.map(arquivo => path.join(caminho, arquivo))
            resolve(arquivos)
        } catch (e) {
            reject(e)
        }

    })

}

function lerArquivo(caminho) {
    return new Promise((resolve, reject) => {
        try {
            const conteudo = fs.readFileSync(caminho)
            resolve(conteudo.toString())
        } catch (e) {
            reject(e)
        }
    })
}

function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(lerArquivo))
}

function elementosTerminadosCom(padrao) {
    return function (array) {
        return array.filter(el => el.endsWith(padrao))
    }

}

function removerSeVazio(array) {
    return array.filter(el => el.trim())
}

function removerSe(padrao) {
    return function (array) {
        return array.filter(el => !el.includes(padrao))
    }
}

function removerSeApenasNumeros(array) {
    return array.filter(el => parseInt(el) != parseInt(el))
}

function removerSimbolos(simbolos) {
    return function(array) {
        return array.map(el => {
            let novoTxt = el
            simbolos.forEach(simbolo => {
                novoTxt = novoTxt.split(simbolo).join("")
            });
            return novoTxt
        })
    }
}

const juntarConteudo = conteudo => conteudo.join(' ')
function separarPor(simbolo) {
    return function(array) {
        return array.split(simbolo)
    }
}

function agruparElementos(array) {
    return Object.values(array.reduce((acc, palavra) => {
        const p = palavra.toLowerCase()
        const qtde = acc[p] ? acc[p].qtde + 1 : 1
        acc[p] = {Elemento: p, qtde}

        return acc
    }, {}))
}

function ordenarPorAttNumerico(array) {
    return array.sort((a, b) => {
        if (a.qtde == b.qtde) return 0 
        if (a.qtde < b.qtde) return 1 
        if (a.qtde > b.qtde) return -1

    })
}   

module.exports = {
    lerDiretorio,
    elementosTerminadosCom,
    lerArquivos,
    lerArquivo,
    removerSeVazio,
    removerSe,
    removerSeApenasNumeros,
    removerSimbolos,
    juntarConteudo,
    separarPor,
    agruparElementos,
    ordenarPorAttNumerico

}