// Funções auxiliares 

const elemento = (elemento) => document.querySelector(elemento)

// Variaveis 

//Alertas
const dangerAlert = document.querySelector('.alert-danger')
const successAlert = document.querySelector('.alert-success')
const alertRelatorio = document.querySelector('#alert-relatorio')
const updateAlert = document.querySelector('#alert-update')
const deletedAlert = document.querySelector('#alert-deleted')
const alertRelatorioFinanceiro = document.querySelector('#alert-relatorio-financeiro')
const notificationAlertClientAdded = document.querySelector('#notificationAlertClientAdded')
const notificationAlertClientDeleted = document.querySelector('#notificationAlertClientDeleted')
const notificationAlertClientUpdated = document.querySelector('#notificationAlertClientUpdated')
const notificationAlertGeneratedPDF = document.querySelector('#notificationAlertGeneratedPDF')

const notificationBadge = document.querySelector('.notification-badge')
const btnNotification = document.querySelector('#btnNotification')
const notificacaoConteudo = document.querySelector('.notificacao-conteudo')
const notificacaoBody = document.querySelector('.notificacao-body')

// Função para mudar o menu

const list = document.querySelectorAll('.list-home, .list-clientes, .list-financeiro, .list-calendario, .list-ajuda, .list-configuracoes')

function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'))
    this.classList.add('active')
}

list.forEach((item) =>
    item.addEventListener('click', activeLink))

// Função para trocar as abas

const abaClientes = document.querySelector('.containerTable')
const navClientes = document.querySelector('.nav')
const information = document.querySelector('.information')

const informationFinanceiro = document.querySelector('#informationFinanceiro')
const navFinanceiro = document.querySelector('#navFinanceiro')
const containerTableFinanceiro = document.querySelector('#containerTableFinanceiro')

const abaCalendar = document.querySelector('#calendar')

const clientes = () => {
    const clientes = document.querySelector('.list-clientes').addEventListener('click', () => {
        console.log('Cliquei na aba clientes')
        console.log(abaClientes.style.display)
        if (abaClientes.style.display == 'none' && navClientes.style.display == 'none') {
            // Colocar visivelmente aba cliente
            abaClientes.style.display = 'block'
            navClientes.style.display = 'flex'
            information.style.display = 'flex'

            // Deixar aba financeiro oculta
            containerTableFinanceiro.style.display = 'none'
            informationFinanceiro.style.display = 'none'
            navFinanceiro.style.display = 'none'

            // Deixar a aba calendario oculta
            abaCalendar.style.display = 'none'

        }
    })
}

const financeiro = () => {
    const financeiro = document.querySelector('.list-financeiro').addEventListener('click', () => {
        console.log('Cliquei na aba financeiro')
        if (containerTableFinanceiro.style.display = 'none') {
            // Deixar aba clientes oculta
            abaClientes.style.display = 'none'
            navClientes.style.display = 'none'
            information.style.display = 'none'

            // Deixar aba financeiro visivel
            containerTableFinanceiro.style.display = 'block'
            informationFinanceiro.style.display = 'flex'
            navFinanceiro.style.display = 'flex'

            // Deixar a aba calendario oculta
            abaCalendar.style.display = 'none'

            // alertas ocultos
            dangerAlert.style.display = 'none'
            successAlert.style.display = 'none'
            alertRelatorio.style.display = 'none'
            updateAlert.style.display = 'none'
            deletedAlert.style.display = 'none'
        }
    })
}

const calendar = () => {
    const calendar = document.querySelector('.list-calendario').addEventListener('click', () => {
        console.log('Cliquei na aba calendário')
        if (abaCalendar.style.display = 'none') {
            //Deixar a aba de clientes ocultas
            abaClientes.style.display = 'none'
            navClientes.style.display = 'none'
            information.style.display = 'none'

            // Deixar a aba financeiro oculto
            containerTableFinanceiro.style.display = 'none'
            informationFinanceiro.style.display = 'none'
            navFinanceiro.style.display = 'none'

            // Deixar a aba calendario visivel
            abaCalendar.style.display = 'flex'
        }
    })
}

