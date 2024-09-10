let currentDice = Math.round(Math.random() * 6);
const dice = document.querySelectorAll('.dice img');
const diceGuess = document.querySelectorAll('.dice-guess img');
const totalImages = dice.length;
const totalImagesGuess = diceGuess.length;
let intervalId; 
let startLowerGuess;

const dice1 = document.querySelector('img[alt="Dice 1"]');
const dice2 = document.querySelector('img[alt="Dice 2"]');
const dice3 = document.querySelector('img[alt="Dice 3"]');
const dice4 = document.querySelector('img[alt="Dice 4"]');
const dice5 = document.querySelector('img[alt="Dice 5"]');
const dice6 = document.querySelector('img[alt="Dice 6"]');
const diceGuess1 = document.querySelector('img[alt="Dice Guess 1"]');
const diceGuess2 = document.querySelector('img[alt="Dice Guess 2"]');
const diceGuess3 = document.querySelector('img[alt="Dice Guess 3"]');
const diceGuess4 = document.querySelector('img[alt="Dice Guess 4"]');
const diceGuess5 = document.querySelector('img[alt="Dice Guess 5"]');
const diceGuess6 = document.querySelector('img[alt="Dice Guess 6"]');


document.querySelector('.start-button').addEventListener('click', startCycling);
document.querySelector('.guess-lower').addEventListener('click', startLower);
document.querySelector('.guess-higher').addEventListener('click', startLower);

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

function cycleLower() {
    randomDice = Math.round(Math.random() * 6)
    diceGuess[currentDice].classList.remove('active-guess');
    currentDice = (randomDice) % totalImagesGuess;
    diceGuess[currentDice].classList.add('active-guess');
    
}

function startLower() {

    startLowerGuess = setInterval(cycleLower, 100)

    setTimeout(function() {
        clearInterval(startLowerGuess);
    }, 4000);
}


