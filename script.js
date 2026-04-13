// scripts.js - Fixed "I'm not a robot" for Cypress tests

// DOM Elements - Fixed selectors for Cypress tests
const messageEl = document.getElementById('h');
const resultEl = document.getElementById('para');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const img3 = document.querySelector('.img3');
const img4 = document.querySelector('.img4');
const img5 = document.querySelector('.img5');
const img6 = document.querySelector('.img6');

// Fixed image sources that work reliably
const imageUrls = [
  'https://picsum.photos/150/150?random=1',
  'https://picsum.photos/150/150?random=2',
  'https://picsum.photos/150/150?random=3',
  'https://picsum.photos/150/150?random=4',
  'https://picsum.photos/150/150?random=5'
];

// Game state
let selectedImages = [];
let shuffledImages = [];

// Initialize game immediately
function initializeGame() {
  // Select random image to duplicate
  const duplicateIndex = Math.floor(Math.random() * 5);
  
  // Create 6 images (5 unique + 1 duplicate)
  shuffledImages = [...imageUrls, imageUrls[duplicateIndex]];
  
  // Shuffle using Fisher-Yates
  for (let i = shuffledImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
  }
  
  // Assign images IMMEDIATELY (for Cypress)
  img1.src = shuffledImages[0];
  img2.src = shuffledImages[1];
  img3.src = shuffledImages[2];
  img4.src = shuffledImages[3];
  img5.src = shuffledImages[4];
  img6.src = shuffledImages[5];
  
  // Reset visual state
  resetVisualState();
  setInitialState();
}

// Reset visual state (remove selected classes)
function resetVisualState() {
  img1.classList.remove('selected');
  img2.classList.remove('selected');
  img3.classList.remove('selected');
  img4.classList.remove('selected');
  img5.classList.remove('selected');
  img6.classList.remove('selected');
}

// Set initial state (State 1)
function setInitialState() {
  messageEl.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resultEl.textContent = "";
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  selectedImages = [];
}

// Handle image clicks
function handleClick(event) {
  const img = event.target;
  if (img.classList.contains('selected')) return;
  
  img.classList.add('selected');
  selectedImages.push(img.src);
  
  if (selectedImages.length === 1) {
    resetBtn.style.display = 'inline-block';
  } else if (selectedImages.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

// Reset handler
resetBtn.onclick = function() {
  selectedImages = [];
  resetVisualState();
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  messageEl.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resultEl.textContent = "";
};

// Verify handler
verifyBtn.onclick = function() {
  const match = selectedImages[0] === selectedImages[1];
  
  if (match) {
    resultEl.textContent = "You are a human. Congratulations!";
    resultEl.style.color = 'green';
  } else {
    resultEl.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    resultEl.style.color = 'red';
  }
  
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
};

// Attach event listeners
img1.onclick = handleClick;
img2.onclick = handleClick;
img3.onclick = handleClick;
img4.onclick = handleClick;
img5.onclick = handleClick;
img6.onclick = handleClick;

// Initialize IMMEDIATELY on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGame);
} else {
  initializeGame();
}