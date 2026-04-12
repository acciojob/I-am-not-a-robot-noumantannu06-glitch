// Base tile IDs we care about (Cypress uses .img1, .img2, ...)
const baseKeys = ["img1", "img2", "img3", "img4", "img5"];

// Example image URLs (change if you want different images)
const keyToSrc = {
  img1: "https://placehold.co/300x200/FF5733/FFFFFF?text=Image+1",
  img2: "https://placehold.co/300x200/33C4FF/FFFFFF?text=Image+2",
  img3: "https://placehold.co/300x200/33FF57/FFFFFF?text=Image+3",
  img4: "https://placehold.co/300x200/F3FF33/000000?text=Image+4",
  img5: "https://placehold.co/300x200/9933FF/FFFFFF?text=Image+5"
};

// 1) Pick one key to repeat → 6 tiles total
function createKeyList() {
  const copyIndex = Math.floor(Math.random() * 5); // 0–4
  const list = [...baseKeys];
  list.push(baseKeys[copyIndex]);
  return list;
}

// 2) Shuffle the array (Fisher–Yates)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 3) State variables
let clickedImages = [];   // [{ img, key: img1|img2|... }]
let resetBtn, verifyBtn, resultPara;

// 4) Render six images (one duplicate, shuffled)
function renderImages() {
  const keys = createKeyList();
  const shuffledKeys = shuffle(keys);
  const container = document.getElementById("image-container");
  container.innerHTML = "";

  shuffledKeys.forEach(key => {
    const img = document.createElement("img");
    img.src = keyToSrc[key];
    img.alt = "Tile";
    img.dataset.nsTest = key;      // required by task
    img.classList.add(key);        // so Cypress finds .img1, .img2, ...
    img.addEventListener("click", handleImageClick);
    container.appendChild(img);
  });
}

// 5) Image click handler
function handleImageClick(e) {
  const img = e.target;

  // Do nothing on already‑selected image (no double‑click allowed)
  if (img.classList.contains("selected")) return;

  img.classList.add("selected");
  clickedImages.push({ img, key: img.dataset.nsTest });

  // Show Reset once at least one tile is clicked
  resetBtn.classList.remove("hidden");

  // Verify only shows when exactly two images are clicked
  if (clickedImages.length === 2) {
    verifyBtn.classList.remove("hidden");
  } else if (clickedImages.length > 2) {
    verifyBtn.classList.add("hidden");
  }
}

// 6) Reset button click → State 1
function handleReset() {
  clickedImages.forEach(({ img }) => img.classList.remove("selected"));
  clickedImages = [];

  resetBtn.classList.add("hidden");
  verifyBtn.classList.add("hidden");
  resultPara.textContent = "";
}

// 7) Verify button click → State 4
function handleVerify() {
  const [a, b] = clickedImages;
  const isIdentical = a.key === b.key;

  verifyBtn.classList.add("hidden");

  resultPara.textContent = isIdentical
    ? "You are a human. Congratulations!"
    : "We can't verify you as a human. You selected the non-identical tiles.";
}

// 8) Initialize on page load
function init() {
  renderImages();

  resetBtn = document.getElementById("reset");
  verifyBtn = document.getElementById("verify");
  resultPara = document.getElementById("para");

  resetBtn.classList.add("hidden");
  verifyBtn.classList.add("hidden");

  resetBtn.addEventListener("click", handleReset);
  verifyBtn.addEventListener("click", handleVerify");
}

window.addEventListener("load", init);