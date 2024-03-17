/*let timeoutId; // Variável para armazenar o ID do timeout
let contadorCliques = 0;
let lastClickTime = 0;
const intervaloDeClique = 1000; // 1 segundo
const tempoContagemRegressiva = 30000; // 30 segundos

function verificarTexto() {
    const textoSaida = document.getElementById('textoSaida').value;
    const imagemAlerta = document.getElementById('pisca__alerta');
    
    // Verifica se o texto na área de saída está vazio
    if (textoSaida.trim() === '') {
        // Se estiver vazio, mostra a imagem de alerta
        imagemAlerta.style.display = 'block';
    } else {
        // Se não estiver vazio, oculta a imagem de alerta
        imagemAlerta.style.display = 'none';
    }
}

// Chama a função verificarTexto quando a página é carregada
window.onload = verificarTexto;

// Chama a função verificarTexto quando o texto na área de saída é alterado
document.getElementById('textoSaida').addEventListener('input');


document.addEventListener('DOMContentLoaded', () => {
    const textareaSaida = document.getElementById('textoSaida');
    const imagemAdaptavel = document.getElementById('imagemAdaptavel');

    // Função para mostrar ou ocultar a imagem adaptável
    function mostrarOcultarImagemAdaptavel() {
        if (textareaSaida.value.trim() === '') {
            imagemAdaptavel.style.display = 'block';
        } else {
            imagemAdaptavel.style.display = 'none';
        }        
    }   
     mostrarOcultarImagemAdaptavel();
    // Mostrar ou ocultar a imagem adaptável na inicialização
    // Adicionar um ouvinte de evento para quando o texto da textarea mudar
    textareaSaida.addEventListener('input', mostrarOcultarImagemAdaptavel);
});

// Função para fazer um elemento piscar
function fazerPiscar(elemento) {
    setInterval(() => {
        elemento.style.visibility = (elemento.style.visibility === 'hidden') ? 'visible' : 'hidden';
    }, 500); // Intervalo de 500 milissegundos (0.5 segundos)
}

// Obtém todos os elementos <span> e faz cada um piscar
document.querySelectorAll('span').forEach(span => {
    fazerPiscar(span);
});


function verificaCampos() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    const textoNaSaida = document.getElementById('textoSaida').value;
    const instrucaoNaSaida = document.getElementById('instrucaoNaSaida');
    if (textoNaEntrada.trim() !== 'Digite seu texto' && textoNaSaida !== 'Você deve copiar o texto! Em 30 segundos, esta mensagem se AUTO-DESTRUIRÁ!') {
        // Exibe a instrução na saída
        instrucaoNaSaida.style.display = 'block';


        // Reinicia o temporizador com 30 segundos
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            limparCampoEntrada();
            resetSaida();
        }, 30000);
    }
} 

function limparCampoEntrada() {
    document.getElementById('textoEntrada').value = '';
}
document.getElementById('textoSaida').addEventListener('click', async function () {
    const currentTime = new Date().getTime(); // Obtém o tempo atual
    if (currentTime - lastClickTime < intervaloDeClique) {
        limparCampoEntrada();
        resetSaida();
        // Reinicia o contador
        location.reload();
  // Reinicia o contador
        contadorCliques = 0;

        // Limpa o clipboard
        try {
            await navigator.clipboard.writeText(''); // Copia texto vazio para o clipboard
        } catch (error) {
            console.error('Erro ao limpar o clipboard:', error);
        }
    } else {
        // Se o intervalo for maior ou igual a 1 segundo, reinicie o temporizador
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            limparCampoEntrada();
            resetSaida();
        }, tempoContagemRegressiva);
    }
    lastClickTime = currentTime; // Atualiza o tempo do último clique
});


function resetSaida() {
    document.getElementById('textoSaida').value = '';
    document.getElementById('instrucaoNaSaida').style.display = 'none';

}


document.getElementById('textoEntrada').addEventListener('click', function () {
    limparCampoEntrada();
    resetMensagemErro();
});
document.addEventListener('DOMContentLoaded', () => {
    resetSaida();
});
function resetMensagemErro() {
    document.getElementById('mensagens__de__erro').textContent = '';
    document.getElementById('mensagens__de__erro').style.visibility = 'hidden';
    document.getElementById('pisca__alerta').style.visibility = 'hidden';
}
function exibirMensagemErro(mensagem) {
    const mensagemDeErro = document.getElementById('mensagens__de__erro');
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.style.visibility = 'visible';
    
    const screenWidth = window.innerWidth;
    if (screenWidth >= 375) { // Defina o limite de largura aqui
        document.getElementById('pisca__alerta').style.visibility = 'visible';
    } else {
        document.getElementById('pisca__alerta').style.visibility = 'hidden';
    }
}


function criptografa() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    if (textoNaEntrada.trim() === '' || textoNaEntrada === 'Digite seu texto, com palavra ou texto contínuo, somente em minúsculas e sem caracteres especiais.') {
        exibirMensagemErro('Você primeiro precisa digitar algo.');
        resetSaida();
    } else if (!/^[a-z]+$/.test(textoNaEntrada)) {
        exibirMensagemErro('Digite letras minúsculas, sem espaços, acentuação ou qualquer outro caractere.');
        resetSaida();
    } else {
        ocultarMensagemErro();
        encripta();
    }
}


function encripta() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    const textoCriptografado = textoNaEntrada.replace(/a/g, 'ai')
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
    document.getElementById('textoSaida').value = textoCriptografado;
    document.getElementById('instrucaoNaSaida').style.display = 'none';

    resetEntrada();
    verificaCampos();
  
}

function descriptografa() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    
    if (textoNaEntrada.trim() === '' || textoNaEntrada === 'Digite seu texto, com palavra ou texto contínuo, somente em minúsculas e sem caracteres especiais.') {
        exibirMensagemErro('Você primeiro precisa digitar algo.');
        resetSaida();
    } else if (!/^[a-z]+$/.test(textoNaEntrada)) {
        exibirMensagemErro('Digite somente letras minúsculas, palavra ou texto contínuo, sem espaços, acentuação ou qualquer outro caractere.');
        resetSaida();
    } else {
        const textoCriptografado = document.getElementById('textoEntrada').value;
        const textoOriginal = textoCriptografado.replace(/enter/g, 'e')
            .replace(/imes/g, 'i')
            .replace(/ai/g, 'a')
            .replace(/ober/g, 'o')
            .replace(/ufat/g, 'u');
        document.getElementById('textoSaida').value = textoOriginal;
        document.getElementById('instrucaoNaSaida').style.display = 'none';
        resetEntrada();
        verificaCampos();
    }
}




function ocultarMensagemErro() {
    document.getElementById('mensagens__de__erro').style.visibility = 'hidden';
    document.getElementById('pisca__alerta').style.visibility = 'hidden';
}
function resetEntrada() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        document.getElementById('textoEntrada').value = '';
    }, 30000);
}
document.getElementById('textoEntrada').addEventListener('click', function () {
    limparCampoEntrada();
    resetMensagemErro();
});
document.addEventListener('DOMContentLoaded', () => {
    resetSaida();
    document.getElementById('pisca__alerta').style.visibility = 'hidden';
    instrucaoCampoEntrada();
});
function copiaParaTransferir() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    if (textoNaEntrada !== 'Digite seu texto, com palavra ou texto contínuo, somente em minúsculas e sem caracteres especiais.') {
        const textoNaSaida = document.getElementById('textoSaida').value;
        if (textoNaSaida) {
            navigator.clipboard.writeText(textoNaSaida)
                .then(() => console.log('Texto copiado com sucesso!'))
                .catch(error => console.error('Erro ao copiar texto:', error));
        } else {
            if (textoNaEntrada) {
                navigator.clipboard.writeText(textoNaEntrada)
                    .then(() => console.log('Texto copiado com sucesso!'))
                    .catch(error => console.error('Erro ao copiar texto:', error));
            }
        }
    } else {
        navigator.clipboard.writeText('')
            .then(() => console.log('Clipboard limpo.'))
            .catch(error => console.error('Erro ao limpar o clipboard:', error));
    }
}   */
let timeoutId; // Variável para armazenar o ID do timeout
let contadorCliques = 0;
let lastClickTime = 0;
const intervaloDeClique = 1000; // 1 segundo
const tempoContagemRegressiva = 30000; // 30 segundos

