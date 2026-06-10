/* =============================================
   CALCULADORA.JS — lógica de cálculo do desperdício
   =============================================
   Fontes dos dados:
   - Pegada hídrica: Mekonnen & Hoekstra (2011), Water Footprint Network
   - Preços: IBGE / CEASA médias 2024
   - Porção/pessoa: FAO, Tabela TACO (UNICAMP)
   ============================================= */

/**
 * Base de dados dos alimentos.
 * precoPorKg      → R$ médio no varejo (2024)
 * aguaPorKg       → litros de água por kg (pegada hídrica total)
 * caloriaPorKg    → kcal por kg do alimento
 * porcaoCalDiaria → kcal diária por pessoa (FAO: 2000 kcal/dia)
 * descricao       → texto exibido no card de detalhe
 */
const ALIMENTOS = {
  arroz: {
    nome: "Arroz",
    emoji: "🌾",
    precoPorKg: 6.50,
    aguaPorKg: 2497,
    caloriaPorKg: 3600,
    descricao: "1 kg de arroz = 2.497 L de água (pegada hídrica, WFN 2011)"
  },
  pao: {
    nome: "Pão / Trigo",
    emoji: "🍞",
    precoPorKg: 12.00,
    aguaPorKg: 1608,
    caloriaPorKg: 2650,
    descricao: "1 kg de trigo = 1.608 L de água (Mekonnen & Hoekstra)"
  },
  carne: {
    nome: "Carne bovina",
    emoji: "🥩",
    precoPorKg: 45.00,
    aguaPorKg: 15415,
    caloriaPorKg: 2500,
    descricao: "1 kg de carne = 15.415 L de água — o alimento mais custoso hídrico"
  },
  frango: {
    nome: "Frango",
    emoji: "🍗",
    precoPorKg: 15.00,
    aguaPorKg: 4325,
    caloriaPorKg: 2390,
    descricao: "1 kg de frango = 4.325 L de água (pegada hídrica, WFN)"
  },
  legumes: {
    nome: "Legumes e Verduras",
    emoji: "🥕",
    precoPorKg: 5.00,
    aguaPorKg: 322,
    caloriaPorKg: 250,
    descricao: "1 kg de legumes = ~322 L de água (média hortaliças, FAO)"
  },
  frutas: {
    nome: "Frutas",
    emoji: "🍎",
    precoPorKg: 6.00,
    aguaPorKg: 962,
    caloriaPorKg: 500,
    descricao: "1 kg de frutas = ~962 L de água (média frutas, WFN)"
  },
  leite: {
    nome: "Laticínios",
    emoji: "🥛",
    precoPorKg: 9.00,
    aguaPorKg: 1020,
    caloriaPorKg: 610,
    descricao: "1 kg de laticínio = ~1.020 L de água (leite/queijo, WFN)"
  },
  feijao: {
    nome: "Feijão / Leguminosas",
    emoji: "🫘",
    precoPorKg: 10.00,
    aguaPorKg: 4055,
    caloriaPorKg: 3300,
    descricao: "1 kg de feijão = 4.055 L de água (Mekonnen & Hoekstra)"
  },
  ovos: {
    nome: "Ovos",
    emoji: "🥚",
    precoPorKg: 14.00,
    aguaPorKg: 3300,
    caloriaPorKg: 1550,
    descricao: "1 kg de ovos = 3.300 L de água (WFN) ≈ 17 ovos"
  },
  massas: {
    nome: "Massas e Pão",
    emoji: "🍝",
    precoPorKg: 8.00,
    aguaPorKg: 1849,
    caloriaPorKg: 3700,
    descricao: "1 kg de massa = ~1.849 L de água (base trigo + processo)"
  }
};

// kcal que 1 pessoa precisa por mês (2000 kcal/dia × 30 dias)
const KCAL_PESSOA_MES = 2000 * 30;

/**
 * Determina o nível de impacto (baixo / medio / alto)
 * com base no valor em R$ desperdiçado.
 */
function calcularNivel(valorReais) {
  if (valorReais <= 20)  return "baixo";
  if (valorReais <= 80)  return "medio";
  return "alto";
}

/**
 * Função principal chamada pelo botão "Calcular impacto".
 */
