const board = document.getElementById('puzzle-board');
const piecesContainer = document.getElementById('pieces-container');
const finishBtn = document.getElementById('finish-puzzle');
const message = document.getElementById('puzzle-message');

const rows = 3;
const cols = 3;

function createPuzzle() {
    // Clear everything first
    board.innerHTML = "";
    piecesContainer.innerHTML = "";
    let tiles = [];

    // 1. Create the target Slots on the board
    for (let i = 0; i < rows * cols; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.dataset.index = i;
        
        // Listeners for dropping
        slot.addEventListener('dragover', e => e.preventDefault());
        slot.addEventListener('drop', handleDrop);
        
        board.appendChild(slot);
    }

    // 2. Create the Tiles (the actual image pieces)
    for (let i = 0; i < rows * cols; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.draggable = true;
        tile.dataset.index = i;

        // Math for background slicing
        const x = (i % cols) * 150;
        const y = Math.floor(i / cols) * 100;
        
        tile.style.backgroundImage = "url('us.jpg')";
        tile.style.backgroundPosition = `-${x}px -${y}px`;

        // Mobile-friendly dragstart
        tile.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', i);
        });

        tiles.push(tile);
    }

    // 3. Shuffle tiles and put them in the tray
    const shuffled = tiles.sort(() => Math.random() - 0.5);
    shuffled.forEach(t => piecesContainer.appendChild(t));
}

function handleDrop(e) {
    e.preventDefault();
    const slot = e.target.closest('.slot');
    const tileIndex = e.dataTransfer.getData('text/plain');
    const draggingTile = document.querySelector(`.tile[data-index="${tileIndex}"]`);

    if (slot && slot.children.length === 0) {
        // Only allow drop if it's the CORRECT slot
        if (tileIndex === slot.dataset.index) {
            slot.appendChild(draggingTile);
            draggingTile.draggable = false; // Lock it in
            draggingTile.style.cursor = "default";
            draggingTile.style.boxShadow = "none"; // Make it flat once correct
        } else {
            // SNAP BACK: If wrong slot, it goes back to tray
            piecesContainer.appendChild(draggingTile);
        }
        checkWin();
    }
}

function checkWin() {
    const slots = document.querySelectorAll('.slot');
    let filledCorrectly = 0;

    slots.forEach(slot => {
        if (slot.children.length > 0) {
            const childIndex = slot.children[0].dataset.index;
            if (childIndex === slot.dataset.index) {
                filledCorrectly++;
            }
        }
    });

    if (filledCorrectly === rows * cols) {
        message.innerText = "Perfect! Every piece fits. ❤️";
        confetti();
        finishBtn.style.display = "block";
    }
}

// Initial call
createPuzzle();
