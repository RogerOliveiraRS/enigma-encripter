let timeoutId;

function instrucaoCampoEntrada() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    console.log('textoEntrada:', textoNaEntrada); // Exibe o texto no console
    const instruction = document.getElementById('instrucaoEntrada');
   /* if (inputText === '') {
        instruction.style.display = 'block';
    } else {
        instruction.style.display = 'none';
    }*/
}



function criptografa() {
    const textoNaEntrada = document.getElementById('textoEntrada').value;
    const mensagemDeErro = document.getElementById('mensagemDeErro');
    const textoNaSaida = document.getElementById('textoSaida');

    if (textoNaEntrada.trim() === '') {
        // Campo vazio, exibe mensagem de erro
        mensagemDeErro.textContent = 'Digite uma palavra ou texto em letras minúsculas, sem acentuação ou espaços.';
        textoNaSaida.value = ''; // Limpa o campo de saída
        mensagemDeErro.style.display = 'block'; // Exibe a mensagem de erro
        resetSaida(); // Limpa a saída
    } else if (!/^[a-z]+$/.test(textoNaEntrada)) {
        // Texto com caracteres não permitidos, exibe mensagem de erro
        mensagemDeErro.textContent = 'Somente letras minúsculas, palavra ou texto contínuo, sem espaços, acentuação ou qualquer outro caractere.';
        textoNaSaida.value = ''; // Limpa o campo de saída
        mensagemDeErro.style.display = 'block'; // Exibe a mensagem de erro
        resetSaida(); // Limpa a saída
    } else {
        // Realiza a criptografia
        mensagemDeErro.style.display = 'none'; // Esconde a mensagem de erro se houver
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
   // document.getElementById('imagemNaSaida').style.display = 'none';
    document.getElementById('instrucaoNaSaida').style.display = 'none';
    document.getElementById('botaoCriptografar').style.backgroundColor = '#E5E5E5';
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
   //document.getElementById('imagemNaSaida').style.display = 'block';
    document.getElementById('instrucaoNaSaida').style.display = 'block';
}



document.addEventListener('DOMContentLoaded', () => {
    resetSaida();
});



