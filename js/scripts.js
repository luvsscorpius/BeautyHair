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

            const idCell = row.insertCell()
            idCell.textContent = data.id

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
    const id = tableData.id

    const dangerAlert = document.querySelector('.alert-danger')
    const successAlert = document.querySelector('.alert-success')
    const alertRelatorio = document.querySelector('#alert-relatorio')

    if (nome.trim() === '' || email.trim() === '' || celular.trim() === '' || corte.trim() === '' || data.trim() === '') {
        dangerAlert.style.display = 'flex'
        successAlert.style.display = 'none'
        alertRelatorio.style.display = 'none'

    } else {
        console.log(nome)

        successAlert.style.display = 'flex'
        dangerAlert.style.display = 'none'
        alertRelatorio.style.display = 'none'

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
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 5)
}

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
