const board = document.getElementById('puzzle-board');
const finishBtn = document.getElementById('finish-puzzle');
const message = document.getElementById('puzzle-message');
const size = 3; // 3x3 grid
let tiles = [];
const correctOrder = [];

// Create the puzzle pieces
function createPuzzle() {
    board.innerHTML = ""; // Clear board before starting
    tiles = [];

    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.draggable = true;
        tile.dataset.index = i;
        
        // Calculate background position for each slice of 'us.png'
        // Assumes a 300x300 image (100px per tile)
        const x = (i % size) * 100;
        const y = Math.floor(i / size) * 100;
        tile.style.backgroundImage = "url('us.png')"; 
        tile.style.backgroundPosition = `-${x}px -${y}px`;
        
        tiles.push(tile);
        correctOrder.push(i);
    }

    // Shuffle tiles using a reliable shuffle algorithm
    const shuffledTiles = [...tiles].sort(() => Math.random() - 0.5);
    shuffledTiles.forEach(tile => board.appendChild(tile));
}

// Drag and Drop Logic
let draggedTile = null;

board.addEventListener('dragstart', (e) => {
    draggedTile = e.target;
    e.dataTransfer.setData('text/plain', ''); // Required for Firefox
});

board.addEventListener('dragover', (e) => {
    e.preventDefault(); // Necessary to allow a drop
});

board.addEventListener('drop', (e) => {
    e.preventDefault();
    const droppedTile = e.target.closest('.tile');
    
    if (droppedTile && droppedTile !== draggedTile) {
        const allTiles = [...board.children];
        const draggedIndex = allTiles.indexOf(draggedTile);
        const droppedIndex = allTiles.indexOf(droppedTile);

        // Visual Swap Logic
        if (draggedIndex < droppedIndex) {
            droppedTile.after(draggedTile);
            board.insertBefore(droppedTile, allTiles[draggedIndex]);
        } else {
            droppedTile.before(draggedTile);
            board.insertBefore(draggedTile, allTiles[droppedIndex]);
        }
        
        checkWin();
    }
});

function checkWin() {
    const currentOrder = [...board.children].map(t => parseInt(t.dataset.index));
    
    // Check if current order matches the original 0-8 sequence
    if (currentOrder.every((val, index) => val === index)) {
        message.innerHTML = "Perfect! Just like us. ❤️";
        
        // Trigger Confetti (Ensure the library script is in your HTML)
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        // Show the button to go to success.html
        finishBtn.style.display = "block";
        
        // Disable dragging once won
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(t => t.draggable = false);
    }
}

// Start the game
createPuzzle();
