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

// Função para abrir o menu

