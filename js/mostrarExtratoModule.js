// Importando tableData
import { tableData } from "./tableDataModule.js"

// Extrato

const mostrarExtrato = () => {
    // Capturando o modal
    const modalExtrato = document.querySelector('#modalExtrato')

    // Capturando o corpo do modal
    const modalExtratoBody = document.querySelector('#modalBodyFinanceiro')

    // Limpando o corpo do modal antes de adicionar
    modalExtratoBody.innerHTML = ''

    // Objeto para separar transações por data
    const transacoesPorData = {}

    // Array com o nome dos meses 
    const nomeMeses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    // Obter todas as transações financeiras da tabela de dados
    const transacoes = tableData.tableData;

    // Ordenar as transações por data em ordem de chegada e, em seguida, inverter a ordem
    transacoes.sort((a, b) => {
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);
        return dataA - dataB;
    });
    transacoes.reverse(); // Inverte a ordem das transações

    transacoes.forEach((transacao) => {
        const data = new Date(transacao.data)
        const mes = data.getMonth()
        const mesAno = `${nomeMeses[data.getMonth()]} / ${data.getFullYear()}`; // Montar a string "Nome do Mês / Ano"
        if (!transacoesPorData[mesAno]) {
            transacoesPorData[mesAno] = [] // Cria um array vazio para armazenar as transações dessa data
        }

        transacoesPorData[mesAno].push(transacao) // Adiciona a transação ao array da data correspondente
    })

    const divExtrato = document.createElement('div')
    divExtrato.classList.add('extrato')

    // Adicionar o cabeçalho do extrato
    const divCabecalho = document.createElement('div');
    divCabecalho.classList.add('extrato-cabecalho');

    // Div para agrupar input e icon de search
    const divInputs = document.createElement('div')
    divInputs.classList.add('divInputs')

    // Criando input
    const searchInputExtrato = document.createElement('input')
    searchInputExtrato.classList.add('searchExtrato')
    searchInputExtrato.setAttribute('placeholder', 'Pesquisar')

    // Anexar o ícone ao elemento input como um elemento filho
    divCabecalho.appendChild(divInputs);

    // Criar o elemento span para o ícone e adicionar a classe do ícone do Font Awesome (por exemplo, o ícone de pesquisa)
    const searchIcon = document.createElement('span');
    searchIcon.classList.add('fas', 'fa-search'); // Adicione as classes do Font Awesome para o ícone que você deseja usar
    searchIcon.style.fontSize = '20px'
    searchIcon.style.margin = '10px'

    divInputs.appendChild(searchIcon);
    divInputs.appendChild(searchInputExtrato)

    // Div Botão de exportar extrato
    const divBtnExtrato = document.createElement('div')
    divBtnExtrato.classList.add('divBtnExtrato')

    // Criando botao para exportar o extrato 
    const btnExtrato = document.createElement('button')
    btnExtrato.classList.add('btnExtrato')
    btnExtrato.setAttribute('id', 'btnExportarExtrato')
    btnExtrato.textContent = 'Exportar'

    // criando o icon de exportar
    const exportIcon = document.createElement('span')
    exportIcon.classList.add('fa-solid', 'fa-file-export')
    exportIcon.style.fontSize = '20px'

    divCabecalho.appendChild(divBtnExtrato)
    divBtnExtrato.appendChild(exportIcon)
    divBtnExtrato.appendChild(btnExtrato)

    // função para gerar relatório do extrato
    const gerarRelatorioExtrato = () => {
        btnExtrato.addEventListener('click', () => {
            console.log('Botão PDF extrato')

            const doc = new jsPDF()
            doc.fromHTML(listaExtrato)
            doc.save('Extrato.pdf')
        })
    }

    gerarRelatorioExtrato()

    // Adicionar o corpo do extrato (lista de transações)
    const listaExtrato = document.createElement('ul');
    listaExtrato.classList.add('list-group');

    // Evento de escuta de input
    searchInputExtrato.addEventListener('input', () => {

        // criando uma constante onde sera guardada o valor do input
        const termoPesquisa = searchInputExtrato.value.trim().toLowerCase();
        const itensTransacao = listaExtrato.querySelectorAll('li'); // Seleciona todos os itens da lista de transações

        // varrendo a lista de li
        itensTransacao.forEach((itemTransacao) => {
            const nomeTransacao = itemTransacao.textContent.toLowerCase(); // Obtém o nome da transação ou uma string vazia se não houver <h5>

            // se a constante nomeTransacao tiver o valor do input ele mostrara na tela
            if (nomeTransacao.includes(termoPesquisa)) {
                itemTransacao.style.display = 'flex'; // Exibe o item da transação se o termo de pesquisa for encontrado
            } else {
                // caso nao tenha o valor digitado ele ocultara (deixara em branco)
                itemTransacao.style.display = 'none'; // Oculta o item da transação se o termo de pesquisa não for encontrado
            }
        });


    })

    // Percorre o objeto transacoesPorData para criar as seções de transições
    for (const data in transacoesPorData) {
        const transacaoDoMes = transacoesPorData[data]

        // Cria uma seção para a data
        const itemMes = document.createElement('li')
        itemMes.classList.add('list-group-item', 'list-group-item-secondary')

        // Função split para separar o mes e o ano
        const [mes, ano] = data.split('/')

        // Verificar se o mês é um número válido entre 1 e 12
        const numeroMes = parseInt(mes)
        if (numeroMes >= 1 && numeroMes <= 12) {
            itemMes.innerHTML = `<h4><strong>${nomeMeses[numeroMes - 1]}</strong></h4>  <p>${ano}</p>` // Exibi o nome do mês e ano
        } else {
            itemMes.innerHTML = `<h4><strong>${mes}</strong></h4>  <p>${ano}</p>`
        }

        listaExtrato.appendChild(itemMes)

        // Coloca a seção na lista
        transacaoDoMes.forEach((transacao) => {
            const itemTransacao = document.createElement('li')
            itemTransacao.classList.add('list-group-item')
            itemTransacao.style.display = 'flex'

            // Icone
            const divIconDollar = document.createElement('div')
            divIconDollar.classList.add('divIconDollar')
            divIconDollar.style.display = 'flex'
            divIconDollar.style.alignItems = 'center'
            const spanIconDollar = document.createElement('span');
            spanIconDollar.classList.add('fa-solid', 'fa-hand-holding-dollar'); // Adicione as classes do Font Awesome para o ícone que você deseja usar
            spanIconDollar.style.fontSize = '20px'
            spanIconDollar.style.margin = '10px'

            const divInfo = document.createElement('div')
            divInfo.classList.add('divInfo')

            // Cria elementos para exibir as informações da transações na lista
            const nomeTransacao = document.createElement('h5')
            nomeTransacao.innerHTML = `<strong>Pagamento: ${transacao.corte}</strong>`

            const valorTransacao = document.createElement('p')
            valorTransacao.style.color = '#67BF63'
            valorTransacao.innerHTML = `<strong>R$ ${transacao.valor}</strong>`

            const detalhesTransacao = document.createElement('p');
            detalhesTransacao.innerHTML = `
            ${transacao.nome}<br>
            Entradas<br>
            `;

            // Adiciona os elementos item da transição
            itemTransacao.appendChild(divIconDollar)
            divIconDollar.appendChild(spanIconDollar)
            itemTransacao.appendChild(divInfo)
            divInfo.appendChild(nomeTransacao);
            divInfo.appendChild(valorTransacao)
            divInfo.appendChild(detalhesTransacao);

            // Adiciona os items a lista
            listaExtrato.appendChild(itemTransacao);
        })
    }

    divExtrato.appendChild(divCabecalho);
    divExtrato.appendChild(listaExtrato);

    // Adicionar o extrato ao corpo do modal
    modalExtratoBody.appendChild(divExtrato);
}

export { mostrarExtrato }