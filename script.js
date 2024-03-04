let timeoutId;

function instrucaoCampoEntrada() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    const instruction = document.getElementById('instrucaoEntrada');
    if (textoNaEntrada === '') {
        instruction.style.display = 'block';
    } else {
        instruction.style.display = 'none';
    }
}

function exibirMensagemErro(mensagem) {
    const mensagemDeErro = document.getElementById('mensagens__de__erro');
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.style.visibility = 'visible'; // Exibe a mensagem de erro
}

function ocultarMensagemErro() {
    document.getElementById('mensagens__de__erro').style.visibility = 'hidden'; // Oculta a mensagem de erro
}

function resetMensagemErro() {
    // Reseta as mensagens de erro para que não sejam exibidas
    document.getElementById('mensagens__de__erro').textContent = '';
    document.getElementById('mensagens__de__erro').style.visibility = 'hidden';
}


function criptografa() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    const mensagemDeErro = document.getElementById('mensagens__de__erro');

    if (textoNaEntrada.trim() === '') {
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
    setTimeout(() => {
        const intervalId = setInterval(() => {
            const blinkingElement = document.getElementById('textoEntrada');
            blinkingElement.style.visibility = (blinkingElement.style.visibility === 'hidden' ? '' : 'hidden');
        }, 500);
        setTimeout(() => {
            clearInterval(intervalId);
            document.getElementById('textoEntrada').style.visibility = '';
        }, 30000);
    }, 30000);
}

function descriptografa() {
    const encryptedText = document.getElementById('textoSaida').value;
    const decryptedText = encryptedText
        .replace(/ufat/g, 'u')
        .replace(/ober/g, 'o')
        .replace(/imes/g, 'i')
        .replace(/enter/g, 'e')
        .replace(/ai/g, 'a');

    document.getElementById('textoEntrada').value = decryptedText;
    resetSaida();
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
    }, 60000);
}

function resetSaida() {
    document.getElementById('textoSaida').value = '';
    document.getElementById('instrucaoNaSaida').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    resetSaida();

    // Adiciona um manipulador de evento para o evento focus na área de texto
    document.getElementById('textoEntrada').addEventListener('focus', function () {
        // Ao focar na área de texto, limpa seu conteúdo e remove a instrução
        this.value = '';
        document.getElementById('instrucaoEntrada').style.display = 'none';

        // Reseta as mensagens de erro quando a área de texto é focada
        resetMensagemErro();
    });

    // Adiciona um manipulador de evento para o evento click na área de texto
    document.getElementById('textoEntrada').addEventListener('click', function () {
        // Reseta as mensagens de erro quando a área de texto é clicada
        resetMensagemErro();
    });

    // Chama a função instrucaoCampoEntrada no evento DOMContentLoaded
    instrucaoCampoEntrada();
});
