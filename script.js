let timeoutId;
function verificaCampos() {
    const textoNaEntrada = document.getElementById('textoEntrada').value='' 

}

function instrucaoCampoEntrada() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    const instruction = document.getElementById('instrucaoEntrada');
    if (textoNaEntrada === '' || textoNaEntrada === 'Digite seu texto') {
        instruction.style.display = 'block';
    } else {
        instruction.style.display = 'none';
    }
}

function exibirMensagemErro(mensagem) {
    const mensagemDeErro = document.getElementById('mensagens__de__erro');
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.style.visibility = 'visible'; // Exibe a mensagem de erro
    document.getElementById('pisca__alerta').style.visibility = 'visible'; // Exibe a imagem de alerta
}

function ocultarMensagemErro() {
    document.getElementById('mensagens__de__erro').style.visibility = 'hidden'; // Oculta a mensagem de erro
    document.getElementById('pisca__alerta').style.visibility = 'hidden'; // Oculta a imagem de alerta
}

function resetMensagemErro() {
    // Reseta as mensagens de erro para que não sejam exibidas
    document.getElementById('mensagens__de__erro').textContent = '';
    document.getElementById('mensagens__de__erro').style.visibility = 'hidden';
    document.getElementById('pisca__alerta').style.visibility = 'hidden';
}

function criptografa() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;

    if (textoNaEntrada.trim() === '' || textoNaEntrada === 'Digite seu texto') {
        // Campo vazio, exibe mensagem de erro
        exibirMensagemErro('Você primeiro precisa digitar algo.');
        resetSaida(); // Limpa a saída
    } else if (!/^[a-z]+$/.test(textoNaEntrada)) {
        // Texto com caracteres não permitidos, exibe mensagem de erro
        exibirMensagemErro('Digite somente letras minúsculas, palavra ou texto contínuo, sem espaços, acentuação ou qualquer outro caractere.');
        resetSaida(); // Limpa a saída
    } else {
        // Realiza a criptografia
        ocultarMensagemErro(); // Oculta a mensagem de erro se houver
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
    
    // Chamando verificaCampos após encriptar
    verificaCampos();
}


function descriptografa() {
    const textoCriptografado = document.getElementById('textoEntrada').value;
    const textoOriginal = textoCriptografado.replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
    document.getElementById('textoSaida').value = textoOriginal;
    document.getElementById('instrucaoNaSaida').style.display = 'none';
    resetEntrada();
    
    // Chamando verificaCampos após desencriptar
    verificaCampos();
}

function verificaCampos() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    const textoNaSaida = document.getElementById('textoSaida').value;
    const instrucaoNaSaida = document.getElementById('instrucaoNaSaida');

    if (textoNaEntrada.trim() !== 'Digite seu texto' && textoNaSaida !== 'Você deve copiar o texto! Em 30 segundos, esta mensagem se auto-destruirá!') {
        // Exibe a instrução na saída
        instrucaoNaSaida.style.display = 'block';

        // Inicia um temporizador de 30 segundos
        setTimeout(() => {
            limparCampoEntrada();
            resetSaida();
        }, 30000);
    }
}

function resetSaida() {
    document.getElementById('textoSaida').value = '';
    document.getElementById('instrucaoNaSaida').style.display = 'none';
}

function limparCampoEntrada() {
    document.getElementById('textoEntrada').value = '';
}


function copiaParaTransferir() {
    const textoNaSaida = document.getElementById('textoSaida').value;
    if (textoNaSaida) {
        navigator.clipboard.writeText(textoNaSaida);
    } else {
        const textoNaEntrada = document.getElementById('textoEntrada').value;
        if (textoNaEntrada) {
            navigator.clipboard.writeText(textoNaEntrada);
        }
    }
}

function resetEntrada() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        document.getElementById('textoEntrada').value = '';
    }, 30000);
}

function resetSaida() {
    document.getElementById('textoSaida').value = '';
    document.getElementById('instrucaoNaSaida').style.display = 'none'; // Exibe a mensagem de instrução
}

function limparCampoEntrada() {
    document.getElementById('textoEntrada').value = '';
}

document.getElementById('textoEntrada').addEventListener('click', function () {
    // Ao clicar na área de texto, limpa seu conteúdo
    limparCampoEntrada();
    // Reseta as mensagens de erro quando a área de texto é clicada
    resetMensagemErro();
});

document.addEventListener('DOMContentLoaded', () => {
    resetSaida(); 
    document.getElementById('pisca__alerta').style.visibility = 'hidden';
   /* document.getElementById('textoSaida').addEventListener('click', function () {
        // Limpa o conteúdo do campo de saída
        document.getElementById('textoSaida').value = '';
    });*/

    // Chama a função instrucaoCampoEntrada no evento DOMContentLoaded
    /* Quando os campos de Entrada E de saída estiverem com textos 
    E o texto na entrada for diferente de "Digite seu Texto" E o texto na saída 
    for diferente de "Você deve copiar o texto!  Em um 30 segundos, esta mensagem se auto-destruitrá!" ('intrucaoNaSaida'), 
    ENTãO a 'instrucaoNaSaida' é = 'block' E aciona um timer, que conta  30 segundos E DEPOIS  do tempo estabelido, as funções limparCampoEntrada() E   resetSaida são chamadas.
   */
    instrucaoCampoEntrada();
});
 