// Função para fazer um elemento piscar
function fazerPiscar(elemento) {
    setInterval(() => {
        elemento.style.visibility = (elemento.style.visibility === 'hidden') ? 'visible' : 'hidden';
    }, 500); // Intervalo de 500 milissegundos (0.5 segundos)
}

// Obtém todos os elementos <span> e faz cada um piscar
document.querySelectorAll('span').forEach(span => {
    fazerPiscar(span);
});


function verificaCampos() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    const textoNaSaida = document.getElementById('textoSaida').value;
    const instrucaoNaSaida = document.getElementById('instrucaoNaSaida');
    if (textoNaEntrada.trim() !== 'Digite seu texto' && textoNaSaida !== 'Você deve copiar o texto! Em 30 segundos, esta mensagem se AUTO-DESTRUIRÁ!') {
        // Exibe a instrução na saída
        instrucaoNaSaida.style.display = 'block';


        // Reinicia o temporizador com 30 segundos
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            limparCampoEntrada();
            resetSaida();
        }, 30000);
    }
} 



function limparCampoEntrada() {
    document.getElementById('textoEntrada').value = '';
}
document.getElementById('textoSaida').addEventListener('click', async function () {
    const currentTime = new Date().getTime(); // Obtém o tempo atual
    if (currentTime - lastClickTime < intervaloDeClique) {
        limparCampoEntrada();
        resetSaida();
        // Reinicia o contador
        location.reload();
  // Reinicia o contador
        contadorCliques = 0;

        // Limpa o clipboard
        try {
            await navigator.clipboard.writeText(''); // Copia texto vazio para o clipboard
        } catch (error) {
            console.error('Erro ao limpar o clipboard:', error);
        }
    } else {
        // Se o intervalo for maior ou igual a 1 segundo, reinicie o temporizador
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            limparCampoEntrada();
            resetSaida();
        }, tempoContagemRegressiva);
    }
    lastClickTime = currentTime; // Atualiza o tempo do último clique
});


