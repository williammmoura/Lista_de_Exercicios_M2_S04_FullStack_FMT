const listarDatas = (requisicao, resposta) => {
    const { mes } = requisicao.params;

    const mesesDoAno = {
        1: 'Janeiro',
        2: 'Fevereiro',
        3: 'Março',
        4: 'Abril',
        5: 'Maio',
        6: 'Junho',
        7: 'Julho',
        8: 'Agosto',
        9: 'Setembro',
        10: 'Outubro',
        11: 'Novembro',
        12: 'Dezembro',
    };

    const mesSelecionado = parseInt(mes);

    // Verificando se o valor do "mesSelecionado" está fora do intervalo válido de 1 a 12. Se estiver fora desse intervalo, significa que o mês selecionado não existe, e retornamos uma resposta com status 400.
    if (mesSelecionado < 1 || mesSelecionado > 12) {
        return resposta.status(400).json({ mensagem: 'O mês selecionado não existe' });
    }

    const diasDoMes = [];

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    const ultimoDia = new Date(anoAtual, mesSelecionado, 0).getDate();

    // Esse loop é responsável por percorrer cada dia do mês e realizar as operações dentro dele.
    for (let dia = 1; dia <= ultimoDia; dia++) {
        const data = new Date(anoAtual, mesSelecionado - 1, dia);
        // Aqui, estamos criando uma string dataFormatada que representa a data no formato "DD/MM/YYYY".
        const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anoAtual}`;
        // Adicionando a dataFormatada ao array diasDoMes para armazenar todas as datas do mês.
        diasDoMes.push(dataFormatada);
    }

    resposta.json(diasDoMes);
};

module.exports = {
    listarDatas,
};