function calcular() {
  // ── 1. Ler e validar inputs ──────────────────────────
  const tipoSelecionado = document.getElementById("tipo-alimento").value;
  const quantidadeStr   = document.getElementById("quantidade-kg").value;
  const erroEl          = document.getElementById("erro-msg");

  erroEl.textContent = "";

  if (!tipoSelecionado) {
    erroEl.textContent = "⚠️ Por favor, selecione um tipo de alimento.";
    document.getElementById("tipo-alimento").focus();
    return;
  }

  const quantidade = parseFloat(quantidadeStr);
  if (!quantidadeStr || isNaN(quantidade) || quantidade <= 0) {
    erroEl.textContent = "⚠️ Informe uma quantidade válida (ex: 2,5 kg).";
    document.getElementById("quantidade-kg").focus();
    return;
  }

  // ── 2. Calcular ──────────────────────────────────────
  const alimento = ALIMENTOS[tipoSelecionado];

  const dinheiroPerdido = quantidade * alimento.precoPorKg;
  const aguaPerdida     = quantidade * alimento.aguaPorKg;
  const caloriasTotal   = quantidade * alimento.caloriaPorKg;
  const pessoasAlimentadas = caloriasTotal / KCAL_PESSOA_MES;

  const nivel = calcularNivel(dinheiroPerdido);

  // ── 3. Exibir resultados ─────────────────────────────
  // Esconder vazio, mostrar cards
  document.getElementById("resultado-vazio").style.display = "none";
  const cardsEl = document.getElementById("resultado-cards");
  cardsEl.hidden = false;

  // Header
  document.getElementById("res-alimento-label").textContent =
    `${alimento.emoji} ${alimento.nome}`;
  document.getElementById("res-quantidade-label").textContent =
    `${formatarNumero(quantidade, 1)} kg/mês`;

  // Card dinheiro
  const cardDinheiro = document.getElementById("card-dinheiro");
  cardDinheiro.className = `res-card ${nivel}`;
  document.getElementById("res-dinheiro").textContent =
    `R$ ${formatarMoeda(dinheiroPerdido)}`;
  document.getElementById("res-dinheiro-detalhe").textContent =
    `R$ ${alimento.precoPorKg.toFixed(2)}/kg · ${formatarNumero(quantidade, 1)} kg desperdiçados`;

  // Card água
  const cardAgua = document.getElementById("card-agua");
  cardAgua.className = `res-card ${nivel}`;
  const aguaFormatada = aguaPerdida >= 1000
    ? `${formatarNumero(aguaPerdida / 1000, 1)} mil L`
    : `${formatarNumero(aguaPerdida, 0)} L`;
  document.getElementById("res-agua").textContent = aguaFormatada;
  document.getElementById("res-agua-detalhe").textContent = alimento.descricao;

  // Card pessoas
  const cardPessoas = document.getElementById("card-pessoas");
  cardPessoas.className = `res-card ${nivel}`;
  const pessoasArred = Math.max(0.1, pessoasAlimentadas);
  document.getElementById("res-pessoas").textContent =
    pessoasArred >= 1
      ? `${formatarNumero(pessoasArred, 1)} pessoa${pessoasArred >= 2 ? "s" : ""}`
      : `${(pessoasArred * 30).toFixed(0)} dias de alimentação`;
  document.getElementById("res-pessoas-detalhe").textContent =
    `Baseado em 2.000 kcal/dia por pessoa (padrão FAO)`;

  // Barra de impacto
  const barraEl  = document.getElementById("impacto-barra");
  const textoEl  = document.getElementById("impacto-texto");
  const maxBarra = 200; // R$ 200 = 100%
  const pct      = Math.min((dinheiroPerdido / maxBarra) * 100, 100);

  // Reset da animação (força re-trigger)
  barraEl.style.width = "0%";
  barraEl.className   = "impacto-barra-fill";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      barraEl.style.width = `${pct}%`;
      barraEl.classList.add(nivel);
    });
  });

  const textos = {
    baixo: "🟢 Baixo — bom trabalho, mas ainda dá para melhorar!",
    medio: "🟡 Médio — você está desperdiçando mais do que deveria.",
    alto:  "🔴 Alto — impacto significativo. Reveja seus hábitos."
  };
  textoEl.textContent = textos[nivel];

  // Scroll suave para os resultados em mobile
  if (window.innerWidth <= 900) {
    document.getElementById("resultado").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ── Utilitários de formatação ────────────────────────
function formatarNumero(n, casas) {
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function formatarMoeda(n) {
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Permite calcular também com Enter no campo de quantidade
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("quantidade-kg").addEventListener("keydown", (e) => {
    if (e.key === "Enter") calcular();
  });
});