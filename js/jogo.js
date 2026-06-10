const listaLixos = [
    // Papel
    { nome: "Caixa de papelão", img: "imgs/Caixa de papelão.png", tipo: "papel" },
    { nome: "Papel", img: "imgs/Papel.png", tipo: "papel" },
    { nome: "Jornal", img: "imgs/Jornal.png", tipo: "papel" },
    
    // Plástico
    { nome: "Garrafa de plástico", img: "imgs/Garrafa de plástico.png", tipo: "plastico" },
    { nome: "Garrafa plástico", img: "imgs/Garrafa plástico.png", tipo: "plastico" },
    { nome: "Pote de plástico", img: "imgs/Pote de plástico.png", tipo: "plastico" },
    { nome: "Saco de salgadinho", img: "imgs/Saco de salgadinho.png", tipo: "plastico" },
    
    // Vidro
    { nome: "Garrafa de vidro", img: "imgs/Garrafa de vidro.png", tipo: "vidro" },
    { nome: "Garrafa de cerveja", img: "imgs/Garrafa de cerveja.png", tipo: "vidro" },
    { nome: "Pote de vidro", img: "imgs/Pote de vidro.png", tipo: "vidro" },
    
    // Metal
    { nome: "Lata de refrigerante", img: "imgs/Lata de refrigerante.png", tipo: "metal" },
    { nome: "Lata de conserva", img: "imgs/Lata de conserva.png", tipo: "metal" },
    { nome: "Pote de metal", img: "imgs/Pote de metal.png", tipo: "metal" },
    
    // Orgânico
    { nome: "Casca de banana", img: "imgs/Casca de banana.png", tipo: "organico" },
    { nome: "Maçã", img: "imgs/Maçã.png", tipo: "organico" },
    { nome: "Folha de árvore", img: "imgs/Folha de árvore.png", tipo: "organico" },
    
    // Não Reciclável
    { nome: "Guardanapo", img: "imgs/Guardanapo.png", tipo: "nao-reciclavel" },
    { nome: "Isopor", img: "imgs/Isopor.png", tipo: "nao-reciclavel" },
    { nome: "Absorvente", img: "imgs/Absorvente.png", tipo: "nao-reciclavel" },
    
    // Resíduos Perigosos
    { nome: "Veneno", img: "imgs/Veneno.png", tipo: "perigoso" },
    { nome: "Spray", img: "imgs/Spray.png", tipo: "perigoso" },
    { nome: "Lâmpada", img: "imgs/Lâmpada.png", tipo: "perigoso" },
    
    // Pilhas e Baterias
    { nome: "Pilha", img: "imgs/Pilha.png", tipo: "pilhas" },
    { nome: "Pilha palito", img: "imgs/Pilha palito.png", tipo: "pilhas" },
    { nome: "Pilha disco", img: "imgs/Pilha disco.png", tipo: "pilhas" }
];

let pontos = 0;
const containerZonaLixo = document.getElementById('zona-lixo');
const elementoPontos = document.getElementById('pontos');
const elementoMensagem = document.getElementById('mensagem');
const lixeiras = document.querySelectorAll('.lixeira');

function novoLixo() {
    containerZonaLixo.innerHTML = '';
    const lixoSorteado = listaLixos[Math.floor(Math.random() * listaLixos.length)];
    
    const divLixo = document.createElement('div');
    divLixo.className = 'lixo-item';
    divLixo.draggable = true;
    divLixo.setAttribute('data-tipo', lixoSorteado.tipo);
    
    const img = document.createElement('img');
    img.src = lixoSorteado.img;
    img.alt = lixoSorteado.nome;
    
    divLixo.appendChild(img);
    containerZonaLixo.appendChild(divLixo);
    
    elementoMensagem.textContent = `Aonde vai: ${lixoSorteado.nome}?`;
    elementoMensagem.style.color = '#444';
    
    configurarDragAndDrop(divLixo);
}

function configurarDragAndDrop(item) {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.getAttribute('data-tipo'));
        item.style.opacity = '0.5';
    });

    item.addEventListener('dragend', () => {
        item.style.opacity = '1';
    });
}

// NOVA FUNÇÃO: Processa a jogada (serve tanto para o clique quanto para o drag)
function processarJogada(tipoLixeira) {
    const lixoAtual = document.querySelector('.lixo-item');
    if (!lixoAtual) return; // Segurança caso não haja lixo na tela

    const tipoLixo = lixoAtual.getAttribute('data-tipo');

    if (tipoLixo === tipoLixeira) {
        pontos += 10;
        elementoPontos.textContent = pontos;
        elementoMensagem.textContent = "Excelente! Descarte correto. 🎉";
        elementoMensagem.style.color = "green";
        
        if (pontos > 120) {
            setTimeout(mostrarVitoria, 600);
        } else {
            setTimeout(novoLixo, 600);
        }
    } else {
        pontos = Math.max(0, pontos - 5);
        elementoPontos.textContent = pontos;
        elementoMensagem.textContent = "Ih, lixeira errada! Tente novamente. ❌";
        elementoMensagem.style.color = "red";
    }
}

lixeiras.forEach(lixeira => {
    lixeira.addEventListener('dragover', (e) => {
        e.preventDefault();
        lixeira.classList.add('drag-over');
    });

    lixeira.addEventListener('dragleave', () => {
        lixeira.classList.remove('drag-over');
    });

    // Evento DROP (Mantido para Computador)
    lixeira.addEventListener('drop', (e) => {
        e.preventDefault();
        lixeira.classList.remove('drag-over');
        
        const tipoLixeira = lixeira.getAttribute('data-aceita');
        processarJogada(tipoLixeira);
    });

    // EventO CLICK (Adicionado para Celular/Touch)
    lixeira.addEventListener('click', () => {
        const tipoLixeira = lixeira.getAttribute('data-aceita');
        processarJogada(tipoLixeira);
    });
});

function mostrarVitoria() {
    const wrapper = document.getElementById('jogo-wrapper');

    const overlay = document.createElement('div');
    overlay.id = 'vitoria-overlay';
    overlay.innerHTML = `
        <div id="vitoria-card">
            <div id="vitoria-emoji">🏆</div>
            <h2 id="vitoria-titulo">Você ganhou!</h2>
            <p id="vitoria-subtitulo">Parabéns!</p>
            <p id="vitoria-pontos">Você atingiu <strong>${pontos} pontos</strong> reciclando corretamente.</p>
            <p id="vitoria-msg">Você mostrou que sabe descartar o lixo de forma responsável.<br>O planeta agradece! 🌱</p>
            <button id="btn-jogar-novamente" onclick="reiniciarJogo()">Jogar novamente</button>
        </div>
    `;

    wrapper.appendChild(overlay);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => overlay.classList.add('visivel'));
    });
}

function reiniciarJogo() {
    pontos = 0;
    elementoPontos.textContent = pontos;
    const overlay = document.getElementById('vitoria-overlay');
    if (overlay) overlay.remove();
    novoLixo();
}

novoLixo();