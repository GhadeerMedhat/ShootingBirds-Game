const startButton = document.getElementById('start-button');
const startContainer = document.getElementById('start-container');
const gameContainer = document.getElementById('game-container');
const loginForm = document.getElementById('login-form');
const nameInput = document.getElementById('name-input');
const levelSelect = document.getElementById('level-select');
const greeting = document.getElementById('greeting');
const message = document.getElementById('message');
const startGameButton = document.getElementById('start-game');
const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score-value');
const birdsLeftElement = document.getElementById('birds-left-value');
const messageBox = document.getElementById('message-box');
const playAgainButton = document.getElementById('play-again');
const backButton = document.getElementById('back');
const shootingImage = document.getElementById('shooting-image');


gameArea.style.display = 'none';
scoreElement.style.display = 'none';
birdsLeftElement.style.display = 'none';

let score = 0;
let birdsLeft = 10; 
let birdSpeed = 10; 

const birdImages = [
    "images/gold.gif",
    "images/normal.gif",
    "images/normal2.gif",
    "images/normal3.gif",
    "images/normal4.gif",
    "images/normal5.gif",
    "images/normal6.gif",
    "images/normal7.gif"
];

// Function to create a bird
function createBird() {
    const bird = document.createElement('img');
    // Randomly select a bird image from the array
    const randomIndex = Math.floor(Math.random() * birdImages.length);
    bird.src = birdImages[randomIndex];
    bird.classList.add('bird');
    bird.style.top = `${Math.random() * (window.innerHeight - 120)}px`; 
    bird.style.left = `${window.innerWidth}px`; 
    bird.onclick = function() {
        this.remove();
        score++;
        scoreElement.textContent = score;
        birdsLeft--;
        birdsLeftElement.textContent = birdsLeft;
        if (birdsLeft === 0) {
            showMessage();
        }
    };
    gameArea.appendChild(bird);


    document.body.classList.add('birds-appeared');
}

// Function to move the birds across the screen
function moveBirds() {
    const birds = document.querySelectorAll('.bird');
    birds.forEach(bird => {
        const currentLeft = parseFloat(bird.style.left);
        const newLeft = currentLeft - birdSpeed; 
        if (newLeft < -bird.width) {
            
            bird.style.left = `${window.innerWidth}px`;
        } else {
            bird.style.left = `${newLeft}px`;
        }
    });
}

function showMessage() {
    messageBox.classList.remove('hidden');
}

function hideMessage() {
    messageBox.classList.add('hidden');
}

playAgainButton.addEventListener('click', function() {
    hideMessage();
    const birds = document.querySelectorAll('.bird');
    birds.forEach(bird => bird.remove());
    
    score = 0;
    scoreElement.textContent = score;
    birdsLeft = levelSelect.value === 'easy' ? 10 : 25; 
    birdsLeftElement.textContent = birdsLeft;
    birdSpeed = levelSelect.value === 'easy' ? 10 : 15; 
    for (let i = 0; i < birdsLeft; i++) {
        setTimeout(createBird, i * 1000); 
    }
});

// position of the shooting image to follow the mouse cursor
document.addEventListener('mousemove', function(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    shootingImage.style.left = `${mouseX - shootingImage.width }px`;
    shootingImage.style.top = `${mouseY - shootingImage.height}px`;
});

// Event listener for start button
startButton.addEventListener('click', () => {
    startContainer.style.display = 'none';
    gameContainer.style.display = 'block';
});

// Event listener for form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const level = levelSelect.value;

    if (!name || !level) {
        alert('Please enter your name and choose a level.');
        return;
    }

    // Display greeting and start game button
    greeting.textContent = `Hello, ${name}!`;
    greeting.style.display = 'block';
    message.style.display = 'block';
    startGameButton.style.display = 'block';
    loginForm.style.display = 'none'; // Hide the form
});

// Event listener for start game button
startGameButton.addEventListener('click', () => {
    startGame();
    gameArea.style.display = 'block';
    scoreElement.style.display = 'block';
    birdsLeftElement.style.display = 'block';

    greeting.style.display = 'none';
    message.style.display = 'none';
    startGameButton.style.display = 'none';
});

function startGame() {
   
    console.log('Game started!');
    birdsLeft = levelSelect.value === 'easy' ? 10 : 25; 
    birdsLeftElement.textContent = birdsLeft;
    birdSpeed = levelSelect.value === 'easy' ? 10 : 15; // 
    for (let i = 0; i < birdsLeft; i++) {
        setTimeout(createBird, i * 1000);
    }
  
    setInterval(moveBirds, 20); 
    
    // Update the chosen level next to the score
    const chosenLevel = levelSelect.options[levelSelect.selectedIndex].text;
    document.getElementById('level-value').textContent = chosenLevel;
}
// music  when the game starts
const backgroundAudio = document.getElementById('background-audio');
backgroundAudio.play();