clientes()
financeiro()
calendar()

// Adicionar dados na table com classes

class TableData {
    constructor() {
        this.tableData = []
        this.lastId = 0
    }

    addData(profissional, nome, email, telefone, celular, corte, data, valor) {
        const id = generateUniqueId();
        this.tableData.push({ id, profissional, nome, email, telefone, celular, corte, data, valor });
    }
    renderTable() {
        const tableBody = document.querySelector('#table tbody')
        tableBody.innerHTML = ""

        this.tableData.forEach(data => {
            const row = tableBody.insertRow()

            const profissionalCell = row.insertCell()
            profissionalCell.textContent = data.profissional

            const nameCell = row.insertCell()
            nameCell.textContent = data.nome

            const emailCell = row.insertCell()
            emailCell.textContent = data.email

            const telefoneCell = row.insertCell()
            telefoneCell.textContent = data.telefone

            const celularCell = row.insertCell()
            celularCell.textContent = data.celular

            const corteCell = row.insertCell()
            corteCell.textContent = data.corte

            const dataCell = row.insertCell()
            dataCell.textContent = data.data

            const valorCell = row.insertCell()
            valorCell.textContent = `R$ ${data.valor}`

            const actionsCell = row.insertCell() // celula para as ações

            // Botão editar
            const editButton = document.createElement("button")
            editButton.classList.add("btn", "btn-warning", "btn-sm", "espacamento-botoes") // Adicionando classes do bootstrap
            editButton.innerHTML = '<i class="fas fa-edit"></i>' // Adicionando o icone do font-awesome
            editButton.addEventListener("click", () => {
                // Lógica para editar o cliente com base nos dados do objeto 'data'
                editButton.setAttribute("data-toggle", "modal");
                editButton.setAttribute("data-target", "#modal-edit");
                console.log("Editar o cliente com o id:", data.id)

                // criando variaveis e trazendo os valores dos vetores
                const id = data.id
                const spanNomeClienteEdicao = data.nome
                const spanEmailEdicao = data.email
                const spanTelefoneEdicao = data.telefone
                const spanCelularEdicao = data.celular
                const spanCorteEdicao = data.corte
                const spanDataEdicao = data.data
                const spanValorEdicao = data.valor

                // mostrando os valores dos vetores no modal
                this.editarCliente(spanNomeClienteEdicao, spanEmailEdicao, spanTelefoneEdicao, spanCelularEdicao, spanCorteEdicao, spanDataEdicao, spanValorEdicao)

                // criando uma variavel para o botao de update e pegando o id dele
                const btnUpdate = document.querySelector('#btnUpdate')

                // evento de clique
                btnUpdate.addEventListener('click', () => {
                    // pegando novamente os inputs
                    const spanNomeClienteEdicao = document.querySelector('#nomeEdicao')
                    const spanEmailEdicao = document.querySelector('#emailEdicao')
                    const spanTelefoneEdicao = document.querySelector('#telefoneEdicao')
                    const spanCelularEdicao = document.querySelector('#celularEdicao')
                    const spanCorteEdicao = document.querySelector('#corteEdicao')
                    const spanDataEdicao = document.querySelector('#dataEdicao')
                    const spanValorEdicao = document.querySelector('#valorEdicao')

                    // criando variaveis de pegando o valores do inputs
                    const novoNome = spanNomeClienteEdicao.value
                    const novoEmail = spanEmailEdicao.value
                    const novoTelefone = spanTelefoneEdicao.value
                    const novoCelular = spanCelularEdicao.value
                    const novoCorte = spanCorteEdicao.value
                    const novaData = spanDataEdicao.value
                    const novoValor = spanValorEdicao.value

                    if (novoNome.trim() === '' || novoEmail.trim() === '' || novoCelular.trim() === '' || novoCorte.trim() === '' || novaData.trim() === '' || novoValor.trim() === '') {
                        dangerAlert.style.display = 'flex'
                        successAlert.style.display = 'none'
                        alertRelatorio.style.display = 'none'
                        updateAlert.style.display = 'none'
                        deletedAlert.style.display = 'none'
                        alertRelatorioFinanceiro.style.display = 'none'
                    } else {

                        successAlert.style.display = 'none'
                        dangerAlert.style.display = 'none'
                        alertRelatorio.style.display = 'none'
                        updateAlert.style.display = 'flex'
                        deletedAlert.style.display = 'none'
                        alertRelatorioFinanceiro.style.display = 'none'

                        // atualizando o vetor com os novos inputs atualizados
                        data.nome = novoNome
                        data.email = novoEmail
                        data.telefone = novoTelefone
                        data.celular = novoCelular
                        data.corte = novoCorte
                        data.data = novaData
                        data.valor = novoValor

                        adicionarNotificacao('success', `Cliente ${novoNome} atualizado com sucesso.`);
                        atualizarNotificacaoBadge()

                        // Atualizar dados da tabela   
                        tableData.renderTable()
                        tableData.totalFinanceiro()

                        console.log(tableData)
                    }
                })
            })
            actionsCell.appendChild(editButton)

            // Botão de apagar
            const delButton = document.createElement("button")
            delButton.classList.add("btn", "btn-danger", "btn-sm", "espacamento-botoes") // Adicionando classes do bootstrap
            delButton.innerHTML = '<i class="fas fa-trash-alt"></i>' // Adicionando o icone do font-awesome
            delButton.addEventListener("click", () => {
                // Lógica para editar o cliente com base nos dados do objeto 'data'
                delButton.setAttribute("data-toggle", "modal");
                delButton.setAttribute("data-target", "#modalExemplo");
                const nomecliente = data.nome
                this.prepararExclusao(nomecliente)

                const btnDel = document.querySelector('#btnDel')
                btnDel.addEventListener('click', () => {
                    const idCliente = data.id
                    tableData.excluirCliente(idCliente)

                    successAlert.style.display = 'none'
                    dangerAlert.style.display = 'none'
                    alertRelatorio.style.display = 'none'
                    updateAlert.style.display = 'none'
                    deletedAlert.style.display = 'flex'
                    alertRelatorioFinanceiro.style.display = 'none'

                    adicionarNotificacao('danger', `Cliente ${data.nome} deletado com sucesso.`);
                    atualizarNotificacaoBadge()

                    tableData.renderTable()
                    tableData.renderTableFinanceiro()
                    tableData.totalFinanceiro()
                })
                console.log("Apagar o cliente com o id:", data.id)
            })
            actionsCell.appendChild(delButton)
        })
    }

