const board = document.getElementById('puzzle-board');
const finishBtn = document.getElementById('finish-puzzle');
const message = document.getElementById('puzzle-message');
const size = 3; // 3x3 grid
let tiles = [];
let correctOrder = [];

// Create the puzzle pieces
function createPuzzle() {
    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.draggable = true;
        tile.dataset.index = i;
        
        // Calculate background position for each slice of 'us.png'
        const x = (i % size) * 100;
        const y = Math.floor(i / size) * 100;
        tile.style.backgroundImage = "url('us.png')"; 
        tile.style.backgroundPosition = `-${x}px -${y}px`;
        
        tiles.push(tile);
        correctOrder.push(i);
    }

    // Shuffle tiles
    tiles.sort(() => Math.random() - 0.5);
    tiles.forEach(tile => board.appendChild(tile));
}

// Drag and Drop Logic
let draggedTile = null;

board.addEventListener('dragstart', (e) => {
    draggedTile = e.target;
});

board.addEventListener('dragover', (e) => {
    e.preventDefault();
});

board.addEventListener('drop', (e) => {
    const droppedTile = e.target;
    if (droppedTile.classList.contains('tile') && droppedTile !== draggedTile) {
        // Swap tiles in the DOM
        const draggedIndex = [...board.children].indexOf(draggedTile);
        const droppedIndex = [...board.children].indexOf(droppedTile);
        
        if (draggedIndex > droppedIndex) {
            board.insertBefore(draggedTile, droppedTile);
            board.insertBefore(droppedTile, board.children[draggedIndex + 1]);
        } else {
            board.insertBefore(droppedTile, draggedTile);
            board.insertBefore(draggedTile, board.children[droppedIndex + 1]);
        }
        checkWin();
    }
});

function checkWin() {
    const currentOrder = [...board.children].map(t => parseInt(t.dataset.index));
    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
        message.innerText = "Perfect! Just like us.";
        confetti(); // Blast confetti
        finishBtn.style.display = "block";
        tiles.forEach(t => t.draggable = false);
    }
}

createPuzzle();
