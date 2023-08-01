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

const dangerAlert = document.querySelector('.alert-danger')
const successAlert = document.querySelector('.alert-success')
const alertRelatorio = document.querySelector('#alert-relatorio')
const updateAlert = document.querySelector('#alert-update')
const deletedAlert = document.querySelector('#alert-deleted')
const alertRelatorioFinanceiro = document.querySelector('#alert-relatorio-financeiro')

const abaCalendar = document.querySelector('#calendar')

const clientes = () => {
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
}

const financeiro = () => {
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
}

const calendar = () => {
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

        // alertas ocultos
        dangerAlert.style.display = 'none'
        successAlert.style.display = 'none'
        alertRelatorio.style.display = 'none'
        updateAlert.style.display = 'none'
        deletedAlert.style.display = 'none'
    }
}

export { clientes, financeiro, calendar }