let listaDeNumerosSortados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);

let tentativas = 1;

function exibirTextoNaTela(tag, texto)
{
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

exibirMensagemInicial();

function verificarChute()
{
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto)
    {
        exibirTextoNaTela('h1', 'Acertou!');

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';

        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else
    {
        tentativas++;

        if (chute > numeroSecreto)
        {
            exibirTextoNaTela('p', 'O número secreto é menor');
        }
        else
        {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        
    }
    limparCampo();

}

function gerarNumeroAleatorio()
{
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSortados.length;

    if (quantidadeDeElementosNaLista == numeroLimite)
    {
        listaDeNumerosSortados = [];
    }

    if ( listaDeNumerosSortados.includes(numeroEscolhido) )
    {
        return gerarNumeroAleatorio();
    }
    else
    {
        listaDeNumerosSortados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}

function limparCampo()
{
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo()
{
    numeroSecreto = parseInt(Math.random() * 10 + 1);
    limparCampo();
    tentativas = 1;

    exibirMensagemInicial();

    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function exibirMensagemInicial()
{
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 a 10');
}