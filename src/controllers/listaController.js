const lista = ['Pedro', 'José', 'Aderbal', 'Danilo', 'Luisa', 'Vitoria'];
const { trocarPosicao } = require('../utils')

//Exercício 02
async function reordenarLista(requisicao, resposta) {
    const { listaNomes } = requisicao.body;

    // Verificando se o corpo da requisição contém a propriedade listaNomes e se é um array. Caso contrário, retorna uma resposta com status 400
    if (!listaNomes || !Array.isArray(listaNomes)) {
        return resposta.status(400).json({ mensagem: 'A lista de nomes é inválida' });
    }

    // Verificando se a quantidade de nomes na lista enviada é igual à quantidade de nomes na lista original. Caso não seja, retorna uma resposta com status 400
    if (listaNomes.length !== lista.length) {
        return resposta.status(400).json({ mensagem: 'A lista de nomes está incompleta' });
    }

    const newList = [...listaNomes];

    // Regra 1: Trocar posição do índice 0 por qualquer outro item da lista
    const randomIndex = Math.floor(Math.random() * (lista.length - 1)) + 1;
    trocarPosicao(newList, 0, randomIndex);

    // Regra 2: Colocar 'Danilo' no topo da lista
    const daniloIndex = newList.indexOf('Danilo');
    trocarPosicao(newList, 0, daniloIndex);

    // Verificar se todos os nomes estão na lista original
    // Filtro para encontrar os nomes que não pertencem à lista original. Caso haja nomes inválidos, retorna uma resposta com status 400
    const nomesInvalidos = newList.filter((nome) => !lista.includes(nome));
    if (nomesInvalidos.length > 0) {
        return res.status(400).json({ mensagem: `Os seguintes nomes não pertencem à lista: ${nomesInvalidos.join(', ')}` });
    }

    resposta.json(newList);
}

module.exports = {
    reordenarLista,
};
