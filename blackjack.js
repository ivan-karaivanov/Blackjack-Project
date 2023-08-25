let player = {
    playerStatus: "Funds available:",
    chips: 150
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = true;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

playerEl.textContent = player.playerStatus + " $" + player.chips;

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: " + cards.join(", ");
    sumEl.textContent = "Sum: " + sum;

    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        player.chips += 25;
        playerEl.textContent = player.playerStatus + " $" + player.chips; // Update chip count display
    } else {
        message = "You're out of the game!";
        isAlive = false;
        player.chips -= 25;
        playerEl.textContent = player.playerStatus + " $" + player.chips; 
    }

    if (!isAlive && player.chips === 0) {
        message = "Game over!";
        player.chips = 150;
        playerEl.textContent = player.playerStatus + " $" + player.chips; 
    }

    messageEl.textContent = message;
}

function newCard() {
    if (isAlive && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}
