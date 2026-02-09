const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionText = document.getElementById('question');

let clickCount = 0;
let fontSize = 1.5; // Initial size in rem

// Array of messages to show as she clicks "No"
const messages = [
    "Are you sure? 🤨",
    "Really sure?? 🥺",
    "Think about it again!",
    "I'll be very sad...",
    "Okay, now you're just being mean!",
    "Click the big red one instead! ❤️"
];

noBtn.addEventListener('click', () => {
    clickCount++;

    // 1. Increase the size of the Yes button
    fontSize += 2.5; // Adjust this number to make it grow faster or slower
    yesBtn.style.fontSize = `${fontSize}rem`;
    yesBtn.style.padding = `${fontSize / 1.5}rem ${fontSize}rem`;

    // 2. Change the question text based on the click count
    if (clickCount < messages.length) {
        questionText.innerText = messages[clickCount - 1];
    } else {
        questionText.innerText = "Okay, you have no choice now! 😂";
    }

    // 3. Maximum size cap: If the Yes button gets massive, hide the No button
    if (fontSize > 15) {
        noBtn.style.display = 'none';
    }
});
