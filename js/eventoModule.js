// Importando getMonthNameModule
import { getMonthName } from "./getMonthNameModule.js"
import { currentMonth, currentYear } from "./main.js"

// Calendar

class Evento {
    constructor() {
        this.eventsByDate = {};
    }

    // Método para adicionar eventos
    addEvent(nome, color, data, corte) {
        const dateString = data.toDateString();

        // Criando uma forma de não deixar a criação de eventos antes do dia atual
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        if (data >= currentDate) {
            if (!this.eventsByDate[dateString]) {
                this.eventsByDate[dateString] = [];
            }
            this.eventsByDate[dateString].push({ nome, corte, data, color });
        } else {
            console.log("Não é possível criar eventos em datas passadas")
        }
    }

    // pegar os eventos por data
    getEventsByDate(data) {
        const dateString = data.toDateString()
        return this.eventsByDate[dateString] || []
    }

    // Método para alterar o evento
    updateEvent(oldNome, oldColor, oldDate, novoNome, novaCor, novaData) {
        // Também precisaremos verificar se o evento existe naquela data para poder alterar
        const oldDateString = oldDate.toDateString()

        if (this.eventsByDate[oldDateString]) {
            const oldEventIndex = this.eventsByDate[oldDateString].findIndex(event => {
                return event.nome === oldNome && event.color === oldColor
            })

            // Se o evento existir, precisamos achar o evento especifico
            if (oldEventIndex !== -1) {
                this.eventsByDate[oldDateString][oldEventIndex].nome = novoNome
                this.eventsByDate[oldDateString][oldEventIndex].color = novaCor
                this.eventsByDate[oldDateString][oldEventIndex].data = novaData
            } else {
                console.log('Evento não encontrado na lista')
            }
        }

    }

    // Método para deletar eventos da lista
    deleteEvent(nome, color, date) {
        // transformando a data em string
        const dateString = date.toDateString()
        console.log(dateString)

        // Verificar se o evento existe
        if (this.eventsByDate[dateString]) {
            // Depois de verificar se existe, precisamos achar o evento especifico
            const eventIndex = this.eventsByDate[dateString].findIndex(event => {
                return event.nome === nome && event.color === color
            })
            // se o eventIndex for diferente de -1 faça
            if (eventIndex !== -1) {
                // o método splice remove o evento do array
                this.eventsByDate[dateString].splice(eventIndex, 1)
            } else {
                // Caso o evento não seja encontrado
                console.log('Evento não encontrado na lista.')
            }
        }
    }
}

// Instanciando a classe evento
const eventManager = new Evento()

// Agora precisamos pegar o corpo do calendario (tabela) e o span onde ficará o mes e o ano
const calendarBody = document.querySelector('#calendarBody')
const monthYearText = document.querySelector('#monthYear')

// Agora precisamos criar uma função para gerar o corpo do calendário

