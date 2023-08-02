function search() {
  var inputText = document.getElementById("searchInput").value.toLowerCase();
  // Separa os termos de pesquisa por vírgula e remove espaços desnecessários
  var searchTerms = inputText.split(",").map((term) => term.trim());

  var cartelas = document.getElementsByClassName("cartela");

  for (var i = 0; i < cartelas.length; i++) {
    var cartela = cartelas[i];
    var cor = cartela
      .getElementsByClassName("linha")[0]
      .innerText.toLowerCase();
    var descricao = cartela
      .getElementsByClassName("linha")[1]
      .innerText.toLowerCase();
    var codigo = cartela.getElementsByTagName("h2")[0].innerText.toLowerCase();

    // Verifica se pelo menos um dos termos de pesquisa está presente na cartela
    var correspondeFiltroColecao = searchTerms.some((term) => {
      return (
        cor.includes(term) || descricao.includes(term) || codigo.includes(term)
      );
    });

    // Aplica "flex" ou "none" à propriedade display conforme a condição
    cartela.style.display = correspondeFiltroColecao ? "flex" : "none";
  }
}
