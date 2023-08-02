function gerarimagem(button) {
  var div = button.parentNode;
  var h2Text = div.querySelector("h2.codigo").innerText;

  // Remover as imagens dentro da div
  var imagens = div.querySelectorAll("img");
  for (var i = 0; i < imagens.length; i++) {
    imagens[i].style.display = "none";
  }

  var options = {
    scale: 2,
    useCORS: true,
  };

  html2canvas(div, options).then(function (canvas) {
    // Restaurar a exibição das imagens
    for (var i = 0; i < imagens.length; i++) {
      imagens[i].style.display = "block";
    }

    canvas.toBlob(function (blob) {
      saveAs(blob, h2Text + ".png");
    }, "image/png");

    var aviso = document.createElement("span");
    aviso.innerHTML = "Imagem salva!";
    aviso.classList.add("aviso-popup");

    // Inserir o aviso no corpo do documento
    document.body.appendChild(aviso);

    setTimeout(function () {
      aviso.parentNode.removeChild(aviso);
    }, 3000);
  });
}
