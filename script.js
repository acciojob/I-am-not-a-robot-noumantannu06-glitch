        const baseImages = [
            'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1544966958-d51f63e75d5d?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop'
        ];

        let selectedTiles = [];
        let duplicateImage = null;

        function initRobotVerifier() {
            // Choose random image to duplicate
            const duplicateIndex = Math.floor(Math.random() * 5);
            duplicateImage = baseImages[duplicateIndex];
            
            // Create 6 images array (5 unique + 1 duplicate)
            const images = [...baseImages, duplicateImage];
            
            // Shuffle
            for (let i = images.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [images[i], images[j]] = [images[j], images[i]];
            }
            
            // Clear and populate grid with EXACT classes img1-img6
            const grid = document.getElementById('grid');
            grid.innerHTML = '';
            
            images.forEach((src, index) => {
                const img = document.createElement('img');
                img.src = src;
                img.className = `img${index + 1}`;
                img.dataset.src = src;
                img.onclick = () => handleTileClick(img);
                grid.appendChild(img);
            });
            
            resetGame();
        }

        function handleTileClick(img) {
            if (img.classList.contains('selected') || document.getElementById('para').textContent) {
                return;
            }
            
            img.classList.add('selected');
            selectedTiles.push(img.dataset.src);
            
            document.getElementById('reset').classList.remove('hidden');
            
            if (selectedTiles.length === 2) {
                document.getElementById('verify').classList.remove('hidden');
            }
        }

        function resetGame() {
            selectedTiles = [];
            document.querySelectorAll('.img1, .img2, .img3, .img4, .img5, .img6').forEach(img => {
                img.classList.remove('selected');
            });
            document.getElementById('reset').classList.add('hidden');
            document.getElementById('verify').classList.add('hidden');
            document.getElementById('para').textContent = '';
            document.getElementById('para').className = '';
            document.getElementById('h').textContent = "Please click on the identical tiles to verify that you are not a robot.";
        }

        function verify() {
            document.getElementById('verify').classList.add('hidden');
            const para = document.getElementById('para');
            
            if (selectedTiles[0] === selectedTiles[1]) {
                para.textContent = "You are a human. Congratulations!";
                para.className = 'success';
            } else {
                para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
                para.className = 'error';
            }
            document.getElementById('h').textContent = '';
        }

        // CYPRESS SAFE INIT
        function init() {
            initRobotVerifier();
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
        window.addEventListener('load', init);

        // Button events
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('reset').onclick = resetGame;
            document.getElementById('verify').onclick = verify;
        });
