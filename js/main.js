let currentDice = 0;
const dice = document.querySelectorAll('.dice img');
const totalImages = dice.length;
let intervalId; 

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


document.querySelector('.start-button').addEventListener('click', startCycling);

