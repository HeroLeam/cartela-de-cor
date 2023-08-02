const codigoElements = document.querySelectorAll(".codigo");

codigoElements.forEach((codigoElement) => {
  const container = codigoElement.closest(".cartela");
  const backgroundColor = getComputedStyle(container).backgroundColor;
  const luminance = calculateLuminance(backgroundColor);

  if (luminance > 0.35) {
    codigoElement.style.color = "black";
  } else {
    codigoElement.style.color = "white";
  }
});

function calculateLuminance(color) {
  const rgb = color.match(/\d+/g);
  const [r, g, b] = rgb.map((val) => val / 255);

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance;
}
