const express = require("express")
const server = express()

//Lista inicial
let listaInicial = ['Pedro', 'José', 'Aderbal', 'Danilo', 'Luisa', 'Vitoria']

// Criar o endpoint PACTH
server.patch('/lista-inicial', (req, res) => {
    // Lógica do endpoint
    
    // Salva o nome do require
    const {name} = req.params
    const changePlaceName = name
    
    // REGRA DE NEGÓCIO
    // Regra 1: Troque a posição do índice 0 por qualquer outro item da lista;
    if(listaInicial.includes(changePlaceName[0])){
        const index = listaInicial.indexOf(changePlaceName[0])
        const temp = listaInicial[0] // Guarda temporariamente o primeiro nome.
        
        // Troca de posição entre o primeiro nome (listaInicial[0]) e o nome correspondente (listaInicial[index]).
        listaInicial[0] = listaInicial[index]
        listaInicial[index] = temp
    } else{
        // Regra 3: Caso algum nome não esteja na lista, deverá retornar uma mensagem informando que o convidado não pertence a essa lista informando o status http adequado.
        return require.status(404).json({error: "O nome não foi encontrado."})
    }

    // Regra 2: Coloque o 'Danilo' no topo da lista, trocando de lugar com o 'Pedro'. Exemplo saída: ['Danilo', 'José', 'Aderbal', 'Pedro', 'Luisa', 'Vitoria']
    if(listaInicial.includes('Danilo')){
        const daniloIndex = listaInicial.indexOf('Danilo')
        const pedroIndex = listaInicial.indexOf('Pedro')
        const temp = listaInicial[daniloIndex]
        listaInicial[daniloIndex] = listaInicial[pedroIndex]
        listaInicial[pedroIndex] = temp
    }

    // Lista Atualizada
    require.json({listaInicial})
})
