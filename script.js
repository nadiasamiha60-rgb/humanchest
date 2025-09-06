const overlayCanvas = document.getElementById('overlayCanvas');
const ctx = overlayCanvas.getContext('2d');
const uploadInput = document.getElementById('uploadOverlay');
let overlayImage = null;

// Upload PNG overlay
uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // Scale and center
    const scale = Math.min(overlayCanvas.width / img.width, overlayCanvas.height / img.height);
    const x = (overlayCanvas.width - img.width * scale) / 2;
    const y = (overlayCanvas.height - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    overlayImage = { img, x, y, width: img.width * scale, height: img.height * scale };
  };
  img.src = URL.createObjectURL(file);
});

// Remove overlay
document.getElementById('removeOverlay').addEventListener('click', () => {
  ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
});

// Restore overlay
document.getElementById('restoreOverlay').addEventListener('click', () => {
  if (overlayImage) {
    const { img, x, y, width, height } = overlayImage;
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    ctx.drawImage(img, x, y, width, height);
  }
});


