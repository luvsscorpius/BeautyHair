// Função para abrir menu/fechar

const abrirMenu = () => {
    const header = document.querySelector('#navigation')

    if (header.style.display === 'none') {
        header.style.display = 'block'
        header.classList.add('animate__animated', 'animate__slideInLeft') // adiciona a transição de entrada
    } else {
        header.classList.remove('animate__slideInLeft')
        header.classList.add('animate__animated', 'animate__slideOutLeft')
        setTimeout(() => {
            header.style.display = 'none'
            header.classList.remove('animate__slideOutLeft')
        }, 500)
    }
}

export { abrirMenu }