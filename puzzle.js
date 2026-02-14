const board = document.getElementById('puzzle-board');
const piecesContainer = document.getElementById('pieces-container');
const finishBtn = document.getElementById('finish-puzzle');
const message = document.getElementById('puzzle-message');

const rows = 3;
const cols = 3;
let tiles = [];

function createPuzzle() {
    board.innerHTML = "";
    piecesContainer.innerHTML = "";

    // 1. Create the Slots
    for (let i = 0; i < rows * cols; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.dataset.index = i;
        slot.addEventListener('dragover', e => e.preventDefault());
        slot.addEventListener('drop', handleDrop);
        board.appendChild(slot);
    }

    // 2. Create the Tiles
    for (let i = 0; i < rows * cols; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.draggable = true;
        tile.dataset.index = i;

        const x = (i % cols) * 150;
        const y = Math.floor(i / cols) * 100;
        
        tile.style.backgroundImage = "url('us.jpg')";
        tile.style.backgroundPosition = `-${x}px -${y}px`;

        tile.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', i);
        });

        tiles.push(tile);
    }

    // 3. Shuffle and put in TRAY
    tiles.sort(() => Math.random() - 0.5);
    tiles.forEach(tile => piecesContainer.appendChild(tile));
}

function handleDrop(e) {
    e.preventDefault();
    const slot = e.target.closest('.slot');
    const tileIndex = e.dataTransfer.getData('text/plain');
    const draggingTile = document.querySelector(`.tile[data-index="${tileIndex}"]`);

    if (slot && slot.children.length === 0) {
        // SNAP-BACK LOGIC: Check if it's the right slot
        if (tileIndex === slot.dataset.index) {
            slot.appendChild(draggingTile);
            draggingTile.draggable = false; // Lock it in
            draggingTile.style.cursor = "default";
        } else {
            // Wrong slot? Back to the tray!
            piecesContainer.appendChild(draggingTile);
            // Flash a quick message or effect here if you want
        }
        checkWin();
    }
}

function checkWin() {
    const slots = document.querySelectorAll('.slot');
    let filledCorrectly = 0;

    slots.forEach(slot => {
        if (slot.children.length > 0) {
            if (slot.children[0].dataset.index === slot.dataset.index) {
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

createPuzzle();
