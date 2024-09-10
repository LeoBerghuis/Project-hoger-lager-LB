let currentDice = Math.round(Math.random() * 6);
const dice = document.querySelectorAll('.dice img');
const diceGuess = document.querySelectorAll('.dice-guess img');
const totalImages = dice.length;
const totalImagesGuess = diceGuess.length;
let intervalId; 
let startLowerGuess


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

document.querySelector('.start-button').addEventListener('click', startCycling);
document.querySelector('.guess-lower').addEventListener('click', startLower);
document.querySelector('.guess-higher').addEventListener('click', startLower);
