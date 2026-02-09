const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionText = document.getElementById('question');

let clickCount = 0;
let fontSize = 1.5; 

const messages = [
    "Catch me if you can!!",
    "Really sure?? 🥺",
    "Think about it again!",
    "I'll be very sad...",
    "Okay, now you're just being mean!",
    "Click the big red one instead! ❤️"
];

noBtn.addEventListener('click', () => {
    // IMPORTANT: The button must be absolute to move!
    noBtn.style.position = 'absolute'; 

    clickCount++;

    // 1. Increase the size of the Yes button
    fontSize += 2.5; 
    yesBtn.style.fontSize = `${fontSize}rem`;
    yesBtn.style.padding = `${fontSize / 1.5}rem ${fontSize}rem`;

    // 2. Update text logic (using modulo % ensures it loops if she clicks 100 times)
    if (clickCount <= messages.length) {
        questionText.innerText = messages[clickCount - 1];
    } else {
        questionText.innerText = "Okay, you have no choice now! 😂";
    }

    // 3. Move the No button
    // We use Math.max to ensure the coordinates aren't negative
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    
    // 4. Maximum size cap
    if (fontSize > 15) {
        noBtn.style.display = 'none';
    }
});
