// scripts.js - "I'm not a robot" Verification System

// Get DOM elements
const h3 = document.getElementById('h');
const para = document.getElementById('para');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const images = document.querySelectorAll('.grid img');

// Image sources (5 unique + 1 duplicate will be created)
const imageSources = [
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=150', 
  'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150',
  'https://images.unsplash.com/photo-1544194152-7adf22b5c1a5?w=150',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
];

// Game state
let clickedImages = [];
let duplicateIndex = -1; // Which image is duplicated

// Initialize game
function initGame() {
  // Reset state
  clickedImages = [];
  duplicateIndex = Math.floor(Math.random() * imageSources.length);
  
  // Create 6 images: 5 unique + 1 duplicate
  const shuffledImages = [...imageSources];
  shuffledImages.push(imageSources[duplicateIndex]); // Add duplicate
  
  // Shuffle array
  for (let i = shuffledImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
  }
  
  // Set image sources
  images.forEach((img, index) => {
    img.src = shuffledImages[index];
    img.classList.remove('selected');
    img.onclick = handleImageClick;
  });
  
  // Reset UI to initial state
  setState1();
}

// State 1: Initial state (no clicks)
function setState1() {
  h3.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  para.textContent = "";
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
}

// State 2: 1+ clicks (show Reset)
function setState2() {
  resetBtn.style.display = 'inline-block';
  verifyBtn.style.display = 'none';
}

// State 3: Exactly 2 clicks (show Verify)
function setState3() {
  resetBtn.style.display = 'inline-block';
  verifyBtn.style.display = 'inline-block';
}

// Handle image click
function handleImageClick(e) {
  const img = e.target;
  
  // Prevent clicking same image twice
  if (img.classList.contains('selected')) return;
  
  // Add to clicked images
  img.classList.add('selected');
  clickedImages.push(img.src);
  
  // Update state
  if (clickedImages.length === 1) {
    setState2();
  } else if (clickedImages.length === 2) {
    setState3();
  }
}

// Reset button handler
resetBtn.onclick = function() {
  clickedImages = [];
  images.forEach(img => img.classList.remove('selected'));
  setState1();
};

// Verify button handler
verifyBtn.onclick = function() {
  const areIdentical = clickedImages[0] === clickedImages[1];
  
  if (areIdentical) {
    para.textContent = "You are a human. Congratulations!";
    para.style.color = 'green';
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    para.style.color = 'red';
  }
  
  // Hide buttons, reset clicked state
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  clickedImages = [];
};

// Initialize on page load
initGame();

// Re-initialize on page reload/refresh detection (bonus)
window.addEventListener('load', initGame);
window.addEventListener('pageshow', initGame);