let currentDice = Math.round(Math.random() * (6 - 1) + 1);
let currentDiceGuess = Math.round(Math.random() * (6 - 1) + 1);
const dice = document.querySelectorAll('.dice-img img');
const diceGuess = document.querySelectorAll('.dice-guess-img img');
const totalImages = [dice.length, diceGuess.length];
let intervalId;
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
let highScorePoint = localStorage.getItem('highscore') ? parseInt(localStorage.getItem('highscore')) : 0;
let pointSystem = document.querySelector('.point').innerText = points;
let highScore = document.querySelector('.highscore').innerText = highScorePoint;
const upgrades = [150, 200, 250, 350, 300];
const ownBase = true;
let gameStart = [false, false, false, false];
const allDice = [document.querySelector('.dice-one'), document.querySelector('.dice-two'), document.querySelector('.dice-three'), document.querySelector('.dice-four'), document.querySelector('.dice-five'), document.querySelector('.dice-six'), document.querySelector('.dice-one-Guess'), document.querySelector('.dice-two-Guess'), document.querySelector('.dice-three-Guess'), document.querySelector('.dice-four-Guess'), document.querySelector('.dice-five-Guess'), document.querySelector('.dice-six-Guess')];
const buyGold = document.querySelector('.buy-background-yellow').addEventListener('click', () => upgradeBackground('yellow'));
const buyGreen = document.querySelector('.buy-background-green').addEventListener('click', () => upgradeBackground('green'));
const buyMulti = document.querySelector('.buy-background-multi').addEventListener('click', () => upgradeBackground('multi'));
const rtrnRed = document.querySelector('.return-red').addEventListener('click', () => upgradeBackground('red'));
const buyDiceBlue = document.querySelector('.buy-dice-blue').addEventListener('click', () => buyDice('blue'));
const buydiceGold = document.querySelector('.buy-dice-gold').addEventListener('click', () => buyDice('gold'));
const popup = document.querySelector('.popup').addEventListener('click', openPopup);
const popupSmall = document.querySelector('.popup-small').addEventListener('click', openPopupSmall);
const startBtn = document.querySelector('.start-button').addEventListener('click', () => startCycling('start'));
const startLowerBtn = document.querySelector('.guess-lower').addEventListener('click', () => startCycling('lower'));
const startHigherBtn = document.querySelector('.guess-higher').addEventListener('click', () => startCycling('higher'));
const alertPopup = document.querySelector('.alerts');
const confirmButton = document.querySelector('.confirm-button').addEventListener('click', closeAlerts)

//When window loads in runs this
window.onload = checkLocalStorage();

//function to check local storage
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


//function for alerts
function alerts(type) {
    const alertText = document.querySelector('.alert-text');
    alertPopup.style.top = '1em';
    alertPopup.style.opacity = '1';
    if (type === 'win') {
        alertText.innerText = 'You win!';
    }
    if (type === 'lose') {
        alertText.innerText = 'You lose :(';
    }
    if (type === 'tie') {
        alertText.innerText = 'Tie!';
    }
    if (type === 'guessLower') {
        alertText.innerText = 'You already started guessing lower!!';
    }
    if (type === 'guessHigher') {
        alertText.innerText = 'You already started guessing higher!!';
    }
    if (type === 'alreadyStarted') {
        alertText.innerText = 'You already started the game!';
    }
}

function closeAlerts() {
    alertPopup.style.opacity = '0';
    alertPopup.style.top = '-10em';
    alertPopup.style.transition = 'opacity 0.5s ease-in-out, top 0.5s ease-in-out';
}

function diceStart(type) {
    if (type === 'start') {
        for (let i = 0; i < 40; i++) {
            setTimeout(function () {
                cycleDice();
            }, 100 * i);
        }
        setTimeout(function () {
            gameStart[0] = true;
            gameStart[1] = false;
        }, 4000);
    }
    else {
        for (let i = 0; i < 40; i++) {
            setTimeout(function () {
                cycleGuess();
            }, 100 * i);
        }
    }
}

function showMultipleAlerts(alertsArray) {
    for (let i = 0; i < alertsArray.length; i++) {
        alerts(alertsArray[i]); 
        setTimeout(function () { 
            closeAlerts();  
        },3000 * i);
    }
}

//function when you start cycling
function startCycling(type) {

    if (type === 'start') {
        if (!gameStart[1]) {
            gameStart[1] = true;
            diceStart('start');
        } else {
            showMultipleAlerts(['alreadyStarted']); 
        }
    }

    if (type === 'lower') {
        handleGuess(2, 'guessHigher', 'guessLower');
    }

    if (type === 'higher') {
        handleGuess(3, 'guessLower', 'guessHigher');
    }
}

function handleGuess(index, alertType, guessType) {
    if (gameStart[2] || gameStart[3]) {
        showMultipleAlerts([alertType]); 
    } else {
         if (!gameStart[0]) {
            alert('Start the game first!');
        } else {
            gameStarted = true;
            gameStart[index] = true;
            diceStart('guess');
            setTimeout(function () {
                guess(guessType);
                updatePoints();
                highScorePoints();
                gameStart[0] = false;
                gameStart[index] = false;
            }, 4000);
        }
    }
}

//function to switch between the dices
function cycleDice() {
    let randomDice = Math.round(Math.random() * (6 - 1) + 1);
    //removes the class
    dice[currentDice].classList.remove('active');
    //adds the class to a random dice because of the randomDice variable
    currentDice = (randomDice) % totalImages[0];
    dice[currentDice].classList.add('active');
}

