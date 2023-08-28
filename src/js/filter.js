var listaColecoes = [
  {
    colecao: "estamparia",
    codigos: [
      "am009",
      "az014",
      "rs015",
      "rs016",
      "rs017",
      "rs018",
      "cm217",
      "lr001",
      "lr005",
      "mr003",
      "mr004",
      "rs010",
      "rx004",
      "rx005",
      "vd015",
      "vd016",
      "vd383",
      "lr415",
      "am002",
      "am003",
      "az010",
      "az013",
      "az384",
      "cm324",
      "rs012",
      "rs014",
      "rx002",
      "rx256",
      "vd011",
      "vd012",
      "vd013",
      "vd014",
      "vd542",
      "vm001",
      "cm004",
      "pt002",
      "mc402",
      "mc506",
      "cz282",
      "am001",
      "am493",
      "am732",
      "am746",
      "am283",
      "am046",
      "am108",
      "az730",
      "az755",
      "az443",
      "az003",
      "az004",
      "az527",
      "az121",
      "az012",
      "az398",
      "cm003",
      "cm739",
      "cm001",
      "cz100",
      "mc303",
      "mc303",
      "cz364",
      "cz276",
      "lr148",
      "lr401",
      "lr541",
      "lr710",
      "mr002",
      "mr001",
      "mr034",
      "mr431",
      "rs204",
      "rs004",
      "rs008",
      "rs009",
      "rs176",
      "rs186",
      "rs252",
      "rs310",
      "rs368",
      "rs245",
      "rs546",
      "rx160",
      "rx235",
      "vd488",
      "vd170",
      "vd336",
      "vd407",
      "vd538",
      "vd067",
      "vd107",
      "vd207",
      "vd229",
      "vd307",
      "vd445",
      "vm002",
      "am487",
      "am905",
      "lr357",
      "lr505",
      "rs560",
      "rs927",
      "rs929",
      "rs750",
      "vd937",
      "vd749",
      "vd545",
    ],
  },
  {
    colecao: "inverno24",
    codigos: [
      "am002",
      "am003",
      "az010",
      "az013",
      "az384",
      "bc001",
      "cm324",
      "lr001",
      "lr005",
      "mc090",
      "mc402",
      "mc506",
      "mr003",
      "mr004",
      "pt002",
      "rs010",
      "rs012",
      "rs014",
      "rx003",
      "rx256",
      "vd011",
      "vd012",
      "vd013",
      "vd014",
      "vd542",
      "vm001",
      "vm004",
    ],
  },
  {
    colecao: "primavera24",
    codigos: [
      "am003",
      "am009",
      "az010",
      "az012",
      "az013",
      "az014",
      "az384",
      "bc001",
      "cm324",
      "lr001",
      "lr005",
      "lr006",
      "lr415",
      "lr541",
      "mc090",
      "mc402",
      "mc506",
      "pt002",
      "rs012",
      "rs015",
      "rs016",
      "rs017",
      "rs018",
      "rs929",
      "rx004",
      "rx005",
      "vd012",
      "vd013",
      "vd015",
      "vd016",
      "vd383",
      "vd939",
      "vm001",
    ],
  },
];

// Função para atualizar o contador
function atualizarContador() {
  var contador = document.getElementById("contador");
  var cartelas = document.getElementsByClassName("cartela");
  contador.innerText = cartelas.length.toString();
}

// Função para filtrar as cartelas
function filtrar() {
  var filtroCor = document.getElementById("filtro-cores").value.toLowerCase();
  var filtroColecao = document.getElementById("filtro-colecoes").value;
  var cartelas = document.getElementsByClassName("cartela");
  var mensagemErro = document.getElementById("mensagem-erro");
  var contador = document.getElementById("contador");

  var exibeMensagemErro = true;
  var count = 0;

  for (var i = 0; i < cartelas.length; i++) {
    var cartela = cartelas[i];
    var cor = cartela.getElementsByClassName("linha")[0];
    var descricao = cartela.getElementsByClassName("linha")[2];
    var codigo = cartela.getElementsByTagName("h2")[0].innerText;

    var correspondeFiltroCor = false;
    var correspondeFiltroColecao = false;

    var corTexto = cor.innerText.toLowerCase();
    var descricaoTexto = descricao.innerText.toLowerCase();

    if (
      descricaoTexto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(filtroCor) ||
      corTexto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(filtroCor)
    ) {
      correspondeFiltroCor = true;
    }

    if (filtroColecao === "todas") {
      correspondeFiltroColecao = true;
    } else {
      for (var k = 0; k < listaColecoes.length; k++) {
        var colecao = listaColecoes[k];
        if (
          colecao.colecao.toLowerCase() === filtroColecao.toLowerCase() &&
          colecao.codigos.includes(codigo.toLowerCase())
        ) {
          correspondeFiltroColecao = true;
          break;
        }
      }
    }

    if ((correspondeFiltroCor && filtroCor !== "") || filtroCor === "todas") {
      cartela.style.display = correspondeFiltroColecao ? "flex" : "none";
      exibeMensagemErro = false;
      if (correspondeFiltroColecao) {
        count++;
      }
    } else {
      cartela.style.display = "none";
    }
  }

  contador.innerText = count.toString();

  if (exibeMensagemErro || count === 0) {
    mensagemErro.style.display = "block";
  } else {
    mensagemErro.style.display = "none";
  }
}

// Função para limpar os filtros
function limparFiltros() {
  document.getElementById("filtro-cores").value = "todas";
  document.getElementById("filtro-colecoes").value = "todas";
  document.getElementById("searchInput").value = "";
  filtrar();
}

// Evento DOMContentLoaded para chamar a função de atualizar o contador
document.addEventListener("DOMContentLoaded", atualizarContador);
