function search() {
  var inputText = document.getElementById("searchInput").value.toLowerCase();
  // Separa os termos de pesquisa por vírgula e remove espaços desnecessários
  var searchTerms = inputText.split(",").map((term) => term.trim());

  var filtroCor = document.getElementById("filtro-cores").value.toLowerCase();
  var filtroColecao = document.getElementById("filtro-colecoes").value;
  var cartelas = document.getElementsByClassName("cartela");

  for (var i = 0; i < cartelas.length; i++) {
    var cartela = cartelas[i];
    var cor = cartela.getElementsByClassName("linha")[0].innerText.toLowerCase();
    var nomeCor = cartela.getElementsByClassName("linha")[1].innerText.toLowerCase();
    var descricao = cartela.getElementsByClassName("linha")[2].innerText.toLowerCase();
    var codigo = cartela.getElementsByTagName("h2")[0].innerText.toLowerCase();

    var correspondeFiltroCor = false;
    var correspondeFiltroColecao = false;

    var corTexto = cor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var nomeCorTexto = nomeCor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var descricaoTexto = descricao.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if ((nomeCorTexto.includes(filtroCor) || corTexto.includes(filtroCor)) && (filtroCor !== "" && filtroCor !== "todas")) {
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

    var filtroAtivoCorresponde = filtroCor === "" || filtroCor === "todas" || corTexto.includes(filtroCor);

    // Verifica se pelo menos um dos termos de pesquisa está presente na cartela
    var correspondeFiltroPesquisa = searchTerms.some((term) => {
      return (
        corTexto.includes(term) || nomeCorTexto.includes(term) || descricao.includes(term) || codigo.includes(term)
      );
    });

    // Aplica "flex" ou "none" à propriedade display conforme as condições
    cartela.style.display = correspondeFiltroColecao && filtroAtivoCorresponde && correspondeFiltroPesquisa ? "flex" : "none";
  }
}
