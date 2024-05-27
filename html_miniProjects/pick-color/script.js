let selectedColors = [];

document
  .getElementById("imageInput")
  .addEventListener("change", handleImageUpload);

function handleImageUpload(event) {
  selectedColors = [];
  updateColorDisplay();

  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const image = document.getElementById("image");
      image.src = e.target.result;
      image.onload = function () {
        addColorPicker();
      };
    };
    reader.readAsDataURL(file);
  }
}

function addColorPicker() {
  const imageContainer = document.getElementById("imageContainer");
  const colorPicker = document.getElementById("colorPicker");
  const image = document.getElementById("image");

  imageContainer.addEventListener("mousemove", handleMouseMove);
  imageContainer.addEventListener("click", handleColorPick);

  function handleMouseMove(event) {
    const rect = image.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixelData = imageData.data;

    const rgb = `RGB: ${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}`;
    const hex = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
    const textColor = getTextColorForBackground(
      pixelData[0],
      pixelData[1],
      pixelData[2]
    );

    colorPicker.style.top = `${y - 500}px`;
    colorPicker.style.left = `${x}px`;
    colorPicker.style.backgroundColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

    // Update color info
    document.getElementById("rgbValue").innerText = rgb;
    document.getElementById("hexValue").innerText = `Hex: ${hex}`;
  }

  function handleColorPick(event) {
    const rect = image.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixelData = imageData.data;

    const rgb = `RGB: ${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}`;
    const hex = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
    const textColor = getTextColorForBackground(
      pixelData[0],
      pixelData[1],
      pixelData[2]
    );

    // Save color to history
    selectedColors.push({ rgb, hex, textColor });

    // Update color history display
    updateColorDisplay();
  }
}

function rgbToHex(r, g, b) {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

function getTextColorForBackground(r, g, b) {
  // Calculate the relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Choose white or black based on luminance
  return luminance > 0.5 ? "#000" : "#fff";
}

function updateColorDisplay() {
  const colorHistoryList = document.getElementById("colorHistoryList");
  colorHistoryList.innerHTML = "";

  for (const color of selectedColors) {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("colorDisplay");
    colorDiv.style.backgroundColor = color.hex;
    colorDiv.style.color = color.textColor;
    colorDiv.innerText = `${color.rgb} - ${color.hex}`;
    colorHistoryList.appendChild(colorDiv);
  }
}
