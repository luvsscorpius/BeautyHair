// Precisamos criar uma função com um array com os nomes dos meses para passar para o calendário
const getMonthName = (month) => {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    return monthNames[month]
}

export { getMonthName }