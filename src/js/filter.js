var listaColecoes = [
  {
    colecao: "Quentes",
    codigos: [
      "vm001",
      "lr001",
      "am001"
    ],
  },
  {
    colecao: "Frias",
    codigos: [
      "vm001",
      "tr001",
      "ci001",
      "az001",
      "rx001",
      "rs001"
    ],
  },
];

function atualizarContador() {
  var contador = document.getElementById("contador");
  var cartelas = document.getElementsByClassName("cartela");
  contador.innerText = cartelas.length.toString();
}

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

function limparFiltros() {
  document.getElementById("filtro-cores").value = "todas";
  document.getElementById("filtro-colecoes").value = "todas";
  document.getElementById("searchInput").value = "";
  filtrar();
}

document.addEventListener("DOMContentLoaded", atualizarContador);
