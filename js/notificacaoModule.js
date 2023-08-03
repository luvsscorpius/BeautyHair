// Módulo notificacao 
const notificationBadge = document.querySelector('.notification-badge')
const btnNotification = document.querySelector('#btnNotification')
const notificacaoConteudo = document.querySelector('.notificacao-conteudo')
const notificacaoBody = document.querySelector('.notificacao-body')

let numeroNotificacoes = 0

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

export { adicionarNotificacao, removerNotificacao, atualizarNotificacaoBadge, notificacaoConteudo, btnNotification }