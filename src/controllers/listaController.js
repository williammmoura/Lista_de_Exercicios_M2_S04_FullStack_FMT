const fs = require('fs')
const { trocarPosicao } = require('../utils')

const lista = ['Pedro', 'José', 'Aderbal', 'Danilo', 'Luisa', 'Vitoria'];


//Exercício 02
async function reordenarLista(requisicao, resposta) {
    const { listaNomes } = requisicao.body

    // Verificando se o corpo da requisição contém a propriedade listaNomes e se é um array. Caso contrário, retorna uma resposta com status 400
    if (!listaNomes || !Array.isArray(listaNomes)) {
        return resposta.status(400).json({ mensagem: 'A lista de nomes é inválida' })
    }

    // Verificando se a quantidade de nomes na lista enviada é igual à quantidade de nomes na lista original. Caso não seja, retorna uma resposta com status 400
    if (listaNomes.length !== lista.length) {
        return resposta.status(400).json({ mensagem: 'A lista de nomes está incompleta' })
    }

    const newList = [...listaNomes]

    // Regra 1: Trocar posição do índice 0 por qualquer outro item da lista
    const randomIndex = Math.floor(Math.random() * (lista.length - 1)) + 1
    trocarPosicao(newList, 0, randomIndex)

    // Regra 2: Colocar 'Danilo' no topo da lista
    const daniloIndex = newList.indexOf('Danilo')
    trocarPosicao(newList, 0, daniloIndex)

    // Verificar se todos os nomes estão na lista original
    // Filtro para encontrar os nomes que não pertencem à lista original. Caso haja nomes inválidos, retorna uma resposta com status 400
    const nomesInvalidos = newList.filter((nome) => !lista.includes(nome))
    if (nomesInvalidos.length > 0) {
        return res.status(400).json({ mensagem: `Os seguintes nomes não pertencem à lista: ${nomesInvalidos.join(', ')}` })
    }

    resposta.json(newList)
}


//Exercício 04
const salvarDado = (requisicao, resposta) => {
    const { item } = requisicao.body

    // Lê o conteúdo do arquivo (se existir)
    let data = []
    // Verificando se o arquivo existe usando a função fs.existsSync(). Se existir, lemos o conteúdo do arquivo utilizando fs.readFileSync() e convertemos o conteúdo de volta em um array de objetos usando JSON.parse().
    if (fs.existsSync('dados.json')) {
        const fileContent = fs.readFileSync('dados.json', 'utf-8')
        data = JSON.parse(fileContent)
    }

    // Adiciona o novo item no array
    data.push({ item })

    // Salva o conteúdo atualizado no arquivo
    fs.writeFileSync('dados.json', JSON.stringify(data))

    resposta.json(data)
};


//Exercício 05
const filtrarUsuarios = (requisicao, resposta) => {
const { ageMin, ageMax, state, job } = requisicao.query;

fs.readFile(userFilePath, 'utf8', (err, data) => {
    // Verificando se ocorreu algum erro durante a leitura do arquivo. 
    if (err) {
        console.error(err)
        return resposta.status(500).json({ error: 'Erro ao ler o arquivo de usuários' })
    }

    let usuarios = JSON.parse(data)

    // Verificando se o critério ageMin, ageMax, state e job estam definido. Se estiver, aplicamos um filtro no array usuarios utilizando o método filter().
    if (ageMin) {
        usuarios = usuarios.filter((usuario) => usuario.age >= parseInt(ageMin))
    }

    if (ageMax) {
        usuarios = usuarios.filter((usuario) => usuario.age <= parseInt(ageMax))
    }

    if (state) {
        usuarios = usuarios.filter((usuario) => usuario.state.toLowerCase() === state.toLowerCase())
    }

    if (job) {
        usuarios = usuarios.filter((usuario) => usuario.job.toLowerCase() === job.toLowerCase())
    }

    resposta.json(usuarios)
    })
}


//Exercício 06
const alterarUsuario = (requisicao, resposta) => {
    const { id } = requisicao.params
    const novoUsuario = requisicao.body

    fs.readFile(userFilePath, 'utf8', (err, data) => {
        if (err) {
        console.error(err)
        return resposta.status(500).json({ error: 'Erro ao ler o arquivo de usuários' })
    }

    let usuarios = JSON.parse(data)

    const usuarioExistente = usuarios.find((usuario) => usuario.id === parseInt(id))

    if (!usuarioExistente) {
        return resposta.status(404).json({ mensagem: 'Usuário não encontrado' })
    }

    const indiceUsuario = usuarios.findIndex((usuario) => usuario.id === parseInt(id))

    // Verificando se o objeto usuarioExistente é igual ao objeto novoUsuario
    if (JSON.stringify(usuarioExistente) === JSON.stringify(novoUsuario)) {
        return resposta.json({ mensagem: 'Não há alterações a serem feitas' })
    }

    usuarios[indiceUsuario] = { ...usuarioExistente, ...novoUsuario };

    //  Lista de usuários atualizada é escrita de volta no arquivo JSON usando a função writeFile do módulo fs.
    fs.writeFile(userFilePath, JSON.stringify(usuarios, null, 2), 'utf8', (err) => {
        if (err) {
        console.error(err)
        return resposta.status(500).json({ error: 'Erro ao escrever no arquivo de usuários' })
    }

        resposta.json({ mensagem: 'Usuário alterado com sucesso' })
        })
    })
}


//Exercício 07
const deletarRoteiro = (requisicao, res) => {
    const { id } = requisicao.params

    fs.readFile(roteirosFilePath, 'utf8', (err, data) => {
        // Verificando se ocorreu algum erro durante a leitura do arquivo. Se houver um erro, ele é exibido no console e uma resposta de erro com status 500 é enviada ao cliente.
        if (err) {
            console.error(err)
            return resposta.status(500).json({ error: 'Erro ao ler o arquivo de roteiros' })
        }

        let roteiros = JSON.parse(data)

        const index = roteiros.findIndex((roteiro) => roteiro.id === parseInt(id))

        // Verifica se o índice é igual a -1, o que indica que o roteiro não foi encontrado.
        if (index === -1) {
            return res.status(404).json({ mensagem: 'Roteiro não encontrado' })
        }

        roteiros.splice(index, 1)

        fs.writeFile(roteirosFilePath, JSON.stringify(roteiros, null, 2), 'utf8', (err) => {
            // Verifica se ocorreu algum erro durante a escrita do arquivo.
            if (err) {
            console.error(err)
            return resposta.status(500).json({ error: 'Erro ao escrever no arquivo de roteiros' })
        }

            resposta.json({ mensagem: 'Roteiro deletado com sucesso' })
        })
    })
}


//Exercício 08
const obterNomeUsuario = (requisicao, resposta) => {
    const { id } = requisicao.params

    fs.readFile(userFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return resposta.status(500).json({ error: 'Erro ao ler o arquivo de usuários' })
        }

        const usuarios = JSON.parse(data)

        const usuario = usuarios.find((user) => user.id === parseInt(id))

        if (!usuario) {
            return resposta.status(404).json({ mensagem: 'Usuário não encontrado' })
        }

        const nomeUsuario = usuario.name

        resposta.json({ nome: nomeUsuario })
    });
}


module.exports = {
    reordenarLista,
    salvarDado,
    filtrarUsuarios,
    alterarUsuario,
    deletarRoteiro,
    obterNomeUsuario
};