//function to switch b etween the dices
function cycleGuess() {
    let randomDice = Math.round(Math.random() * (6 - 1) + 1);
    //removes the class
    diceGuess[currentDiceGuess].classList.remove('active-guess');
    //adds the class to a random dice because of the randomDice variable
    currentDiceGuess = (randomDice) % totalImages[1];
    diceGuess[currentDiceGuess].classList.add('active-guess');
}

//function for the points adding/removing
function guess(type) {
    if (type === 'guessHigher') {
        //checks if currentdice is smaller than currentdiceguess
        if (currentDice < currentDiceGuess) {
            //adds the points
            points = points + 10;
            highScorePoint = highScorePoint + 10;
            alerts('win');
        } else if (currentDiceGuess === currentDice) {
            alerts('tie');
        } else {
            //removes the points
            points = points - 5;
            alerts('lose');
        }
    }
    if (type === 'guessLower') {
        //checks if currentdiceguess is smaller than currentdice
        if (currentDiceGuess < currentDice) {
            //adds the points
            points = points + 10; + 10;
            highScorePoint = highScorePoint + 10;
            alerts('win');
        } else if (currentDiceGuess === currentDice) {
            alerts('tie');
        } else {
            //removes the points
            points = points - 5;
            alerts('lose');
        }
    }
}

//function to update the points to localstorage
function updatePoints() {
    //checks if the points go under 0, if they do it stays at 0
    if (points < 0) {
        points = 0;
        //updates the points in localstorage
        pointSystem = document.querySelector('.point').innerText = points;
        localStorage.setItem('points', points);
    } else {
        //updates the points in localstorage
        pointSystem = document.querySelector('.point').innerText = points;
        localStorage.setItem('points', points);
    }
}

//function to update highscorepoints
function highScorePoints() {
    //updates the highscorepoints in localstorage
    highScore = document.querySelector('.highscore').innerText = highScorePoint;
    localStorage.setItem('highscore', highScorePoint);
}

//function to open the popup
function openPopup() {
    const popup = document.querySelector("#myPopup");
    popup.classList.toggle("show");
}

function openPopupSmall() {
    const popup = document.querySelector('#myPopupSmall');
    popup.classList.toggle("show")
}

//function for upgrading the background
function upgradeBackground(color) {
    if (color === 'yellow') {
        //checks if it is in localstorage
        if (localStorage.getItem('goldOwned', true)) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/yellow.png")';
            document.querySelector(".buy-background-yellow").innerText = "Gold backround | owned";
            //if not in local storage checks if you have enough points, then puts in localstorage that you own it
        } else if (points >= upgrades[0]) {
            points = points - upgrades[0];
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/yellow.png")';
            document.querySelector(".buy-background-yellow").innerText = "Gold backround | owned";
            localStorage.setItem('goldOwned', true);
        }
    } else if (color === 'green') {
        //checks if it is in localstorage
        if (localStorage.getItem('greenOwned', true)) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/green.png")';
            document.querySelector(".buy-background-green").innerText = "Green backround | owned";
            //if not in local storage checks if you have enough points, then puts in localstorage that you own it
        } else if (points >= upgrades[1]) {
            points = points - upgrades[1];
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/green.png")';
            localStorage.setItem('greenOwned', true);
            document.querySelector(".buy-background-green").innerText = "Green backround | owned";
        }
    } else if (color === 'multi') {
        //checks if it is in localstorage
        if (localStorage.getItem('multiOwned', true)) {
            alert('You already own this!');
            document.body.style.backgroundImage = 'url("../img/multi.png")';
            document.querySelector(".buy-background-multi").innerText = "multicolored backround | owned";
            //if not in local storage checks if you have enough points, then puts in localstorage that you own it
        } else if (points >= upgrades[2]) {
            points = points - upgrades[2];
            updatePoints();
            document.body.style.backgroundImage = 'url("../img/multi.png")';
            localStorage.setItem('multiOwned', true);
            document.querySelector(".buy-background-multi").innerText = "multicolored backround | owned";
        }
        //return to the red background color (default)
    } else if (ownBase && color === 'red') {
        document.body.style.backgroundImage = 'url("../img/red.png")';
        //if not enough points and it's not in localstorage
    } else {
        alert('Not enough points!!');
        document.body.style.backgroundImage = 'url("../img/red.png")';
    }
}

//function for upgrading dice
function buyDice(color) {
    if (color === 'gold') {
        //checks if it is in localstorage
        if (localStorage.getItem('diceGoldOwned', true)) {
            alert('You already own this!!');
            updateDiceGold();
            document.querySelector(".buy-dice-gold").innerText = "Gold dice | owned";
            //if not in local storage checks if you have enough points, then puts in localstorage that you own it
        } else if (points >= upgrades[3]) {
            points = points - upgrades[3];
            updatePoints();
            updateDiceGold();
            localStorage.setItem('diceGoldOwned', true);
            document.querySelector(".buy-dice-gold").innerText = "Gold dice | owned";
        }
    } else if (color === 'blue') {
        //checks if it is in localstorage
        if (localStorage.getItem('diceBlueOwned', true)) {
            alert('You aready own this!!');
            updateDiceBlue();
            document.querySelector(".buy-dice-blue").innerText = "Blue dice | owned";
            //if not in local storage checks if you have enough points, then puts in localstorage that you own it
        } else if (points >= upgrades[4]) {
            points = points - upgrades[4];
            updateDiceBlue();
            updatePoints();
            localStorage.setItem('diceBlueOwned', true);
            document.querySelector(".buy-dice-blue").innerText = "Blue dice | owned";
        }
        //if not enough points and it's not in localstorage
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