    editarCliente(nomeEdicao, emailEdicao, telefoneEdicao, celularEdicao, corteEdicao, dataEdicao, valorEdicao) {
        // Pegando os ids do modal de edição
        const spanNomeClienteEdicao = document.querySelector('#nomeEdicao')
        const spanEmailEdicao = document.querySelector('#emailEdicao')
        const spanTelefoneEdicao = document.querySelector('#telefoneEdicao')
        const spanCelularEdicao = document.querySelector('#celularEdicao')
        const spanCorteEdicao = document.querySelector('#corteEdicao')
        const spanDataEdicao = document.querySelector('#dataEdicao')
        const spanValorEdicao = document.querySelector('#valorEdicao')

        // Adicionando o value dos inputs com os parametros
        spanNomeClienteEdicao.value = nomeEdicao
        spanEmailEdicao.value = emailEdicao
        spanTelefoneEdicao.value = telefoneEdicao
        spanCelularEdicao.value = celularEdicao
        spanCorteEdicao.value = corteEdicao
        spanDataEdicao.value = dataEdicao
        spanValorEdicao.value = valorEdicao

    }

    prepararExclusao(nomecliente) {
        const spanNomeClienteExclusao = document.querySelector("#nomeClienteExclusao")
        spanNomeClienteExclusao.textContent = nomecliente
    }

