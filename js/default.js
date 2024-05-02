const urlParams = new URLSearchParams(window.location.search);

const font = urlParams.get("font") || "Permanent Marker";
const text = urlParams.get("text") || "Hello World";
const fontColor = urlParams.get("font_color") || "252937";
const fontSize = Number(urlParams.get("font_size") || 60);
const width = urlParams.get("width") || "512";
const height = urlParams.get("height") || "512";
const offsetX = urlParams.get("offset_x") || "256";
const offsetY = urlParams.get("offset_y") || "256";
const anchor = urlParams.get("anchor") || "mm";

window.addEventListener("load", draw);

function draw() {
  const root = document.createElement("div");
  const node = document.createElement("div");

  document.body.appendChild(root);
  root.style.width = width + "px";
  root.style.height = height + "px";
  root.style.backgroundImage = "url(img/parchment_sign_1_bg.png)";
  root.style.position = "relative";

  node.style.fontFamily = decodeURIComponent(font);
  const textNode = document.createTextNode(decodeURIComponent(text));
  node.appendChild(textNode);
  node.style.color = "#" + fontColor;
  node.style.fontSize = fontSize + "px";
  node.style.position = "relative";
  node.style.width = "max-content";
  node.style.lineHeight = "1";
  node.style.opacity = "0";

  root.appendChild(node);

  node.style.left = offsetX + "px";
  node.style.top = offsetY + "px";

  function anchorText(recursions = 0) {
    if (recursions > 3) return;
    const { width: textWidth, height: textHeight } =
      node.getBoundingClientRect();

    const ratio = (width * 0.78) / textWidth;

    if (ratio < 1) {
      node.style.fontSize = fontSize * ratio + "px";
      return anchorText(recursions + 1);
    }

    let translateX = "0px";
    let translateY = "0px";

    switch (anchor[0]) {
      case "m":
        translateX = `-${textWidth / 2}px`;
        break;
      case "r":
        translateX = `-${textWidth}px`;
        break;
      case "l":
      default:
        break;
    }

    switch (anchor[1]) {
      case "m":
        translateY = `-${textHeight / 2}px`;
        break;
      case "a":
      case "t":
      case "s":
      case "b":
      case "d":
      default:
        console.log(
          "Ascender, Top, Baseline, Bottom & Descender vertical anchor point is not implemented."
        );
        break;
    }

    node.style.transform = `translate(${translateX},${translateY})`;
    node.classList.add("fade-in");
    node.style.removeProperty("opacity");
  }

  WebFontConfig = {
    google: {
      families: [font],
    },
    active: anchorText,
  };

  return (function (d) {
    var wf = d.createElement("script"),
      s = d.scripts[0];
    wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
  })(document);
}
