// 1. Inicializa o mapa focado em Santana de Parnaíba
const mapa = L.map('mapa').setView([-23.4443, -46.9189], 13);
 
// 2. Carrega as imagens das ruas do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);
 
// 3. Dados dos Ecopontos
const pontosDeColeta = [
    {
        nome: "Ecoponto Parque Santana",
        coords: [-23.4410, -46.9410],
        materiais: "Entulhos, grandes objetos, metal, plástico, papel e papelão."
    },
    {
        nome: "Ecoponto Campo da Vila",
        coords: [-23.4475, -46.9120],
        materiais: "Entulhos, móveis velhos, eletroeletrônicos e recicláveis em geral."
    },
    {
        nome: "Ecoponto Jaguari",
        coords: [-23.4190, -46.8520],
        materiais: "Recicláveis (plástico, vidro, metal, papel) e óleo de cozinha usado."
    }
];
 
// 4. Coloca os marcadores no mapa
pontosDeColeta.forEach(ponto => {
    const marcador = L.marker(ponto.coords).addTo(mapa);
    const conteudoPopup = `
        <div class="popup-conteudo">
            <h3>${ponto.nome}</h3>
            <p><strong>Materiais aceitos:</strong></p>
            <p>${ponto.materiais}</p>
        </div>
    `;
    marcador.bindPopup(conteudoPopup);
});
 
// 5. Adiciona o botão de Localização (📍) no canto superior direito
const BotaoLocalizar = L.Control.extend({
    options: { position: 'topright' },
    onAdd: function () {
        const botao = L.DomUtil.create('button', 'btn-localizar');
        botao.innerHTML = '📍';
        botao.title = 'Onde eu estou?';
 
        botao.onclick = function () {
            // Pede a localização do computador (geralmente baseada na rede de internet)
            mapa.locate({ setView: true, maxZoom: 15 });
        };
        return botao;
    }
});
 
mapa.addControl(new BotaoLocalizar());
 
// 6. Se o navegador achar a localização
mapa.on('locationfound', function(e) {
    L.marker(e.latlng).addTo(mapa)
        .bindPopup("<b>Você está por aqui!</b>").openPopup();
});
 
// 7. Se der erro ou se você não permitir o acesso à localização
mapa.on('locationerror', function() {
    alert("Não foi possível acessar sua localização. Verifique as permissões de privacidade do seu navegador.");
});