let currentDice = Math.round(Math.random() * (6 - 1) + 1);
let currentDiceGuess = Math.round(Math.random() * (6 - 1) + 1);
const dice = document.querySelectorAll('.dice-img img');
const diceGuess = document.querySelectorAll('.dice-guess-img img');
const totalImages = dice.length;
const totalImagesGuess = diceGuess.length;
let intervalId;
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
let pointSystem = document.querySelector('.point').innerText = points;
let highScore = document.querySelector('.highscore').innerText = points;
const upgradeBackgroundYellow = 150;
const upgradeBackgroundGreen = 200;
const upgradeBackgroundMulti = 250;
const upgradeDiceGold = 350;
const upgradeDiceBlue = 300;
let ownMulti = false;
let ownGreen = false;
let ownGold = false;
let ownDiceGold = false;
let ownDiceBlue = false;
const ownDiceWhite = true;
const ownRed = true;
let startGame = false;
let gameStarted = false;
let gameStartedLower = false;
let gameStartedHigher = false;
const diceOne = document.querySelector('.dice-one');
const diceTwo = document.querySelector('.dice-two');
const diceThree = document.querySelector('.dice-three');
const diceFour = document.querySelector('.dice-four');
const diceFive = document.querySelector('.dice-five');
const diceSix = document.querySelector('.dice-six');
const diceOneGuess = document.querySelector('.dice-one-Guess');
const diceTwoGuess = document.querySelector('.dice-two-Guess');
const diceThreeGuess = document.querySelector('.dice-three-Guess');
const diceFourGuess = document.querySelector('.dice-four-Guess');
const diceFiveGuess = document.querySelector('.dice-five-Guess');
const diceSixGuess = document.querySelector('.dice-six-Guess');


function upgradeBackground(color) {
    if (color === 'yellow' && points >= upgradeBackgroundYellow) {
        if (ownGold === true) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/yellow.png")';
        } else {
            points = points - upgradeBackgroundYellow;
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/yellow.png")';
            ownGold = true;
            document.querySelector(".buy-background-yellow").innerText = "Gold backround | owned"
        }
    } else if (color === 'green' && points >= upgradeBackgroundGreen) {
        if (ownGreen === true) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/green.png")';
        } else {
            points = points - upgradeBackgroundGreen;
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/green.png")';
            ownGreen = true;
            document.querySelector(".buy-background-green").innerText = "Green backround | owned"
        }
    } else if (color === 'multi' && points >= upgradeBackgroundMulti) {
        if (ownMulti === true) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/multi.png")';
        } else {
            points = points - upgradeBackgroundMulti;
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/multi.png")';
            ownMulti = true;
            document.querySelector(".buy-background-multi").innerText = "multicolored backround | owned"
        }
    } else if (ownRed === true && color === 'red') {
        document.body.style.backgroundImage = 'url("../img/red.png")';
    } else {
        alert('Not enough points!!');
        document.body.style.backgroundImage = 'url("../img/red.png")';
    }
}

function buyDice(color) {

    if (color === 'gold' && points >= upgradeDiceGold) {
        if (ownDiceGold === true) {
            alert('You already own this!!');
            updateDiceGold();
        } else {
            points = points - upgradeDiceGold;
            updatePoints();
            updateDiceGold();
            ownDiceGold = true;
            document.querySelector(".buy-dice-gold").innerText = "Gold dice | owned"
        }
    } else if (color === 'blue' && points >= upgradeDiceBlue) {
        if (ownDiceBlue === true) {
            alert('You aready own this!!');
            updateDiceBlue();
        } else {
            points = points - upgradeDiceBlue;
            updateDiceBlue();
            updatePoints();
            ownDiceBlue = true;
            document.querySelector(".buy-dice-blue").innerText = "Blue dice | owned"
        }
    } else {
        alert('Not enough points!!');
        updateDiceBlue();
    }
}

