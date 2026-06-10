# 🌱 Site ODS 12 — Consumo e Produção Responsáveis
**Projeto acadêmico | Ciências da Computação — UNIP 2026**

---

## 👥 Integrantes

| Nome | Papel |
|------|-------|
| Isabella Ajudarte Mejias | Product Owner |
| Kauanny Vitória Amorim de Souza | Desenvolvedora |
| Matheus Tentoni Nascimento | Scrum Master |
| Othavio Sousa Guimarães | Desenvolvedor |

---

## 📄 Páginas

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Página inicial com hero, ODS explainer, números de impacto, pilares e ferramentas |
| `guia.html` | Guia de consumo sustentável com dicas e informações |
| `mapa.html` | Mapa interativo de pontos de coleta seletiva em Santana de Parnaíba |
| `calculadora.html` | Calculadora de desperdício alimentar (dinheiro, água, pessoas) |
| `jogo.html` | EcoTreino — jogo educativo de separação de resíduos |
| `sobre.html` | Apresentação do projeto e dos integrantes |

---

## 📁 Estrutura de Pastas

```
site-ods-12/
│
├── index.html
├── guia.html
├── mapa.html
├── calculadora.html
├── jogo.html
├── sobre.html
│
├── logo.png                  ← Logo do site (circular, fundo dourado)
│
├── css/
│   ├── global.css            ← Estilos base (NÃO MODIFICAR)
│   ├── index.css             ← Estilos da home
│   ├── guia.css              ← Estilos do guia
│   ├── mapa.css              ← Estilos da página do mapa
│   ├── calculadora.css       ← Estilos da calculadora
│   ├── jogo.css              ← Estilos do jogo
│   └── sobre.css             ← Estilos da página sobre
│
├── js/
│   ├── index.js              ← Script da home
│   ├── mapa.js               ← Inicialização do mapa Leaflet
│   ├── calculadora.js        ← Lógica de cálculo do desperdício
│   ├── jogo.js               ← Lógica do jogo de reciclagem
│   └── sobre.js              ← Animações da página sobre
│
├── imgs/                     ← Imagens dos lixos e lixeiras (jogo)
│   ├── Lixeira de papel.png
│   ├── Lixeira de plástico.png
│   ├── ... (demais lixeiras)
│   ├── Caixa de papelão.png
│   └── ... (demais itens de lixo)
│
└── img/                      ← Fotos dos integrantes (sobre)
    ├── Isabella.png
    ├── Kauanny.png
    ├── Matheus.jpeg
    └── Othavio.png
```

---

## 🛠 Tecnologias

- **HTML5** — Estrutura semântica
- **CSS3** — Variáveis CSS, Grid, Flexbox, animações
- **JavaScript** — Vanilla JS (sem frameworks)
- **Leaflet.js** — Mapa interativo (CDN)
- **Google Fonts** — Playfair Display + Source Sans 3

---

## ⚙️ Como rodar localmente

1. Clone ou baixe o repositório
2. Abra `index.html` diretamente no navegador **ou** use um servidor local:
   ```bash
   # Com Python (recomendado para evitar erros de CORS no mapa)
   python -m http.server 8080
   # Acesse: http://localhost:8080
   ```
3. A pasta `imgs/` com as imagens do jogo e a pasta `img/` com as fotos dos integrantes precisam estar na raiz do site

---

## 📌 Regras de contribuição

- **Não modificar** `css/global.css` sem avisar a todos
- Cada página tem seu próprio CSS em `css/` e JS em `js/`
- Antes de fazer push, testar todas as páginas no navegador
- Comunicar qualquer mudança estrutural no grupo

---

## 🔗 Referências e Fontes

- [ODS 12 — ONU Brasil](https://brasil.un.org/pt-br/sdgs/12)
- [Agenda 2030](https://brasil.un.org/pt-br/91863-agenda-2030-para-o-desenvolvimento-sustentavel)
- [Water Footprint Network](https://waterfootprint.org) — Dados de pegada hídrica
- [IBGE / CEASA](https://www.ibge.gov.br) — Preços dos alimentos
- [Tabela TACO / UNICAMP](https://www.unicamp.br/nepa/taco) — Valores nutricionais
- [IPEA ODS 12](https://www.ipea.gov.br/ods/ods12.html)
