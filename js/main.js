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
let points = 0;


document.querySelector('.start-button').addEventListener('click', startCycling);
document.querySelector('.guess-lower').addEventListener('click', startLower);
document.querySelector('.guess-higher').addEventListener('click', startHigher);

function cycleDice() {
     randomDice = Math.round(Math.random() * 6)
    dice[currentDice].classList.remove('active');
    currentDice = (randomDice) % totalImages;
    dice[currentDice].classList.add('active');

}

function startCycling() {

    intervalId = setInterval(cycleDice, 100);

    setTimeout(function() {
        clearInterval(intervalId);
    }, 4000); 
}

function startLower() {

    startGuessLow = setInterval(cycleLower, 100)

    setTimeout(function() {
        clearInterval(startGuessLow);
        guessLower()
    }, 4000);
}

function cycleLower() {
    randomDice = Math.round(Math.random() * 6)
    diceGuess[currentDiceGuessLower].classList.remove('active-guess');
    currentDiceGuessLower = (randomDice) % totalImagesGuess;
    diceGuess[currentDiceGuessLower].classList.add('active-guess');
    
}


function guessLower() {
    if (currentDiceGuessLower < currentDice) {
        console.log('You win!');
        points = points + 10;
        console.log(points);
    } else if (currentDiceGuessLower === currentDice) {
        console.log('Tie!');
        console.log(points);
    } else {
        console.log('You lose :(');
        points = points - 5;
        console.log(points);
    }
}

function startHigher() {

    startGuessHigh = setInterval(cycleHigher, 100)

    setTimeout(function() {
        clearInterval(startGuessHigh);
        guessHigher()
    }, 4000);
}

function cycleHigher() {
    randomDice = Math.round(Math.random() * 6)
    diceGuess[currentDiceGuessHigher].classList.remove('active-guess');
    currentDiceGuessHigher = (randomDice) % totalImagesGuess;
    diceGuess[currentDiceGuessHigher].classList.add('active-guess');
    
}

function guessHigher() {
    if ( currentDice < currentDiceGuessHigher) {
        console.log('You win!');
        points = points + 10
        console.log(points);
    } else if (currentDiceGuessHigher === currentDice) {
        console.log('Tie!');
        console.log(points);
    } else {
        console.log('You lose :(');
        points = points - 5;
        console.log(points);
    }
}