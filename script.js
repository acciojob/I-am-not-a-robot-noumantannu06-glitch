//your code here
// Images: use 5 unique + 1 duplicate (any image repeated once)
const imagePaths = [
  "https://placehold.co/300x200/FF5733/FFFFFF?text=Image+1",
  "https://placehold.co/300x200/33C4FF/FFFFFF?text=Image+2",
  "https://placehold.co/300x200/33FF57/FFFFFF?text=Image+3",
  "https://placehold.co/300x200/F3FF33/000000?text=Image+4",
  "https://placehold.co/300x200/9933FF/FFFFFF?text=Image+5"
];

// 1) Pick one image to repeat (index 0–4) and create 6‑item array
function createImageList() {
  const copyIndex = Math.floor(Math.random() * 5); // 0–4
  const list = [...imagePaths];
  list.push(imagePaths[copyIndex]); // one duplicate
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
let clickedImages = [];   // [{ imgElem, dataNsTest }]
let resetBtn, verifyBtn, hMsg, resultPara;

function renderImages() {
  const imageList = createImageList();
  const shuffledList = shuffle(imageList);
  const container = document.getElementById("image-container");
  container.innerHTML = ""; // clear old images

  // Generate 6 img elements with data-ns-test
  shuffledList.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Tile";
    img.dataset.nsTest = src; // this is how we identify “same tile”
    img.addEventListener("click", handleImageClick);
    container.appendChild(img);
  });
}

// 4) Click handler for images
function handleImageClick(e) {
  const img = e.target;

  // Ignore if already clicked or same image twice
  if (img.classList.contains("selected")) return;

  // Mark as selected
  img.classList.add("selected");
  clickedImages.push({ img, dataNsTest: img.dataset.nsTest });

  // Show Reset button once at least one tile is clicked
  resetBtn.classList.remove("hidden");

  // Show Verify button only after exactly two distinct images
  if (clickedImages.length === 2) {
    verifyBtn.classList.remove("hidden");
  } else if (clickedImages.length > 2) {
    verifyBtn.classList.add("hidden");
  }
}

// 5) Reset button click
function handleReset() {
  // Unselect images
  clickedImages.forEach(({ img }) => img.classList.remove("selected"));
  clickedImages = [];

  // Reset UI
  resetBtn.classList.add("hidden");
  verifyBtn.classList.add("hidden");
  resultPara.textContent = "";
}

// 6) Verify button click
function handleVerify() {
  const [a, b] = clickedImages;

  // Must be two different images
  const isIdentical = a.dataNsTest === b.dataNsTest;

  verifyBtn.classList.add("hidden");
  resultPara.textContent = isIdentical
    ? "You are a human. Congratulations!"
    : "We can't verify you as a human. You selected the non-identical tiles.";
}

// 7) Initialize everything
function init() {
  renderImages();

  resetBtn = document.getElementById("reset");
  verifyBtn = document.getElementById("verify");
  hMsg = document.getElementById("h");
  resultPara = document.getElementById("para");

  resetBtn.classList.add("hidden");
  verifyBtn.classList.add("hidden");

  resetBtn.addEventListener("click", handleReset);
  verifyBtn.addEventListener("click", handleVerify);
}

window.addEventListener("load", init);
