// Importando a função de trocar a aba do menu
import { clientes } from "./menuModule.js"
import { financeiro } from "./menuModule.js"
import { calendar } from "./menuModule.js"

document.querySelector('.list-clientes').addEventListener('click', clientes)
document.querySelector('.list-financeiro').addEventListener('click', financeiro)
document.querySelector('.list-calendario').addEventListener('click', calendar)

// Importando a tableDataModule e alertasModule e notificacaoModule
import { tableData } from "./tableDataModule.js"

import { dangerAlert, successAlert, alertRelatorio, updateAlert, deletedAlert, alertRelatorioFinanceiro } from "./alertasModule.js"
import { adicionarNotificacao, removerNotificacao, atualizarNotificacaoBadge } from "./notificacaoModule.js"
// Capturar o formulario

// Precisamos criar variáveis globais para pegar o ano e o mês atual
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

export { currentMonth, currentYear }

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
    const data = new Date(dataInput.value.trim()).toISOString().slice(0, 16)
    const valor = valorInput.value

    if (nome.trim() === '' || email.trim() === '' || celular.trim() === '' || corte.trim() === '' || data === '' || valor.trim() === '') {
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
        nameInput.value = "";
        emailInput.value = "";
        telefoneInput.value = "";
        celularInput.value = "";
        corteInput.value = "";
        dataInput.value = "";
        valorInput.value = ""

        adicionarNotificacao('success', `Cliente ${nome} foi adicionado com sucesso.`);
        atualizarNotificacaoBadge()

        adicionarNotificacao('success', `Nova transação feita com sucesso no valor de R$ ${valor}.`);
        atualizarNotificacaoBadge()

        // Atualizar dados da tabela   
        tableData.renderTable()
        tableData.renderTableFinanceiro()
        tableData.totalFinanceiro()

        const color = document.querySelector('#eventColor')
        color.value = "#1976d2"
        eventManager.addEvent(nome, color.value, new Date(data), corte)

        currentMonth = new Date(data).getMonth()
        currentYear = new Date(data).getFullYear()

        generateCalendar(currentMonth, currentYear, eventManager)
    }

})
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

// Importando módulo gerarRelatorios
import { gerarRelatorio } from "./gerarRelatoriosModule.js"
import { gerarRelatorioFinanceiro } from "./gerarRelatoriosModule.js"

// Gerar relatório

const btn_gerarRelatorio = document.querySelector('#gerarRelatorio')
const btn_gerarRelatorioFinanceiro = document.querySelector('#gerarRelatorioFinanceiro')

btn_gerarRelatorio.addEventListener('click', gerarRelatorio)
btn_gerarRelatorioFinanceiro.addEventListener('click', gerarRelatorioFinanceiro)

// Importando phoneMaskModules.js
import { handlePhone } from "./phoneMaskModule.js"

const telefone = document.querySelector('#telefone')
telefone.addEventListener('keyup', (event) => {
    handlePhone(event.target, event)
})

const celular = document.querySelector('#celular')
celular.addEventListener('keyup', (event) => {
    handlePhone(event.target, event)
})

const telefoneEdicao = document.querySelector('#telefoneEdicao')
telefoneEdicao.addEventListener('keyup', (event) => {
    handlePhone(event.target, event)
})

const celularEdicao = document.querySelector('#celularEdicao')
celularEdicao.addEventListener('keyup', (event) => {
    handlePhone(event.target, event)
})

// Importando mascaraMoedaModule
import { mascaraMoeda } from "./mascaraMoedaModule.js"

const valor = document.querySelector('#valor').addEventListener('keyup', (event) => {
    mascaraMoeda(event.target, event)
})

const valorEdicao = document.querySelector('#valorEdicao').addEventListener('keyup', (event) => {
    mascaraMoeda(event.target, event)
})

//Importando notificacaoModule
import { notificacaoConteudo, btnNotification, notificationBadge } from "./notificacaoModule.js"

let isOpen = false

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

// Importando mostrarExtratoModule
import { mostrarExtrato } from "./mostrarExtratoModule.js"

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

// Importando eventoModule
import { generateCalendar, eventManager, monthYearText } from "./eventoModule.js"

const btnSalvar = document.querySelector('#btnSalvar')

//Capturando o botão de salvar
btnSalvar.addEventListener('click', () => {
    // Pegando os dados 
    const nome = document.querySelector('#eventTitle').value
    const color = document.querySelector('#eventColor').value
    const data = new Date(document.querySelector('#eventTime').value);

    eventManager.addEvent(nome, color, data)

    currentMonth = data.getMonth()
    currentYear = data.getFullYear()

    generateCalendar(currentMonth, currentYear, eventManager)
})

// vamos capturar a cor selecionada
const eventColorSelect = document.querySelector("#eventColor")
const eventColorEdicaoSelect = document.querySelector("#eventColorEdicao")
const selectedOption = document.querySelector(".selected-option");
const selectedOptionEdicao = document.querySelector("#selectedOptionEdicao");

// Evento de escuta para saber qual foi escolhida e quando foi trocada
eventColorSelect.addEventListener("change", () => {
    const color = eventColorSelect.value
    selectedOption.style.backgroundColor = color
})

eventColorEdicaoSelect.addEventListener("change", () => {
    const color = eventColorEdicaoSelect.value
    selectedOptionEdicao.style.backgroundColor = color
})

//Importando getMonthNameModule 
import { getMonthName } from "./getMonthNameModule.js"

const previousMonth = document.querySelector('#previousMonth')
const nextMonth = document.querySelector('#nextMonth')

//Controlar a animação
let isAnimating = false;

previousMonth.addEventListener('click', () => {
    if (isAnimating) return; // Evita cliques repetidos durante a animação
    isAnimating = true;

    // Precisamos tirar um mês quando for clicado
    currentMonth--
    if (currentMonth < 0) {
        currentMonth = 11
        currentYear--
    }

    monthYearText.classList.add('fade-slide-previous')

    // Vamos usar o setTimeOut para dar a animação
    setTimeout(() => {
        monthYearText.classList.remove('fade-slide-previous')
        isAnimating = false;
    }, 300)

    generateCalendar(currentMonth, currentYear, eventManager)
})

nextMonth.addEventListener('click', () => {
    if (isAnimating) return; // Evita cliques repetidos durante a animação
    isAnimating = true;

    // Adiciona mais um ao mes atual
    currentMonth++
    // Se mês atual for maior que 11 (no caso 12) ele atualiza a variável para 0
    if (currentMonth > 11) {
        currentMonth = 0
        // E adiciona mais 1 ao ano atual
        currentYear++
    }

    monthYearText.classList.add('fade-slide-next')

    void monthYearText.offsetWidth;

    // Vamos usar o setTimeOut para dar a animação
    setTimeout(() => {
        monthYearText.classList.remove('fade-slide-next')
        isAnimating = false;
    }, 300)

    generateCalendar(currentMonth, currentYear, eventManager)
})

getMonthName()
generateCalendar(currentMonth, currentYear, eventManager)

// Importando abrirMenuModule
import { abrirMenu } from "./abrirMenuModule.js"

const barras = document.querySelector('#barras')

barras.addEventListener('click', (e) => {
    e.preventDefault()
    abrirMenu()
})