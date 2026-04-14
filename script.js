const images = [
            'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1544966958-d51f63e75d5d?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'
        ];

        const grid = document.getElementById('grid');
        const resetBtn = document.getElementById('reset');
        const verifyBtn = document.getElementById('verify');
        const message = document.getElementById('h');
        const resultPara = document.getElementById('para');

        let selectedTiles = [];
        let tileData = [];

        function shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        function generateTiles() {
            // Randomly choose which image to duplicate (0-4)
            const duplicateIndex = Math.floor(Math.random() * 5);
            const duplicateImage = images[duplicateIndex];
            
            // Create 6 images: 5 unique + 1 duplicate
            tileData = [...images];
            tileData.push(duplicateImage);
            
            // Shuffle
            tileData = shuffleArray(tileData);
            
            // Clear grid
            grid.innerHTML = '';
            
            // Create tiles
            tileData.forEach((src, index) => {
                const img = document.createElement('img');
                img.src = src;
                img.className = 'tile';
                img.dataset.index = index;
                img.dataset.imageSrc = src;
                img.onclick = () => selectTile(img);
                grid.appendChild(img);
            });
        }

        function selectTile(tile) {
            if (tile.classList.contains('selected') || resultPara.textContent) return;
            
            tile.classList.add('selected');
            selectedTiles.push(tile.dataset.imageSrc);
            
            // State 2: Show Reset
            resetBtn.classList.remove('hidden');
            
            if (selectedTiles.length === 2) {
                // State 3: Show Verify
                verifyBtn.classList.remove('hidden');
            }
        }

        function resetGame() {
            selectedTiles = [];
            document.querySelectorAll('.tile').forEach(tile => {
                tile.classList.remove('selected');
            });
            resetBtn.classList.add('hidden');
            verifyBtn.classList.add('hidden');
            resultPara.textContent = '';
            resultPara.className = '';
            message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
        }

        function verifySelection() {
            verifyBtn.classList.add('hidden');
            
            if (selectedTiles[0] === selectedTiles[1]) {
                // Success
                resultPara.textContent = "You are a human. Congratulations!";
                resultPara.className = 'success';
                message.textContent = '';
            } else {
                // Failure
                resultPara.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
                resultPara.className = 'error';
                message.textContent = '';
            }
        }

        // Event listeners
        resetBtn.onclick = resetGame;
        verifyBtn.onclick = verifySelection;

        // Initialize
        generateTiles();
        
        // Regenerate on page reload (for testing)
        window.addEventListener('load', generateTiles);