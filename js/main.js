let currentDice = Math.round(Math.random() * (6 - 1) + 1);
let currentDiceGuess = Math.round(Math.random() * (6 - 1) + 1);
const dice = document.querySelectorAll('.dice-img img');
const diceGuess = document.querySelectorAll('.dice-guess-img img');
const totalImages = [dice.length, diceGuess.length];
let intervalId;
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
let pointSystem = document.querySelector('.point').innerText = points;
let highScore = document.querySelector('.highscore').innerText = points;
const upgrades = [150, 200, 250, 350, 300];
const ownBase = true;
let gameStart = [false, false, false, false];
const allDice = [document.querySelector('.dice-one'), document.querySelector('.dice-two'), document.querySelector('.dice-three'), document.querySelector('.dice-four'), document.querySelector('.dice-five'), document.querySelector('.dice-six'),document.querySelector('.dice-one-Guess'),document.querySelector('.dice-two-Guess'),document.querySelector('.dice-three-Guess'), document.querySelector('.dice-four-Guess'),document.querySelector('.dice-five-Guess'), document.querySelector('.dice-six-Guess')];
const buyGold = document.querySelector('.buy-background-yellow').addEventListener('click', () => upgradeBackground('yellow'));
const buyGreen = document.querySelector('.buy-background-green').addEventListener('click', () => upgradeBackground('green'));
const buyMulti = document.querySelector('.buy-background-multi').addEventListener('click', () => upgradeBackground('multi'));
const rtrnRed = document.querySelector('.return-red').addEventListener('click', () => upgradeBackground('red'));
const buyDiceBlue = document.querySelector('.buy-dice-blue').addEventListener('click', () => buyDice('blue'));
const buydiceGold = document.querySelector('.buy-dice-gold').addEventListener('click', () => buyDice('gold'));
const popup = document.querySelector('.popup').addEventListener('click', openPopup);
const startBtn = document.querySelector('.start-button').addEventListener('click',() => startCycling('start'));
const startLowerBtn = document.querySelector('.guess-lower').addEventListener('click',() => startCycling('lower'));
const startHigherBtn = document.querySelector('.guess-higher').addEventListener('click',() => startCycling('higher'));


window.onload = checkLocalStorage();

function checkLocalStorage() {
    if (localStorage.getItem('goldOwned', true)) {
        document.querySelector(".buy-background-yellow").innerText = "Gold backround | owned";
    }
    if (localStorage.getItem('greenOwned', true)) {
        document.querySelector(".buy-background-green").innerText = "Green backround | owned";
    }
    if (localStorage.getItem('multiOwned', true)) {
        document.querySelector(".buy-background-multi").innerText = "Multi backround | owned";
    }
    if (localStorage.getItem('diceGoldOwned', true)) {
        document.querySelector(".buy-dice-gold").innerText = "Gold dice | owned";
    }
    if (localStorage.getItem('diceBlueOwned', true)) {
        document.querySelector(".buy-dice-blue").innerText = "Blue dice | owned";
    }
}

function startCycling(type) {
    if(type === 'start') {
        if (gameStart[1] === false) {
            gameStart[1] = true;
            intervalId = setInterval(cycleDice, 100);
            setTimeout(function () {
                clearInterval(intervalId);
                gameStart[0] = true;
                gameStart[1] = false;
            }, 4000);
        } else {
            console.log('game already started!');
        }
    }
    if(type === 'lower') {
        if (gameStart[3] === true) {
            console.log('You already started geussing higher!!');
        } else {
            if (gameStart[2] === false) {
                gameStart[2] = true;
                if (gameStart[0] === false) {
                    alert('Start game first!');
                } else {
                    intervalId = setInterval(cycleGuess, 100);
                    setTimeout(function () {
                        clearInterval(intervalId);
                        guessLower();
                        updatePoints();
                        gameStart[0] = false;
                        gameStart[2] = false;
                    }, 4000);
                }
            } else {
                console.log('You already started guessing!!');
            }
        }
    }
    if(type = 'higher') {
        if (gameStart[2] === true) {
            console.log('You already started guessing lower!!');
        } else {
            if (gameStart[3] === false) {
                gameStart[3] = true;
                if (gameStart[0] === false) {
                    alert('Start game first!!');
                } else {
                    intervalId = setInterval(cycleGuess, 100)
                    setTimeout(function () {
                        clearInterval(intervalId);
                        guessHigher();
                        updatePoints();
                        gameStart[0] = false;
                        gameStart[3] = false;
                    }, 4000);
                }
            } else {
                console.log('You already started guessing!');
            }
        }
    }
}

