"use strict";

const gridContainer = document.querySelector(".memory-grid-container");
const data = [
  {
    "image": "../assets/img/minigames/violet.jpg",
    "name": "violet"
  },
  {
    "image": "../assets/img/minigames/flower.jpg",
    "name": "flower"
  },
  {
    "image": "../assets/img/minigames/nasa.jpg",
    "name": "nasa"
  },
  {
    "image": "../assets/img/minigames/block.png",
    "name": "block"
  },
  {
    "image": "../assets/img/minigames/boom.jpg",
    "name": "boom"
  },
  {
    "image": "../assets/img/minigames/crewww.jpg",
    "name": "crewww"
  },
  {
    "image": "../assets/img/minigames/logo.jpg",
    "name": "logo"
  },
  {
    "image": "../assets/img/minigames/launch.jpg",
    "name": "launch"
  },
  {
    "image": "../assets/img/minigames/icecream.jpg",
    "name": "icecream"
  }
];

const cards = [...data, ...data];
shuffleCards();
generateCards();

let firstCard, secondCard;
let lockBoard = false;
let memScore = 0;

document.querySelector(".memory-score").textContent = memScore;

fetch("../assets/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  memScore++;
  document.querySelector(".memory-score").textContent = memScore;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  memScore = 0;
  document.querySelector(".memory-score").textContent = memScore;
  gridContainer.innerHTML = "";
  generateCards();
}