    excluirCliente(id) {
        this.tableData = this.tableData.filter(item => item.id !== id)
    }

    filterTable(searchTerm) {
        const tableBody = document.querySelector('#table tbody') // Captura o corpo da tabela
        const rows = tableBody.querySelectorAll('tr') // Obtem todas as linhas da tabela

        // itera sobre as linhas da tabela
        rows.forEach(row => {
            const cells = row.querySelectorAll('td') // obtem todas as celulas da linha

            // Verifica se o termo está presente ou não
            let found = false;
            cells.forEach(cell => { // includes é pra verificar se o termo existe ou nao
                if (cell.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                    // se encontra transforma a variavel em true
                    found = true
                }
            })

            // Mostrar
            if (found) {
                /* Se o termo de busca for encontrado em alguma célula, definimos o estilo de exibição 
                da linha como "" (vazio), o que significa que a linha será exibida normalmente.
                */
                row.style.display = ""
            } else {
                /* Se o termo de busca não for encontrado em alguma célula, definimos o estilo de exibição 
                da linha como "none", o que significa que a linha não será exibida.
                */
                row.style.display = "none"
            }
        })
    }

    renderTableFinanceiro() {
        const tableBodyFinanceiro = document.querySelector('#tableFinanceiro tbody')
        tableBodyFinanceiro.innerHTML = ""

        this.tableData.forEach(data => {
            const row = tableBodyFinanceiro.insertRow()

            const profissionalCell = row.insertCell()
            profissionalCell.textContent = data.profissional

            const categoriaCell = row.insertCell()
            categoriaCell.textContent = 'Serviços'

            const idCell = row.insertCell()
            idCell.textContent = data.id

            const nomeCell = row.insertCell()
            nomeCell.textContent = data.nome

            const corteCell = row.insertCell()
            corteCell.textContent = data.corte

            const dataCell = row.insertCell()
            dataCell.textContent = data.data

            const valorCell = row.insertCell()
            valorCell.textContent = `R$ ${data.valor}`

        })
    }

    totalFinanceiro() {
        const totalTitle = document.querySelector('#total')
        let total = 0
        this.tableData.forEach((data) => {
            const valorFormatado = parseFloat(data.valor.trim())

            console.log(total)
            if (!isNaN(valorFormatado)) {
                total += valorFormatado
            }
        })

        totalTitle.innerHTML = `R$ ${total.toFixed(2).replace('.', ',')}`
        this.renderTableFinanceiro()
    }

    filterTableFinanceiro(searchTerm) {
        const tableFinanceiro = document.querySelector('#tableFinanceiro tbody')
        const rows = tableFinanceiro.querySelectorAll('tr')

        rows.forEach(row => {
            const cells = row.querySelectorAll('td') // obtem todas as celulas da linha

            // Verifica se o termo está presente ou não
            let found = false;
            cells.forEach(cell => { // includes é pra verificar se o termo existe ou nao
                if (cell.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                    // se encontra transforma a variavel em true
                    found = true
                }
            })

            // Mostrar
            if (found) {
                /* Se o termo de busca for encontrado em alguma célula, definimos o estilo de exibição 
                da linha como "" (vazio), o que significa que a linha será exibida normalmente.
                */
                row.style.display = ""
            } else {
                /* Se o termo de busca não for encontrado em alguma célula, definimos o estilo de exibição 
                da linha como "none", o que significa que a linha não será exibida.
                */
                row.style.display = "none"
            }
        })
    }
}

// Instanciar 
const tableData = new TableData()

// Capturar o formulario

const submitButton = document.getElementById("btnAdd");