function updateDiceBlue() {
    diceOne.src = "img/1-blue.png";
    diceTwo.src = "img/2-blue.png";
    diceThree.src = "img/3-blue.png";
    diceFour.src = "img/4-blue.png";
    diceFive.src = "img/5-blue.png";
    diceSix.src = "img/6-blue.png";
    diceOneGuess.src = "img/1-blue.png";
    diceTwoGuess.src = "img/2-blue.png";
    diceThreeGuess.src = "img/3-blue.png";
    diceFourGuess.src = "img/4-blue.png";
    diceFiveGuess.src = "img/5-blue.png";
    diceSixGuess.src = "img/6-blue.png";
}

function updateDiceGold() {
    diceOne.src = "img/1-gold.png";
    diceTwo.src = "img/2-gold.png";
    diceThree.src = "img/3-gold.png";
    diceFour.src = "img/4-gold.png";
    diceFive.src = "img/5-gold.png";
    diceSix.src = "img/6-gold.png";
    diceOneGuess.src = "img/1-gold.png";
    diceTwoGuess.src = "img/2-gold.png";
    diceThreeGuess.src = "img/3-gold.png";
    diceFourGuess.src = "img/4-gold.png";
    diceFiveGuess.src = "img/5-gold.png";
    diceSixGuess.src = "img/6-gold.png";
}

function cycleDice() {
    let randomDice = Math.round(Math.random() * (6 - 1) + 1);
    dice[currentDice].classList.remove('active');
    currentDice = (randomDice) % totalImages;
    dice[currentDice].classList.add('active');
}

function updatePoints() {
    pointSystem = document.querySelector('.point').innerText = points;
    localStorage.setItem('points', points);
}

function highScorePoints() {
    highScore = document.querySelector('.highscore').innerText = points;
    localStorage.setItem('highscore', points);
}

function startCycling() {
    if (gameStarted === false) {
        gameStarted = true;
        intervalId = setInterval(cycleDice, 100);
        setTimeout(function () {
            clearInterval(intervalId);
            startGame = true;
            gameStarted = false;
        }, 4000);
    } else {
        console.log('game already started!')
    }
}

function startLower() {
    if (gameStartedHigher === true) {
        console.log('You already started geussing higher!!');
    } else {
        if (gameStartedLower === false) {
            gameStartedLower = true;
            if (startGame === false) {
                alert('Start game first!');
            } else {
                intervalId = setInterval(cycleLower, 100);
                setTimeout(function () {
                    clearInterval(intervalId);
                    guessLower();
                    updatePoints();
                    startGame = false;
                    gameStartedLower = false;
                }, 4000);
            }
        } else {
            console.log('You already started guessing!!')
        }
    }
}

function cycleLower() {
   let randomDice = Math.round(Math.random() * (6 - 1) + 1);
    diceGuess[currentDiceGuess].classList.remove('active-guess');
    currentDiceGuess = (randomDice) % totalImagesGuess;
    diceGuess[currentDiceGuess].classList.add('active-guess');
    console.log(randomDice)
}


function guessLower() {
    if (currentDiceGuess < currentDice) {
        console.log('You win!');
        points = points + 10;
    } else if (currentDiceGuess === currentDice) {
        console.log('Tie!');
    } else {
        console.log('You lose :(');
        points = points - 5;
    }
}

function startHigher() {
    if (gameStartedLower === true) {
        console.log('You already started guessing lower!!');
    } else {
        if (gameStartedHigher === false) {
            gameStartedHigher = true;
            if (startGame === false) {
                alert('Start game first!!');
            } else {
                intervalId = setInterval(cycleHigher, 100)
                setTimeout(function () {
                    clearInterval(intervalId);
                    guessHigher();
                    updatePoints();
                    startGame = false;
                    gameStartedHigher = false;
                }, 4000);
            }
        } else {
            console.log('You already started guessing!');
        }
    }
}

function cycleHigher() {
    let randomDice = Math.round(Math.random() * 6);
    diceGuess[currentDiceGuess].classList.remove('active-guess');
    currentDiceGuess = (randomDice) % totalImagesGuess;
    diceGuess[currentDiceGuess].classList.add('active-guess');
}

function guessHigher() {
    if (currentDice < currentDiceGuess) {
        console.log('You win!');
        points = points + 10;
    } else if (currentDiceGuess === currentDice) {
        console.log('Tie!');
    } else {
        console.log('You lose :(');
        points = points - 5;
    }
}

function openPopup() {
    const popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
