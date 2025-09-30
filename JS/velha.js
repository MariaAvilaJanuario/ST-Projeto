const tabuleiro = document.getElementById('tabuleiro');
const celulas = document.querySelectorAll('[data-celula]');
const status = document.getElementById('status');
const botaoReiniciar = document.getElementById('reiniciar');

let jogadorAtual = 'X';
let jogoAtivo = true;

const combinacoesVencedoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function lidarComCliqueCelula(e) {
    const celula = e.target;
    const indiceCelula = Array.from(celulas).indexOf(celula);

    if (celula.textContent !== '' || !jogoAtivo) return;

    celula.textContent = jogadorAtual;

    if (verificarVitoria()) {
        const comboVencedor = obterComboVencedor();
        destacarCelulasVencedoras(comboVencedor);
        status.textContent = `Jogador ${jogadorAtual} venceu!`;
        jogoAtivo = false;
    } else if (verificarEmpate()) {
        status.textContent = 'Empate!';
        jogoAtivo = false;
    } else {
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
        status.textContent = `Vez do jogador ${jogadorAtual}`;
    }
}

function verificarVitoria() {
    return combinacoesVencedoras.some(combinacao => {
        return combinacao.every(indice => {
            return celulas[indice].textContent === jogadorAtual;
        });
    });
}

function obterComboVencedor() {
    return combinacoesVencedoras.find(combinacao => {
        return combinacao.every(indice => {
            return celulas[indice].textContent === jogadorAtual;
        });
    });
}

function destacarCelulasVencedoras(combo) {
    combo.forEach(indice => {
        celulas[indice].classList.add('vencedor');
    });
}

function verificarEmpate() {
    return Array.from(celulas).every(celula => celula.textContent !== '');
}

function reiniciarJogo() {
    jogadorAtual = 'X';
    jogoAtivo = true;
    celulas.forEach(celula => {
        celula.textContent = '';
        celula.classList.remove('vencedor');
    });
    status.textContent = `Vez do jogador ${jogadorAtual}`;
}

celulas.forEach(celula => celula.addEventListener('click', lidarComCliqueCelula));
botaoReiniciar.addEventListener('click', reiniciarJogo);

status.textContent = `Vez do jogador ${jogadorAtual}`;