function resetSaida() {
    document.getElementById('textoSaida').value = '';
    document.getElementById('instrucaoNaSaida').style.display = 'none';
}

/*function colocaImagemSaida(imagemsaida)
if (document.getElementById('textoSaida').value = '')*/



document.getElementById('textoEntrada').addEventListener('click', function () {
    limparCampoEntrada();
    resetMensagemErro();
});
document.addEventListener('DOMContentLoaded', () => {
    resetSaida();
});
function resetMensagemErro() {
    document.getElementById('mensagens__de__erro').textContent = '';
    document.getElementById('mensagens__de__erro').style.visibility = 'hidden';
    document.getElementById('pisca__alerta').style.visibility = 'hidden';
}
function exibirMensagemErro(mensagem) {
    const mensagemDeErro = document.getElementById('mensagens__de__erro');
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.style.visibility = 'visible';
    
    const screenWidth = window.innerWidth;
    if (screenWidth >= 375) { // Defina o limite de largura aqui
        document.getElementById('pisca__alerta').style.visibility = 'visible';
    } else {
        document.getElementById('pisca__alerta').style.visibility = 'hidden';
    }
}


function criptografa() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    if (textoNaEntrada.trim() === '' || textoNaEntrada === 'Digite seu texto, com palavra ou texto contínuo, somente em minúsculas e sem caracteres especiais.') {
        exibirMensagemErro('Você primeiro precisa digitar algo.');
        resetSaida();
    } else if (!/^[a-z]+$/.test(textoNaEntrada)) {
        exibirMensagemErro('Digite letras minúsculas, sem espaços, acentuação ou qualquer outro caractere.');
        resetSaida();
    } else {
        ocultarMensagemErro();
        encripta();
    }
}


function encripta() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    const textoCriptografado = textoNaEntrada.replace(/a/g, 'ai')
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
    document.getElementById('textoSaida').value = textoCriptografado;
    document.getElementById('instrucaoNaSaida').style.display = 'none';

    resetEntrada();
    verificaCampos();
  
}

function descriptografa() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    
    if (textoNaEntrada.trim() === '' || textoNaEntrada === 'Digite seu texto, com palavra ou texto contínuo, somente em minúsculas e sem caracteres especiais.') {
        exibirMensagemErro('Você primeiro precisa digitar algo.');
        resetSaida();
    } else if (!/^[a-z]+$/.test(textoNaEntrada)) {
        exibirMensagemErro('Digite somente letras minúsculas, palavra ou texto contínuo, sem espaços, acentuação ou qualquer outro caractere.');
        resetSaida();
    } else {
        const textoCriptografado = document.getElementById('textoEntrada').value;
        const textoOriginal = textoCriptografado.replace(/enter/g, 'e')
            .replace(/imes/g, 'i')
            .replace(/ai/g, 'a')
            .replace(/ober/g, 'o')
            .replace(/ufat/g, 'u');
        document.getElementById('textoSaida').value = textoOriginal;
        document.getElementById('instrucaoNaSaida').style.display = 'none';
        resetEntrada();
        verificaCampos();
    }
}




function ocultarMensagemErro() {
    document.getElementById('mensagens__de__erro').style.visibility = 'hidden';
    document.getElementById('pisca__alerta').style.visibility = 'hidden';
}
function resetEntrada() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        document.getElementById('textoEntrada').value = '';
    }, 30000);
}
document.getElementById('textoEntrada').addEventListener('click', function () {
    limparCampoEntrada();
    resetMensagemErro();
});
document.addEventListener('DOMContentLoaded', () => {
    resetSaida();
    document.getElementById('pisca__alerta').style.visibility = 'hidden';
    instrucaoCampoEntrada();
});
function copiaParaTransferir() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    if (textoNaEntrada !== 'Digite seu texto, com palavra ou texto contínuo, somente em minúsculas e sem caracteres especiais.') {
        const textoNaSaida = document.getElementById('textoSaida').value;
        if (textoNaSaida) {
            navigator.clipboard.writeText(textoNaSaida)
                .then(() => console.log('Texto copiado com sucesso!'))
                .catch(error => console.error('Erro ao copiar texto:', error));
        } else {
            if (textoNaEntrada) {
                navigator.clipboard.writeText(textoNaEntrada)
                    .then(() => console.log('Texto copiado com sucesso!'))
                    .catch(error => console.error('Erro ao copiar texto:', error));
            }
        }
    } else {
        navigator.clipboard.writeText('')
            .then(() => console.log('Clipboard limpo.'))
            .catch(error => console.error('Erro ao limpar o clipboard:', error));
    }
}   