const generateCalendar = (month, year, eventManager) => {
    // Precisamos pegar o primeiro dia do mês
    const firstDay = new Date(year, month, 1).getDay()

    // Também precisamos pegar o último dia do mês
    const lastDay = new Date(year, month + 1, 0).getDate()

    // Precisamos saber o número do dia atual
    const today = new Date().getDate()

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
            let cell = document.createElement('td')

            // Adicionaremos uma classe a essa celula para poder estilizar.
            cell.classList.add('cellCalendar')

            // Agora precisamos separar onde ficarao os dias (numeros) e depois onde ficaram os eventos, primeiro criaremos onde ficaram os dias.
            let cellDay = document.createElement('p')

            // E agora precisamos adicionar o paragrafo como filho da celula (td)
            cell.appendChild(cellDay)

            cell.addEventListener('click', () => {

                // Pegando a data da célula clicada
                const clickedDate = new Date(year, month, parseInt(cell.textContent))

                // Precisamos setar as horas para 00 para conseguir criar na data atual também
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                const clickedDateWithoutTime = new Date(clickedDate);
                clickedDateWithoutTime.setHours(0, 0, 0, 0);

                if (new Date() >= clickedDate && clickedDateWithoutTime.getTime() !== currentDate.getTime()) {
                    cell.getAttribute('data-disabled') === 'true'
                } else {
                    // Adicionando atributos na celula para quando for clicada abrir o modal
                    cell.setAttribute('data-target', '#modalEvento')
                    cell.setAttribute('data-toggle', 'modal')

                }

                // Capturar o evento clicado
                const clickedEvent = event.target.closest('.eventItem')
                if (clickedEvent) {

                    // Setando o atributo para que se houver evento ele chame o modal de edição/exclusão
                    cell.setAttribute('data-target', '#modalEdicao')
                    cell.setAttribute('data-toggle', 'modal')

                    //Capturando os dados do evento clicado que foi previamente salvo no dataset quando o evento eh criado
                    const nome = clickedEvent.dataset.eventTitle
                    const color = clickedEvent.dataset.eventColor
                    const adjustedDate = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate());
                    const dateString = adjustedDate.toISOString().slice(0, 16); // formata a data para 'YYYY-MM-DDTHH:mm'

                    // Agora precisamos pegar os inputs do modal para inserir esses valores no modal
                    const nomeInput = document.querySelector('#eventTitleEdicao')
                    const colorInput = document.querySelector('#eventColorEdicao')
                    const dateInput = document.querySelector('#eventTimeEdicao')

                    //Atribuindo os valores do evento clicado no input de edição
                    nomeInput.value = nome
                    colorInput.value = color
                    dateInput.value = dateString

                    //Pegando o botão de salvar edição e de exclusão
                    const btnSalvarEdicao = document.querySelector('#btnSalvarEdicao')
                    const btnDeletar = document.querySelector('#btnDeleteEvent')

                    // Evento de clique
                    btnSalvarEdicao.addEventListener('click', () => {
                        console.log('Salvei')

                        // Agora que o evento de clique foi adicionado, precisamos criar novas constantes que irão receber os novos dados do input
                        const novoNome = nomeInput.value
                        const novaCor = colorInput.value
                        const novaData = dateInput.value

                        // E também precisaremos saber quais erao as informações antigas
                        const oldNome = clickedEvent.dataset.eventTitle
                        const oldColor = clickedEvent.dataset.eventColor

                        // console.log(eventManager.eventsByDate)

                        // Precisamos chamar o método da classe que atualiza os dados
                        eventManager.updateEvent(oldNome, oldColor, clickedDate, novoNome, novaCor, novaCor)

                        //E precisamos renderizar o calendário novamente atualizado
                        generateCalendar(currentMonth, currentYear, eventManager)
                    })

                    // Evento de clique para apagar o evento
                    btnDeletar.addEventListener('click', () => {
                        console.log('Deletei')

                        // Precisamos pegar as informações do evento clicado a serem deletados
                        const nomeToDelete = clickedEvent.dataset.eventTitle
                        const colorToDelete = clickedEvent.dataset.eventColor
                        const dateToDelete = new Date(clickedEvent.dataset.eventDate) // Converter a data de volta para objeto Date
                        console.log(dateToDelete)

                        // Precisamos enviar as informações a serem deletadas igualmente como foi no de atualizar mas agora mudando o método 
                        eventManager.deleteEvent(nomeToDelete, colorToDelete, dateToDelete)

                        // E atualizar o calendário novamente
                        generateCalendar(currentMonth, currentYear, eventManager)

                        console.log(eventManager.eventsByDate)
                    })

                } else {
                    // Pegando a data da célula clicada
                    const clickedDate = new Date(year, month, parseInt(cell.textContent))

                    const adjustedDate = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate())
                    const dateString = adjustedDate.toISOString().slice(0, 16) // Formatando a data
                    console.log(dateString)
                    const data = document.querySelector('#eventTime')
                    data.value = dateString

                    const nome = document.querySelector('#eventTitle')
                    const color = document.querySelector('#eventColor')

                    nome.value = ""
                    color.value = ""
                }

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

                    // Coloca a cor de fundo escolhida pelo usuário
                    eventItem.style.backgroundColor = event.color
                    // Coloca o titulo adicionado pelo usuário com negrito
                    eventItem.innerHTML = `<strong>${event.nome}</strong>`;

                    // Armazenar as informações do evento como atributos de dados
                    eventItem.dataset.eventTitle = event.nome
                    eventItem.dataset.eventColor = event.color
                    eventItem.dataset.eventDate = event.data
                    console.log(event.data)
                    // eventItem.dataset.eventDate = event.data.toISOString().slice(0, 16); // transforma O formato resultante será algo como "AAAA-MM-DDTHH:mm:ss.sssZ".

                    eventElement.appendChild(eventItem)
                })

                // Verificar o dia atual para estilizar o paragrafo
                if (month === currentMonth && year === currentYear) {
                    if (parseInt(cellDay.textContent) === today && month === new Date().getMonth()) {
                        cellDay.classList.add('cellDay')
                    } else {
                        cellDay.classList.remove('cellDay')
                    }
                } else {
                    cellDay.classList.remove('cellDay')
                }

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

export { generateCalendar }
export { currentMonth, currentYear, eventManager, monthYearText }