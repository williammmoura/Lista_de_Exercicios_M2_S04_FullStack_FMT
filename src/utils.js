// Função que realiza a troca de posição de dois elementos dentro do array, usando uma variável temporária para armazenar o valor do primeiro elemento antes de fazer a troca.
function trocarPosicao(array, index1, index2) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

module.exports = {
    trocarPosicao,
};