submitButton.addEventListener('click', (event) => {
    event.preventDefault()

    // Obter os valores dos campos 

    const profissionalInput = document.querySelector('#profissionalInput')
    const nameInput = document.querySelector('#nome')
    const emailInput = document.querySelector('#email')
    const telefoneInput = document.querySelector('#telefone')
    const celularInput = document.querySelector('#celular')
    const corteInput = document.querySelector('#corte')
    const dataInput = document.querySelector('#data')
    const valorInput = document.querySelector('#valor')

    const profissional = profissionalInput.value
    const nome = nameInput.value
    const email = emailInput.value
    const telefone = telefoneInput.value
    const celular = celularInput.value
    const corte = corteInput.value
    const data = dataInput.value
    const valor = valorInput.value

    if (nome.trim() === '' || email.trim() === '' || celular.trim() === '' || corte.trim() === '' || data.trim() === '' || valor.trim() === '') {
        dangerAlert.style.display = 'flex'
        successAlert.style.display = 'none'
        alertRelatorio.style.display = 'none'
        updateAlert.style.display = 'none'
        deletedAlert.style.display = 'none'
        alertRelatorioFinanceiro.style.display = 'none'

    } else {
        console.log(nome)

        successAlert.style.display = 'flex'
        dangerAlert.style.display = 'none'
        alertRelatorio.style.display = 'none'
        updateAlert.style.display = 'none'
        deletedAlert.style.display = 'none'
        alertRelatorioFinanceiro.style.display = 'none'

        // Adicionar dados a tabela 
        tableData.addData(profissional, nome, email, telefone, celular, corte, data, valor)

        // Limpe os campos do formulário
        // nameInput.value = "";
        // emailInput.value = "";
        // telefoneInput.value = "";
        // celularInput.value = "";
        // corteInput.value = "";
        // dataInput.value = "";
        // valorInput.value = ""

        adicionarNotificacao('success', `Cliente ${nome} foi adicionado com sucesso.`);
        atualizarNotificacaoBadge()

        adicionarNotificacao('success', `Nova transação feita com sucesso no valor de R$ ${valor}.`);
        atualizarNotificacaoBadge()

        // Atualizar dados da tabela   
        tableData.renderTable()
        tableData.renderTableFinanceiro()
        tableData.totalFinanceiro()

        console.log(tableData)
    }

})

function generateUniqueId() {
    this.lastId++
    return this.lastId.toString(36) + Math.random().toString(36).substring(2, 5);
}

// Captura o campo de busca pelo id
const searchInput = document.querySelector('#search')
const searchInputFinanceiro = document.querySelector('#searchFinaceiro')

// Adiciona um Evento de entrada ao campo de busca para atualizar a tabela de acordo com o termo de busca
searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value
    tableData.filterTable(searchTerm)
})

searchInputFinanceiro.addEventListener("input", function () {
    const searchTerm = searchInputFinanceiro.value
    tableData.filterTableFinanceiro(searchTerm)
})


// Gerar relatório

const btn_gerarRelatorio = document.querySelector('#gerarRelatorio')
const btn_gerarRelatorioFinanceiro = document.querySelector('#gerarRelatorioFinanceiro')

// Data
const data = new Date()
const dia = data.getDate()
const mes = data.getMonth() + 1
const ano = data.getFullYear()

const gerarRelatorio = () => {
    btn_gerarRelatorio.addEventListener('click', (e) => {
        console.log('PDF')

        // configurando e criando o pdf
        const pdfsize = 'a0' // Tamanho do pdf
        const pdf = new jsPDF('1', 'pt', pdfsize) // criando uma variável de pdf

        pdf.autoTable({ // Utilizando o autoTable (plugin para tabelas do jsPDF)
            html: '#table', // trazendo sua tabela do html
            // Estilos
            startY: 60,
            styles: {
                fontSize: 30,
                cellWidth: 'wrap'
            },
            columnStyle: {
                1: {
                    columnWidth: 'auto'
                }
            }, // Temas
            theme: 'grid'
            //theme: striped
            // theme: plain
        })

        successAlert.style.display = 'none'
        dangerAlert.style.display = 'none'
        alertRelatorio.style.display = 'flex'
        updateAlert.style.display = 'none'
        deletedAlert.style.display = 'none'
        alertRelatorioFinanceiro.style.display = 'none'

        adicionarNotificacao('info', `Relatório do dia: ${dia}/${mes}/${ano} gerado com sucesso.`);
        atualizarNotificacaoBadge()

        pdf.save('relatório.pdf')
    })
}

