"use strict";

const spaceship = document.getElementById('spaceship');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const message = document.getElementById('message');
const levelMessage = document.createElement('div');
levelMessage.id = 'level-message';
gameContainer.appendChild(levelMessage);
const moon = document.createElement('div');
moon.id = 'moon';
moon.innerHTML = '<img src="../assets/img/minigames/moon.png" alt="Moon" />';
gameContainer.appendChild(moon);

let spaceshipLeft = 200.0;
let spaceshipBottom = 10;
let gameInterval;
let iceCreamCount = 0;
let score = 0;
let level = 1;
let asteroidSpeed = 10;
let iceCreamSpeed = 5;
let asteroidCreationProbability = 0.05; // Probability for creating asteroids
let iceCreamCreationProbability = 0.01; // Probability for creating ice creams

// Function to move the spaceship
function moveSpaceship(event) {
    if (event.key === 'ArrowLeft' && spaceshipLeft > 25) {
        spaceshipLeft -= 15;
    } else if (event.key === 'ArrowRight' && spaceshipLeft < 370) {
        spaceshipLeft += 15;
    } else if (event.key === 'ArrowUp' && spaceshipBottom < 310) {
        spaceshipBottom += 15;
    } else if (event.key === 'ArrowDown' && spaceshipBottom > 15) {
        spaceshipBottom -= 15;
    }

    spaceship.style.left = spaceshipLeft + 'px';
    spaceship.style.bottom = spaceshipBottom + 'px';
}

// Function to create asteroids
function createAsteroid() {
    const asteroid = document.createElement('div');
    asteroid.classList.add('asteroid');
    const randomLeftPosition = Math.floor(Math.random() * 370);
    asteroid.style.left = randomLeftPosition + 'px';
    asteroid.style.top = '-30px';
    gameContainer.appendChild(asteroid);
}

// Function to move asteroids
function moveAsteroids() {
    const asteroids = document.querySelectorAll('.asteroid');
    const spaceshipRect = spaceship.getBoundingClientRect();

    asteroids.forEach(asteroid => {
        let asteroidTop = parseInt(window.getComputedStyle(asteroid).getPropertyValue('top'));
        asteroidTop += asteroidSpeed;
        asteroid.style.top = asteroidTop + 'px';

        const asteroidRect = asteroid.getBoundingClientRect();

        // Check if asteroid collides with the spaceship
        if (
            asteroidRect.bottom >= spaceshipRect.top+0.00001 &&
            asteroidRect.top <= spaceshipRect.bottom+0.00001 &&
            asteroidRect.left <= spaceshipRect.right+0.00001 &&
            asteroidRect.right >= spaceshipRect.left+0.00001
        ) {
            clearInterval(gameInterval);
            alert('Game Over! The asteroid hit your spaceship!');
            location.reload();
        }

        // Check if asteroid is out of bounds
        if (asteroidTop >= 400) {
            asteroid.remove();
        }
    });
}

// Function to create ice creams
function createIceCream() {
    const iceCream = document.createElement('div');
    iceCream.classList.add('ice-cream');
    const randomLeftPosition = Math.floor(Math.random() * 370);
    iceCream.style.left = randomLeftPosition + 'px';
    iceCream.style.top = '-30px';
    gameContainer.appendChild(iceCream);
}

// Function to move ice creams
function moveIceCreams() {
    const iceCreams = document.querySelectorAll('.ice-cream');
    const spaceshipRect = spaceship.getBoundingClientRect();

    iceCreams.forEach(iceCream => {
        let iceCreamTop = parseInt(window.getComputedStyle(iceCream).getPropertyValue('top'));
        iceCreamTop += iceCreamSpeed;
        iceCream.style.top = iceCreamTop + 'px';

        const iceCreamRect = iceCream.getBoundingClientRect();

        // Check collision with spaceship
        if (
            iceCreamRect.bottom >= spaceshipRect.top &&
            iceCreamRect.top <= spaceshipRect.bottom &&
            iceCreamRect.left <= spaceshipRect.right &&
            iceCreamRect.right >= spaceshipRect.left
        ) {
            iceCream.remove();
            iceCreamCount++;
            score += 10;
            scoreDisplay.textContent = score;
            if (iceCreamCount === 3) {
                if (level === 3) {
                    clearInterval(gameInterval);
                    celebrateVictory();
                } else {
                    iceCreamCount = 0;
                    level++;
                    levelDisplay.textContent = level;
                    adjustDifficulty();
                    showLevelMessage();
                }
            }
        }

        // Check if ice cream is out of bounds
        if (iceCreamTop >= 400) {
            iceCream.remove();
        }
    });
}

// Function to adjust game difficulty based on the level
function adjustDifficulty() {
    if (level === 2) {
        asteroidSpeed += 3; // Slight increase for level 2
        iceCreamSpeed += 1; // Slight increase for level 2
    } else if (level === 3) {
        asteroidSpeed += 3; // Slight increase for level 3
        iceCreamSpeed += 1; // Slight increase for level 3
    }
}

// Function to celebrate victory
function celebrateVictory() {
    spaceship.style.display = 'none';
    message.textContent = "Congratulations! You reached the moon!";
    message.style.display = 'block';
    moon.style.display = 'block';
}

// Function to show level transition message
function showLevelMessage() {
    levelMessage.textContent = `LEVEL ${level}`;
    levelMessage.style.display = 'block';
    setTimeout(() => {
        levelMessage.style.display = 'none';
    }, 2000);
}

// Start the game loop
function startGame() {
    createAsteroid();
    createIceCream();

    gameInterval = setInterval(() => {
        moveAsteroids();
        moveIceCreams();

        // Randomly create new asteroids and ice creams
        if (Math.random() < asteroidCreationProbability) {
            createAsteroid();
        }
        if (Math.random() < iceCreamCreationProbability) {
            createIceCream();
        }
    }, 50);
}

// Event listener for moving the spaceship
document.addEventListener('keydown', moveSpaceship);

// Initialize game
startGame();
showLevelMessage();