function cycleDice() {
    let randomDice = Math.round(Math.random() * (6 - 1) + 1);

    dice[currentDice].classList.remove('active');
    currentDice = (randomDice) % totalImages[0];
    dice[currentDice].classList.add('active');
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


function cycleGuess() {
    let randomDice = Math.round(Math.random() * (6 - 1) + 1);
    diceGuess[currentDiceGuess].classList.remove('active-guess');
    currentDiceGuess = (randomDice) % totalImages[1];
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

function updatePoints() {
    pointSystem = document.querySelector('.point').innerText = points;
    localStorage.setItem('points', points);
}

function highScorePoints() {
    highScore = document.querySelector('.highscore').innerText = points;
    localStorage.setItem('highscore', points);
}

function openPopup() {
    const popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function upgradeBackground(color) {
    if (color === 'yellow' && points >= upgrades[0]) {
        if (localStorage.getItem('goldOwned', true)) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/yellow.png")';
            document.querySelector(".buy-background-yellow").innerText = "Gold backround | owned";
        } else {
            points = points - upgrades[0];
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/yellow.png")';
            document.querySelector(".buy-background-yellow").innerText = "Gold backround | owned";
            localStorage.setItem('goldOwned', true);
        }
    } else if (color === 'green' && points >= upgrades[1]) {
        if (localStorage.getItem('greenOwned', true)) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/green.png")';
            document.querySelector(".buy-background-green").innerText = "Green backround | owned";
        } else {
            points = points - upgrades[1];
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/green.png")';
            localStorage.setItem('greenOwned', true);
            document.querySelector(".buy-background-green").innerText = "Green backround | owned";
        }
    } else if (color === 'multi' && points >= upgrades[2]) {
        if (localStorage.getItem('multiOwned', true)) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/multi.png")';
            document.querySelector(".buy-background-multi").innerText = "multicolored backround | owned";
        } else {
            points = points - upgrades[2];
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/multi.png")';
            localStorage.setItem('multiOwned', true);
            document.querySelector(".buy-background-multi").innerText = "multicolored backround | owned";
        }
    } else if (ownBase && color === 'red') {
        document.body.style.backgroundImage = 'url("../img/red.png")';
    } else {
        alert('Not enough points!!');
        document.body.style.backgroundImage = 'url("../img/red.png")';
    }
}

function buyDice(color) {
    if (color === 'gold' && points >= upgrades[3]) {
        if (localStorage.getItem('diceGoldOwned', true)) {
            alert('You already own this!!');
            updateDiceGold();
            document.querySelector(".buy-dice-gold").innerText = "Gold dice | owned";
        } else {
            points = points - upgrades[3];
            updatePoints();
            updateDiceGold();
            localStorage.setItem('diceGoldOwned', true);
            document.querySelector(".buy-dice-gold").innerText = "Gold dice | owned";
        }
    } else if (color === 'blue' && points >= upgrades[4]) {
        if (localStorage.getItem('diceBlueOwned', true)) {
            alert('You aready own this!!');
            updateDiceBlue();
            document.querySelector(".buy-dice-blue").innerText = "Blue dice | owned";
        } else {
            points = points - upgrades[4];
            updateDiceBlue();
            updatePoints();
            localStorage.setItem('diceBlueOwned', true);
            document.querySelector(".buy-dice-blue").innerText = "Blue dice | owned";
        }
    } else {
        alert('Not enough points!!');
        updateDiceBlue();
    }
}

function updateDiceBlue() {
    allDice[0].src = "img/1-blue.png";
    allDice[1].src = "img/2-blue.png";
    allDice[2].src = "img/3-blue.png";
    allDice[3].src = "img/4-blue.png";
    allDice[4].src = "img/5-blue.png";
    allDice[5].src = "img/6-blue.png";
    allDice[6].src = "img/1-blue.png";
    allDice[7].src = "img/2-blue.png";
    allDice[8].src = "img/3-blue.png";
    allDice[9].src = "img/4-blue.png";
    allDice[10].src = "img/5-blue.png";
    allDice[11].src = "img/6-blue.png";
}

function updateDiceGold() {
    allDice[0].src = "img/1-gold.png";
    allDice[1].src = "img/2-gold.png";
    allDice[2].src = "img/3-gold.png";
    allDice[3].src = "img/4-gold.png";
    allDice[4].src = "img/5-gold.png";
    allDice[5].src = "img/6-gold.png";
    allDice[6].src = "img/1-gold.png";
    allDice[7].src = "img/2-gold.png";
    allDice[8].src = "img/3-gold.png";
    allDice[9].src = "img/4-gold.png";
    allDice[10].src = "img/5-gold.png";
    allDice[11].src = "img/6-gold.png";
}