let currentDice = Math.round(Math.random() * 6);
let currentDiceGuess = Math.round(Math.random() * 6);
const dice = document.querySelectorAll('.dice img');
const diceGuess = document.querySelectorAll('.dice-guess img');
const totalImages = dice.length;
const totalImagesGuess = diceGuess.length;
let intervalId;
let startGuessLow;
let startGuessHigh;
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
let pointSystem = document.querySelector('.point').innerHTML = points;
const upgradeBackgroundYellow = 150;
const upgradeBackgroundGreen = 200;
const upgradeBackgroundMulti = 250;
const upgradeDice = 250;
let ownMulti = false;
let ownGreen = false;
let ownGold = false;
const ownRed = true;
let startGame = false;
document.querySelector('.buy-background-yellow').addEventListener('click', () => upgradeBackground('yellow'));
document.querySelector('.buy-background-green').addEventListener('click', () => upgradeBackground('green'));
document.querySelector('.buy-background-multi').addEventListener('click', () => upgradeBackground('multi'));
document.querySelector('.return-red').addEventListener('click', () => upgradeBackground('red'));
document.querySelector('.start-button').addEventListener('click', startCycling);
document.querySelector('.guess-lower').addEventListener('click', startLower);
document.querySelector('.guess-higher').addEventListener('click', startHigher);
document.querySelector('.buy-dice').addEventListener('click', buyDice);
document.querySelector('.popup').addEventListener('click', openPopup);


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
        }
    } else if (ownRed === true && color === 'red') {
        document.body.style.backgroundImage = 'url("../img/red.png")'
    } else {
        alert('Not enough points!!');
        document.body.style.backgroundImage = 'url("../img/red.png")';
    }
}

function buyDice() {
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
    if (points >= upgradeDice) {
        points = points - upgradeDice;
        updatePoints();
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
    } else {
        alert('Not enough points!!');
    }
}

function cycleDice() {
    randomDice = Math.round(Math.random() * 6)
    dice[currentDice].classList.remove('active');
    currentDice = (randomDice) % totalImages;
    dice[currentDice].classList.add('active');
}

function updatePoints() {
    pointSystem = document.querySelector('.point').innerHTML = points;
    localStorage.setItem('points', points);
}

function startCycling() {
    intervalId = setInterval(cycleDice, 100);

    setTimeout(function () {
        clearInterval(intervalId);
        startGame = true;
    }, 4000);
    
}

function startLower() {

    if (startGame === false) {
        alert('Start game first!')
    } else {
        startGuessLow = setInterval(cycleLower, 100);

        setTimeout(function () {
            clearInterval(startGuessLow);
            guessLower();
            updatePoints();
            startGame = false;
        }, 4000);
    }    
}

function cycleLower() {
    randomDice = Math.round(Math.random() * 6);
    diceGuess[currentDiceGuess].classList.remove('active-guess');
    currentDiceGuess = (randomDice) % totalImagesGuess;
    diceGuess[currentDiceGuess].classList.add('active-guess');
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

    if (startGame === false) {
        alert('Start game first!!')
    } else{
        startGuessHigh = setInterval(cycleHigher, 100)
        setTimeout(function () {
            clearInterval(startGuessHigh);
            guessHigher();
            updatePoints();
            startGame = false;
        }, 4000);
    }

    
}

function cycleHigher() {
    randomDice = Math.round(Math.random() * 6);
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
