// Funções auxiliares 



const elemento = (elemento) => document.querySelector(elemento)

// Função para mudar o menu

const list = document.querySelectorAll('.list-home, .list-clientes, .list-pagamentos, .list-calendario, .list-ajuda, .list-configuracoes')

function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'))
    this.classList.add('active')
}

list.forEach((item) =>
    item.addEventListener('click', activeLink))

// Adicionar dados na table com classes

class TableData {
    constructor() {
        this.tableData = []
        this.lastId = 0
    }

    addData(profissional, nome, email, telefone, celular, corte, data) {
        const id = generateUniqueId();
        this.tableData.push({ id, profissional, nome, email, telefone, celular, corte, data })
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

            const actionsCell = row.insertCell() // celular para as ações

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

                // mostrando os valores dos vetores no modal
                this.editarCliente(spanNomeClienteEdicao, spanEmailEdicao, spanTelefoneEdicao, spanCelularEdicao, spanCorteEdicao, spanDataEdicao)

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

                    // criando variaveis de pegando o valores do inputs
                    const novoNome = spanNomeClienteEdicao.value
                    const novoEmail = spanEmailEdicao.value
                    const novoTelefone = spanTelefoneEdicao.value
                    const novoCelular = spanCelularEdicao.value
                    const novoCorte = spanCorteEdicao.value
                    const novaData = spanDataEdicao.value

                    const dangerAlert = document.querySelector('.alert-danger')
                    const successAlert = document.querySelector('.alert-success')
                    const alertRelatorio = document.querySelector('#alert-relatorio')
                    const updateAlert = document.querySelector('#alert-update')
                    const deletedAlert = document.querySelector('#alert-deleted')

                    if (novoNome.trim() === '' || novoEmail.trim() === '' || novoCelular.trim() === '' || novoCorte.trim() === '' || novaData.trim() === '') {
                        dangerAlert.style.display = 'flex'
                        successAlert.style.display = 'none'
                        alertRelatorio.style.display = 'none'
                        updateAlert.style.display = 'none'
                        deletedAlert.style.display = 'none'
                    } else {

                        successAlert.style.display = 'none'
                        dangerAlert.style.display = 'none'
                        alertRelatorio.style.display = 'none'
                        updateAlert.style.display = 'flex'
                        deletedAlert.style.display = 'none'

                        // atualizando o vetor com os novos inputs atualizados
                        data.nome = novoNome
                        data.email = novoEmail
                        data.telefone = novoTelefone
                        data.celular = novoCelular
                        data.corte = novoCorte
                        data.data = novaData

                        // Atualizar dados da tabela   
                        tableData.renderTable()

                        // Limpe os campos do formulário
                        nameInput.value = "";
                        emailInput.value = "";
                        telefoneInput.value = "";
                        celularInput.value = "";
                        corteInput.value = "";
                        dataInput.value = "";

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

                const dangerAlert = document.querySelector('.alert-danger')
                const successAlert = document.querySelector('.alert-success')
                const alertRelatorio = document.querySelector('#alert-relatorio')
                const updateAlert = document.querySelector('#alert-update')
                const deletedAlert = document.querySelector('#alert-deleted')

                const btnDel = document.querySelector('#btnDel')
                btnDel.addEventListener('click', () => {
                    const idCliente = data.id
                    tableData.excluirCliente(idCliente)

                    successAlert.style.display = 'none'
                    dangerAlert.style.display = 'none'
                    alertRelatorio.style.display = 'none'
                    updateAlert.style.display = 'none'
                    deletedAlert.style.display = 'flex'

                    tableData.renderTable()
                })
                console.log("Apagar o cliente com o id:", data.id)
            })
            actionsCell.appendChild(delButton)
        })
    }

    editarCliente(nomeEdicao, emailEdicao, telefoneEdicao, celularEdicao, corteEdicao, dataEdicao) {
        // Pegando os ids do modal de edição
        const spanNomeClienteEdicao = document.querySelector('#nomeEdicao')
        const spanEmailEdicao = document.querySelector('#emailEdicao')
        const spanTelefoneEdicao = document.querySelector('#telefoneEdicao')
        const spanCelularEdicao = document.querySelector('#celularEdicao')
        const spanCorteEdicao = document.querySelector('#corteEdicao')
        const spanDataEdicao = document.querySelector('#dataEdicao')

        // Adicionando o value dos inputs com os parametros
        spanNomeClienteEdicao.value = nomeEdicao
        spanEmailEdicao.value = emailEdicao
        spanTelefoneEdicao.value = telefoneEdicao
        spanCelularEdicao.value = celularEdicao
        spanCorteEdicao.value = corteEdicao
        spanDataEdicao.value = dataEdicao

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

    const profissional = profissionalInput.value
    const nome = nameInput.value
    const email = emailInput.value
    const telefone = telefoneInput.value
    const celular = celularInput.value
    const corte = corteInput.value
    const data = dataInput.value

    const dangerAlert = document.querySelector('.alert-danger')
    const successAlert = document.querySelector('.alert-success')
    const alertRelatorio = document.querySelector('#alert-relatorio')
    const updateAlert = document.querySelector('#alert-update')
    const deletedAlert = document.querySelector('#alert-deleted')

    if (nome.trim() === '' || email.trim() === '' || celular.trim() === '' || corte.trim() === '' || data.trim() === '') {
        dangerAlert.style.display = 'flex'
        successAlert.style.display = 'none'
        alertRelatorio.style.display = 'none'
        updateAlert.style.display = 'none'
        deletedAlert.style.display = 'none'

    } else {
        console.log(nome)

        successAlert.style.display = 'flex'
        dangerAlert.style.display = 'none'
        alertRelatorio.style.display = 'none'
        updateAlert.style.display = 'none'
        deletedAlert.style.display = 'none'

        // Adicionar dados a tabela 
        tableData.addData(profissional, nome, email, telefone, celular, corte, data)

        // Atualizar dados da tabela   
        tableData.renderTable()

        // Limpe os campos do formulário
        nameInput.value = "";
        emailInput.value = "";
        telefoneInput.value = "";
        celularInput.value = "";
        corteInput.value = "";
        dataInput.value = "";

        console.log(tableData)
    }

})

function generateUniqueId() {
    this.lastId++
    return this.lastId.toString(36) + Math.random().toString(36).substring(2, 5);
}

// Captura o campo de busca pelo id
const searchInput = document.querySelector('#search')

// Adiciona um Evento de entrada ao campo de busca para atualizar a tabela de acordo com o termo de busca
searchInput.addEventListener("input", function () {
    console.log("teste")
    const searchTerm = searchInput.value
    tableData.filterTable(searchTerm)
})

// Gerar relatório

const btn_gerarRelatorio = document.querySelector('#gerarRelatorio')

const gerarRelatorio = () => {
    btn_gerarRelatorio.addEventListener('click', (e) => {
        console.log('PDF')
        const table = document.querySelector('#divTable').innerHTML
        const dia = new Date()

        var pdfsize = 'a0' // Tamanho do pdf
        var pdf = new jsPDF('1', 'pt', pdfsize) // criando uma variável de pdf

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
        const alertRelatorio = document.querySelector('#alert-relatorio')
        const dangerAlert = document.querySelector('.alert-danger')
        const successAlert = document.querySelector('.alert-success')

        dangerAlert.style.display = 'none'
        successAlert.style.display = 'none'
        alertRelatorio.style.display = 'flex'

        pdf.save('relatório.pdf')
    })
}

gerarRelatorio()

// Input Mask 

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