const gerarRelatorioFinanceiro = () => {
    btn_gerarRelatorioFinanceiro.addEventListener('click', () => {
        console.log('PDF Financeiro')

        // configurando e criando o pdf
        const pdfsize = 'a0' // Tamanho do pdf
        const pdf = new jsPDF('1', 'pt', pdfsize) // criando uma variável de pdf

        pdf.autoTable({
            html: '#tableFinanceiro',
            StartY: 60,
            styles: {
                fontSize: 30,
                cellWidth: 'wrap'
            },
            columnStyle: {
                1: {
                    columnWidth: 'auto'
                }
            },
            theme: 'grid'
        })

        successAlert.style.display = 'none'
        dangerAlert.style.display = 'none'
        alertRelatorio.style.display = 'none'
        updateAlert.style.display = 'none'
        deletedAlert.style.display = 'none'
        alertRelatorioFinanceiro.style.display = 'flex'

        adicionarNotificacao('info', `Relatório Financeiro do dia: ${dia}/${mes}/${ano} gerado com sucesso.`);
        atualizarNotificacaoBadge()

        pdf.save('Relatório-Financeiro.pdf')
    })
}


gerarRelatorio()
gerarRelatorioFinanceiro()

// Input Mask Phone

const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
}

// Máscara moeda

// Definição de um método para inverter a ordem dos caracteres em uma string
String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

