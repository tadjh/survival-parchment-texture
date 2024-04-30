const urlParams = new URLSearchParams(window.location.search);

const font = urlParams.get("font") || "Permanent Marker";
const text = urlParams.get("text") || "Hello World";
const fontColor = urlParams.get("font_color") || "252937";
const fontSize = Number(urlParams.get("font_size") || 60);
const width = Number(urlParams.get("width") || 512);
const height = Number(urlParams.get("height") || 512);
const offsetY = Number(urlParams.get("offset_y") || 256);
const offsetX = Number(urlParams.get("offset_x") || 256);
const anchor = urlParams.get("anchor") || "mm";
const noBg = Boolean(urlParams.get("no_bg") || false);

const canvas = document.createElement("canvas");
canvas.style.width = width + "px";
canvas.style.height = height + "px";

window.devicePixelRatio = 2;

const retinaWidth = width * window.devicePixelRatio;
const retinaHeight = height * window.devicePixelRatio;
const retinaFontSize = fontSize * window.devicePixelRatio;

canvas.setAttribute("width", retinaWidth);
canvas.setAttribute("height", retinaHeight);

document.body.appendChild(canvas);

window.addEventListener("load", draw);

function draw() {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    if (!noBg) {
      const img = new Image();
      img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0, retinaWidth, retinaHeight);
      });
      img.src = "./img/parchment_sign_1_bg.png";
    }
    const textDisplay = decodeURIComponent(text);

    function drawText(retinaFontSize, recursions = 0) {
      if (recursions > 3) ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = retinaFontSize + "px " + decodeURIComponent(font);
      ctx.fillStyle = "#" + fontColor;
      let textAlign = "";
      let textBaseline = "";

      switch (anchor[0]) {
        case "r":
          textAlign = "end";
          break;
        case "l":
          textAlign = "start";
          break;
        case "m":
        default:
          textAlign = "center";
          break;
      }

      switch (anchor[1]) {
        case "a":
          textBaseline = "top";
          break;
        case "t":
          textBaseline = "hanging";
          break;
        case "b":
          textBaseline = "ideographic";
          break;
        case "d":
          textBaseline = "bottom";
          break;
        case "s":
          textBaseline = "alphabetic";
          break;
        case "m":
        default:
          textBaseline = "middle";
          break;
      }

      ctx.textBaseline = textBaseline;
      ctx.textAlign = textAlign;

      const { width: textWidth } = ctx.measureText(textDisplay);

      const ratio = (retinaWidth * 0.9) / textWidth;

      if (ratio < 1) {
        console.log(ratio);
        return drawText(retinaFontSize * ratio, recursions + 1);
      }

      return ctx.fillText(
        textDisplay,
        offsetX * window.devicePixelRatio,
        offsetY * window.devicePixelRatio
      );
    }

    WebFontConfig = {
      google: {
        families: [font],
      },
      active: () => drawText(retinaFontSize),
    };

    return (function (d) {
      var wf = d.createElement("script"),
        s = d.scripts[0];
      wf.src =
        "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
      wf.async = true;
      s.parentNode.insertBefore(wf, s);
    })(document);
  }
}
