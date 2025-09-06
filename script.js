
const canvas = document.getElementById('overlayCanvas');
const ctx = canvas.getContext('2d');

let overlayImage = new Image();
let overlayBackup = null;

const uploadInput = document.getElementById('uploadOverlay');

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    overlayImage.src = e.target.result;
    overlayImage.onload = () => {
      // Draw overlay on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(overlayImage, 0, 0, 512, 512);

      // Save backup
      overlayBackup = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  }
  reader.readAsDataURL(file);
});

// Remove Overlay
document.getElementById('removeOverlay').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Restore Overlay
document.getElementById('restoreOverlay').addEventListener('click', () => {
  if (overlayBackup) {
    ctx.putImageData(overlayBackup, 0, 0);
  }
});


