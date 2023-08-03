// Máscara moeda

// Definição de um método para inverter a ordem dos caracteres em uma string
String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

// Função responsável por aplicar uma máscara de moeda a um campo de input
const mascaraMoeda = (campo, evento) => {
    // Verifica a tecla pressionada com base no evento de teclado (cross-browser)
    var tecla = (!evento) ? window.event.keyCode : evento.which;

    // Obtém o valor do campo de input e remove caracteres não numéricos
    var valor = campo.value.replace(/[^\d]+/gi, '')

    // Variável para armazenar o resultado formatado da moeda (inicia com "R$ ")
    var resultado = "";

    // Definição da máscara de formatação para o valor monetário em formato brasileiro (inverte a string)
    var mascara = "##.###.###,##".reverse();

    // Loop para aplicar a máscara de acordo com a lógica
    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
        // Se o caractere da máscara não for "#", adiciona-o diretamente ao resultado
        if (mascara.charAt(x) != '#') {
            resultado += mascara.charAt(x);
            x++;
        } else {
            // Se o caractere da máscara for "#", adiciona o próximo caractere numérico do valor ao resultado
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    campo.value = resultado
}

export { mascaraMoeda }