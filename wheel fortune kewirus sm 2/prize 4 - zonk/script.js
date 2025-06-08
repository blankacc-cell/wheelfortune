(function() {
  const wheel = document.querySelector('.wheel');
  const startButton = document.querySelector('.button');

  let deg = 0;

  startButton.addEventListener('click', () => {
    startButton.style.pointerEvents = 'none';
    deg = Math.floor(5000 + Math.random() * 5000);
    wheel.style.transition = 'all 11s ease-out';
    wheel.style.transform = `rotate(${deg}deg)`;
    wheel.classList.add('blur');
  });

  wheel.addEventListener('transitionend', () => {
    wheel.classList.remove('blur');
    startButton.style.pointerEvents = 'auto';
    wheel.style.transition = 'none';
    const actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;
  });

  // 🔒 1. Spin hanya bisa dilakukan sekali
let hasSpun = false;

// 🎯 2. Tentukan hasil spin spesifik berdasarkan stok (index sektor)
const predeterminedResults = [1]; // ganti dengan sektor hasil sesuai urutan
let spinCount = 1;

// 🎁 3. Mapping sektor ke gambar hadiah
const rewardImages = [
  "prize zonk.png",
  "prize zonk.png",
];

// ⏺ Tambahkan event listener ke tombol spin
document.querySelector(".button").addEventListener("click", function () {
  if (hasSpun) return; // cegah spin ulang

  hasSpun = true;

  const wheel = document.querySelector(".wheel");

  // total sektor di wheel
  const sectorCount = 12;
  const degreePerSector = 360 / sectorCount;

  // hasil spin ditentukan dari array predetermined
  const targetSector = predeterminedResults[spinCount % predeterminedResults.length];
  spinCount++;

  // hitung derajat putaran (plus beberapa putaran penuh untuk efek spin)
  const fullSpins = 5;
  const stopAngle = 360 * fullSpins + (360 - targetSector * degreePerSector) - degreePerSector / 2;

  // animasi spin
  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${stopAngle}deg)`;

  // popup setelah spin selesai
  setTimeout(() => {
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.padding = "20px";
    popup.style.background = "#fff";
    popup.style.border = "2px solid #000";
    popup.style.zIndex = 1000;

    const img = document.createElement("img");
    img.src = rewardImages[targetSector];
    img.style.maxWidth = "200px";
    popup.appendChild(img);

    const close = document.createElement("button");
    close.textContent = "Tutup";
    close.onclick = () => popup.remove();
    popup.appendChild(document.createElement("br"));
    popup.appendChild(close);

    document.body.appendChild(popup);
  }, 4000); // muncul setelah animasi selesai
});

})();
