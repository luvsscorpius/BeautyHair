// Data
const data = new Date()
const dia = data.getDate()
const mes = data.getMonth() + 1
const ano = data.getFullYear()

const gerarRelatorio = () => {
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
}

const gerarRelatorioFinanceiro = () => {
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
}

export { gerarRelatorio }
export { gerarRelatorioFinanceiro }