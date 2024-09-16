let currentDice = Math.round(Math.random() * 6);
let currentDiceGuessLower = Math.round(Math.random() * 6);
let currentDiceGuessHigher = Math.round(Math.random() * 6);
const dice = document.querySelectorAll('.dice img');
const diceGuess = document.querySelectorAll('.dice-guess img');
const totalImages = dice.length;
const totalImagesGuess = diceGuess.length;
let intervalId;
let startGuessLow;
let startGuessHigh;
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
let pointSystem = document.querySelector('.point').innerHTML = points;
const upgradeBackgroudYellow = 150;
const upgradeBackgroudGreen = 200;
const upgradeBackgroudMulti = 250;
const upgradeDice = 250;
let ownMulti = false;
let ownGreen = false;
let ownGold = false;


document.querySelector('.buy-background-yellow').addEventListener('click', upgradeBackground);
document.querySelector('.buy-background-green').addEventListener('click', upgradeBackground);
document.querySelector('.buy-background-multi').addEventListener('click', upgradeBackground);
document.querySelector('.start-button').addEventListener('click', startCycling);
document.querySelector('.guess-lower').addEventListener('click', startLower);
document.querySelector('.guess-higher').addEventListener('click', startHigher);
document.querySelector('.buy-dice').addEventListener('click', buyDice);
document.querySelector('.buy-dice').addEventListener('click', returnToRed);


function upgradeBackground() {
    if (event.target.classList.contains('buy-background-yellow') && points >= upgradeBackgroudYellow) {
        if (ownGold === true) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/2.png")';
        } else {
            points = points - upgradeBackgroudYellow;
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/2.png")';
            ownGold = true;
            console.log(ownGold);
        }
    } else if (event.target.classList.contains('buy-background-green') && points >= upgradeBackgroudGreen) {
        if (ownGreen === true) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/1.png")';
        } else {
            points = points - upgradeBackgroudGreen;
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/1.png")';
            ownGreen = true
        }    
    } else if (event.target.classList.contains('buy-background-multi') && points >= upgradeBackgroudMulti) {
        if (ownMulti === true) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/3.png")';
        } else {
            points = points - upgradeBackgroudMulti;
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/3.png")';
            ownMulti = true;
        }
    } else {
        alert('Not enough points!!')
    }
}


function returnToRed() {
    document.body.style.backgroundImage = 'url("../img/4.png")';
}

function buyDice() {
    if (points >= upgradeDice) {
        points = points - upgradeDice;
        updatePoints();
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
    }, 4000);
}

function startLower() {

    startGuessLow = setInterval(cycleLower, 100);

    setTimeout(function () {
        clearInterval(startGuessLow);
        guessLower();
        updatePoints();
    }, 4000);
}

function cycleLower() {
    randomDice = Math.round(Math.random() * 6);
    diceGuess[currentDiceGuessLower].classList.remove('active-guess');
    currentDiceGuessLower = (randomDice) % totalImagesGuess;
    diceGuess[currentDiceGuessLower].classList.add('active-guess');
}


function guessLower() {
    if (currentDiceGuessLower < currentDice) {
        console.log('You win!');
        points = points + 10;
    } else if (currentDiceGuessLower === currentDice) {
        console.log('Tie!');
    } else {
        console.log('You lose :(');
        points = points - 5;
    }
}

function startHigher() {

    startGuessHigh = setInterval(cycleHigher, 100)

    setTimeout(function () {
        clearInterval(startGuessHigh);
        guessHigher();
        updatePoints();
    }, 4000);
}

function cycleHigher() {
    randomDice = Math.round(Math.random() * 6);
    diceGuess[currentDiceGuessHigher].classList.remove('active-guess');
    currentDiceGuessHigher = (randomDice) % totalImagesGuess;
    diceGuess[currentDiceGuessHigher].classList.add('active-guess');
}

function guessHigher() {
    if (currentDice < currentDiceGuessHigher) {
        console.log('You win!');
        points = points + 10;
    } else if (currentDiceGuessHigher === currentDice) {
        console.log('Tie!');
    } else {
        console.log('You lose :(');
        points = points - 5;
    }
}