// Função responsável por aplicar uma máscara de moeda a um campo de input
const mascaraMoeda = (campo, evento) => {
    // Verifica a tecla pressionada com base no evento de teclado (cross-browser)
    var tecla = (!evento) ? window.event.keyCode : evento.which;

    // Obtém o valor do campo de input e remove caracteres não numéricos
    var valor = campo.value.replace(/[^\d]+/gi, '')

    // Variável para armazenar o resultado formatado da moeda (inicia com "R$ ")
    var resultado = "";

    // Definição da máscara de formatação para o valor monetário em formato brasileiro (inverte a string)
    var mascara = "##.###.###,##".reverse();

    // Loop para aplicar a máscara de acordo com a lógica
    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
        // Se o caractere da máscara não for "#", adiciona-o diretamente ao resultado
        if (mascara.charAt(x) != '#') {
            resultado += mascara.charAt(x);
            x++;
        } else {
            // Se o caractere da máscara for "#", adiciona o próximo caractere numérico do valor ao resultado
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    campo.value = resultado
}

// Notificação

// Variavel para verificar se o conteudo está aberto ou não

let isOpen = false
let numeroNotificacoes = 0

btnNotification.addEventListener('click', () => {
    // Alterar visibilidade da notificação está aberta ou não
    if (isOpen) {
        notificacaoConteudo.style.display = 'none'
        btnNotification.classList.remove('aberto')
    } else {
        notificacaoConteudo.style.display = 'block'
        btnNotification.classList.add('aberto')
    }

    isOpen = !isOpen
})

const adicionarNotificacao = (type, message) => {
    const notificationItem = document.createElement('div')
    const notificationP = document.createElement('p')
    notificationItem.classList.add('alert', `alert-${type}`)
    notificationItem.style.display = 'flex'
    notificationItem.style.margin = '3px'
    notificationP.textContent = message
    notificationItem.appendChild(notificationP)
    notificacaoBody.appendChild(notificationItem)

    const firstNotification = notificacaoBody.firstChild
    notificacaoBody.insertBefore(notificationItem, firstNotification)

    numeroNotificacoes++
    atualizarNotificacaoBadge()
}

const removerNotificacao = () => {
    if (numeroNotificacoes > 0) {
        numeroNotificacoes--
        atualizarNotificacaoBadge()
    }
}

const atualizarNotificacaoBadge = () => {
    notificationBadge.innerHTML = numeroNotificacoes
}

const btnFechar = document.querySelector('#btnFechar')
const btnLimpar = document.querySelector('#btnLimpar')

btnFechar.addEventListener('click', () => {
    notificacaoConteudo.style.display = 'none'
    btnNotification.classList.remove('aberto')
})

btnLimpar.addEventListener('click', () => {
    const notifications = document.querySelectorAll('.alert');

    // Adicionar a classe de animação para desvanecer gradualmente
    notifications.forEach((notification, index) => {
        notification.classList.add('fade-out-animation');
        // Atrasar a animação de cada notificação para criar um efeito escalonado
        setTimeout(() => {
            const updatedCount = parseInt(notificationBadge.textContent) - 1
            notificationBadge.textContent = updatedCount >= 0 ? updatedCount : 0
            notification.remove();
        }, 1000 * index); // Ajuste o valor para tornar a transição mais lenta ou mais rápida (200ms aqui)
    });
});

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

const btnExtrato = document.querySelector('#btnExtrato')

btnExtrato.addEventListener('click', () => {
    mostrarExtrato()
})

// Função para não permitir datas anteriores a atuais

const bloquearMesesAnteriores = () => {
    const dataAtual = new Date();

    dataAtual.setMinutes(dataAtual.getMinutes() - 1);
    const valorMinimo = dataAtual.toISOString().slice(0, 16); // Pega apenas os 16 primeiros caracteres

    // Obtém a referência do elemento input
    const inputDate = document.querySelector('#dataEdicao')
    const inputDateEdicao = document.querySelector('#data')

    // define os valores minimos 
    inputDate.setAttribute("min", valorMinimo)
    inputDateEdicao.setAttribute("min", valorMinimo)
}

bloquearMesesAnteriores()

// Calendar

class Evento {
    constructor() {
        this.eventsByDate = {};
    }

    // Método para adicionar eventos
    addEvent(nome, corte, data) {
        const dateString = data.toDateString();
        if (!this.eventsByDate[dateString]) {
            this.eventsByDate[dateString] = [];
        }
        this.eventsByDate[dateString].push({ nome, corte, data });
    }

    // pegar os eventos por data
    getEventsByDate(data) {
        const dateString = data.toDateString()
        return this.eventsByDate[dateString] || []
    }
}

// Precisamos criar variáveis globais para pegar o ano e o mês atual
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

// Instanciando a classe evento
const eventManager = new Evento()

// Agora precisamos pegar o corpo do calendario (tabela) e o span onde ficará o mes e o ano
const calendarBody = document.querySelector('#calendarBody')
const monthYearText = document.querySelector('#monthYear')

// Capturando o botão de salvar
submitButton.addEventListener('click', () => {
    // Pegando os dados 
    const nome = document.querySelector('#nome').value
    const corte = document.querySelector('#corte').value
    const data = new Date(document.querySelector('#data').value);

    console.log(nome)
    eventManager.addEvent(nome, corte, data)

    currentMonth = data.getMonth()
    currentYear = data.getFullYear()

    generateCalendar(currentMonth, currentYear, eventManager)
})

// Agora precisamos criar uma função para gerar o corpo do calendário

const generateCalendar = (month, year, eventManager) => {
    // Precisamos pegar o primeiro dia do mês
    const firstDay = new Date(year, month, 1).getDay()

    // Também precisamos pegar o último dia do mês
    const lastDay = new Date(year, month + 1, 0).getDate()

    // Precisaremos limpar o corpo do calendário caso tenha alguma coisa
    calendarBody.innerHTML = ''

    // Precisamos adicionar o nome e o ano atual ao h2
    monthYearText.textContent = `${getMonthName(month)} ${year}`

    // Iniciando a várivel date com 1, pois o mês inicia em 1 e não em 0.
    let date = 1

    // Agora vamos criar o corpo da tabela usando laços de repetição.
    // Se week for menor que, incremente até chegar em 5, para criar as linhas do calendário (6 linhas)
    for (let week = 0; week < 6; week++) {
        // Criando a linha 
        const row = document.createElement('tr')

        // Depois de criar as linhas precisamos criar os dias do calendário (celulas), usaremos denovo laço de repetiçaõ.
        // Enquanto dia for menor que 7, incremente uma celula até ter 7 celulas.
        for (let day = 0; day < 7; day++) {
            // vamos criar as celulas onde os dias ficarão
            const cell = document.createElement('td')

            // Adicionaremos uma classe a essa celula para poder estilizar.
            cell.classList.add('cellCalendar')

            // Agora precisamos separar onde ficarao os dias (numeros) e depois onde ficaram os eventos, primeiro criaremos onde ficaram os dias.
            const cellDay = document.createElement('p')

            // E agora precisamos adicionar o paragrafo como filho da celula (td)
            cell.appendChild(cellDay)

            // Adicionando atributos na celula para quando for clicada abrir o modal
            cell.setAttribute('data-target', '#modal-mensagem')
            cell.setAttribute('data-toggle', 'modal')

            cell.addEventListener('click', () => {
                // Pegando a data da célula clicada
                const clickedDate = new Date(year, month, parseInt(cell.textContent))

                const adjustedDate = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate())
                const dateString = adjustedDate.toISOString().slice(0, 16) // Formatando a data
                console.log(dateString)
                const data = document.querySelector('#data')
                data.value = dateString

                const nome = document.querySelector('#nome')
                const email = document.querySelector('#email')
                const telefone = document.querySelector('#telefone')
                const celular = document.querySelector('#celular')
                const corte = document.querySelector('#corte')
                const valor = document.querySelector('#valor')

                nome.value = ""
                email.value = ""
                telefone.value = ""
                celular.value = ""
                corte.value = ""
                valor.value = ""

            })

            //Agora precisamos saber se chegou no primeiro dia do mês ou se ja passou do último para os dias ficarem certos nas celulas.
            // Se a semana for igual a 0 e dia for menor que o primeiro dia, ou a data for maior que o último dia, a celula precisara estar vazia.
            if ((week === 0 && day < firstDay) || (date > lastDay)) {
                // Limpando a celula
                cell.textContent = ""

                //Caso contrário
            } else {
                // Preencha a celula (o paragrafo especificamente) com a data
                cellDay.textContent = date

                // Cria o elemento para mostrar os eventos
                const eventElement = document.createElement('div')
                eventElement.classList.add('eventContainer')
                eventElement.classList.add('celulas')

                // Verifica se ha eventos para a data atual
                const currentDate = new Date(year, month, date)
                const eventsForDate = eventManager.getEventsByDate(currentDate)

                // Mostrar os eventos na célula de cada data
                eventsForDate.forEach(event => {
                    //Precisamos criar uma div para cada evento
                    const eventItem = document.createElement('div')
                    eventItem.classList.add('eventItem')

                    eventItem.innerHTML = `<strong>${event.nome}</strong> ${event.corte}`

                    // Armazenar as informações do evento como atributos de dados
                    eventItem.dataset.eventName = event.nome

                    eventElement.appendChild(eventItem)
                })

                cell.appendChild(eventElement)

                // E precisamos incrementar a data
                date++
            }

            // Agora precisamos adicionar as celulas (tr) as linhas (adicionar como filhas)
            row.appendChild(cell)
        }
        // E também precisamos adicionar as linhas (como filhas) ao corpo do calendário
        calendarBody.appendChild(row)
    }
}

// Precisamos criar uma função com um array com os nomes dos meses para passar para o calendário
const getMonthName = (month) => {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    return monthNames[month]
}

getMonthName()
generateCalendar(currentMonth, currentYear, eventManager)

