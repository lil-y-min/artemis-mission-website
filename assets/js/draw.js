"use strict";

window.onload = function () {
  const bgCanvas = document.getElementById("bgCanvas");
  const bgCtx = bgCanvas.getContext("2d");

  const canvas = document.getElementById("drawingArea");
  const ctx = canvas.getContext("2d");

  const colorPicker = document.getElementById("colorPicker");
  const brushSizeInput = document.getElementById("brushSize");
  const toggleEraserButton = document.getElementById("toggleEraser");
  const eraseButton = document.getElementById("eraseButton");

  let drawing = false;
  let isErasing = false;
  let currentColor = colorPicker.value;
  let brushSize = parseInt(brushSizeInput.value);

  // Load moon image onto background canvas
    const moonImage = new Image();
    moonImage.src = '../assets/img/minigames/moon.png';
    console.log("Trying to load:", moonImage.src);

    moonImage.onload = () => {
        console.log("✅ Moon image loaded");
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        bgCtx.drawImage(moonImage, 0, 0, bgCanvas.width, bgCanvas.height);
    };

    moonImage.onerror = () => {
        console.error("❌ Failed to load moon image at:", moonImage.src);
    };


  colorPicker.addEventListener("change", () => {
    currentColor = colorPicker.value;
  });

  brushSizeInput.addEventListener("input", () => {
    brushSize = parseInt(brushSizeInput.value);
  });

  toggleEraserButton.addEventListener("click", () => {
    isErasing = !isErasing;
    toggleEraserButton.textContent = isErasing ? "Draw" : "Erase";
  });

  eraseButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // only clear drawing layer
  });

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    draw(e);
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mouseleave", () => {
    drawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mousemove", draw);

  function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";

    if (isErasing) {
      ctx.globalCompositeOperation = "destination-out"; // erase
    } else {
      ctx.globalCompositeOperation = "source-over"; // draw
      ctx.strokeStyle = currentColor;
    }

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }
  // Whenever the Draw tab becomes visible, redraw the moon
    const drawTab = document.getElementById("draw-tab");
    const observer = new MutationObserver(() => {
    if (!drawTab.hasAttribute("hidden")) {
        bgCtx.drawImage(moonImage, 0, 0, bgCanvas.width, bgCanvas.height);
    }
    });
    observer.observe(drawTab, { attributes: true, attributeFilter: ["hidden"] });

};
