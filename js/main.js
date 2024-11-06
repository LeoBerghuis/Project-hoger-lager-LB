let currentDice = Math.round(Math.random() * (6 - 1) + 1);
let currentDiceGuess = Math.round(Math.random() * (6 - 1) + 1);
const dice = document.querySelectorAll('.dice-img img');
const diceGuess = document.querySelectorAll('.dice-guess-img img');
const totalImages = [dice.length, diceGuess.length];
let intervalId;
let timeLeft = 600;
let multiplier = false;
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
const xpNeeded = 100;
let level = localStorage.getItem('level') ? parseInt(localStorage.getItem('level')) : 0;
let xp = localStorage.getItem('xp') ? parseInt(localStorage.getItem('xp')) : 0;
let xpNumber = document.querySelector('.progressxp').innerText = 'progress: ' + xp + '/' + xpNeeded;
let levelNumber = document.querySelector('.levelxp').innerText = 'level: ' + level;
let highScorePoint = localStorage.getItem('highscore') ? parseInt(localStorage.getItem('highscore')) : 0;
let pointSystem = document.querySelector('.point').innerText = points;
let highScore = document.querySelector('.highscore').innerText = highScorePoint;
const upgrades = [150, 200, 250, 350, 300, 400];
const ownBase = true;
let gameStart = [false, false, false, false];
const allDice = [document.querySelector('.dice-one'), document.querySelector('.dice-two'), document.querySelector('.dice-three'), document.querySelector('.dice-four'), document.querySelector('.dice-five'), document.querySelector('.dice-six'), document.querySelector('.dice-one-Guess'), document.querySelector('.dice-two-Guess'), document.querySelector('.dice-three-Guess'), document.querySelector('.dice-four-Guess'), document.querySelector('.dice-five-Guess'), document.querySelector('.dice-six-Guess')];
const popup = document.querySelector('.popup').addEventListener('click', openPopup);
const popupSmall = document.querySelector('.popup-small').addEventListener('click', openPopupSmall);
const startBtn = document.querySelector('.start-button').addEventListener('click', () => startCycling('start'));
const startLowerBtn = document.querySelector('.guess-lower').addEventListener('click', () => startCycling('lower'));
const startHigherBtn = document.querySelector('.guess-higher').addEventListener('click', () => startCycling('higher'));
const alertPopup = document.querySelector('.alerts');
const confirmButton = document.querySelector('.confirm-button').addEventListener('click', closeAlerts);
const buttons = [
    document.querySelector('.buy-background-gold').addEventListener('click', () => upgradeBackground('yellow')),
    document.querySelector('.buy-background-green').addEventListener('click', () => upgradeBackground('green')),
    document.querySelector('.buy-background-multi').addEventListener('click', () => upgradeBackground('multi')),
    document.querySelector('.return-red').addEventListener('click', () => upgradeBackground('red')),
    document.querySelector('.buy-dice-gold').addEventListener('click', () => buyDice('gold')),
    document.querySelector('.buy-points-boost').addEventListener('click', buyMultiplier),
    document.querySelector('.buy-dice-blue').addEventListener('click', () => buyDice('gold')),
    document.querySelector('.buy-background-gold-big').addEventListener('click', () => upgradeBackground('yellow')),
    document.querySelector('.buy-background-green-big').addEventListener('click', () => upgradeBackground('green')),
    document.querySelector('.buy-background-multi-big').addEventListener('click', () => upgradeBackground('multi')),
    document.querySelector('.return-red-big').addEventListener('click', () => upgradeBackground('red')),
    document.querySelector('.buy-dice-gold-big').addEventListener('click', () => buyDice('gold')),
    document.querySelector('.buy-dice-blue-big').addEventListener('click', () => buyDice('blue')),
    document.querySelector('.buy-points-boost-big').addEventListener('click', buyMultiplier),
];
//checks screen width
const screenWidth = window.innerWidth;

//When window loads
window.onload = checkLocalStorage();

//function to check local storage
function checkLocalStorage() {

    if (localStorage.getItem('goldOwned')) {
        updateText(".gold", "Gold background | owned");
    }
    if (localStorage.getItem('greenOwned')) {
        updateText(".green", "Green background | owned");
    }
    if (localStorage.getItem('multiOwned')) {
        updateText(".multi", "Multi background | owned");
    }
    if (localStorage.getItem('diceGoldOwned')) {
        updateText(".gold-dice", "Gold dice | owned");
    }
    if (localStorage.getItem('diceBlueOwned')) {
        updateText(".blue-dice", "Blue dice | owned");
    }
}

//Update all the text in html if needed
function updateText(selector, text) {
    const elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerText = text;
    }
}

//first function that runs after button press
function startCycling(type) {
    //If start button then it runs this
    if (type === 'start') {
        //If game isn't started it runs this
        if (!gameStart[1]) {
            gameStart[1] = true;
            gameStart[0] = true;
            //Function to run the dice
            diceStart(cycleDice);

            //After 4 seconds it makes gamestart0 false so if dice are still spinning you can't click higher/lower
            setTimeout(function () {
                gameStart[0] = false;
            }, 4000);

            //* Mooi voorbeeld van een benodigde else statement
        } else {
            showAlerts('alreadyStarted'); //If game already started
        }
    }

    //If lower button clicked
    if (type === 'lower') {
        //If dice still spinning
        if (gameStart[0]) {
            console.log('dice still spinning');
        } else {
            handleGuess(2, 'guessHigher', 'guessLower'); //If not then it runs the handleGuess function with the parameters given
        }
    }

    //If higher button clicked
    if (type === 'higher') {
        //If dice still spinning
        if (gameStart[0]) {
            console.log('dice still spinning');
        } else {
            handleGuess(3, 'guessLower', 'guessHigher'); //If not then it runs the handleGuess function with the parameters given
        }
    }
}

//Function to cycle the dice images
function diceStart(type) {
    // Starts cycling dice every 100ms for 4 seconds
    intervalId = setInterval(type, 100);
    // Stops the dice cycling after 4 seconds
    setTimeout(function () {
        clearInterval(intervalId);
    }, 4000);
}

//Handle the guess
function handleGuess(index, alertType, guessType) {
    //Checks if game is started
    if (gameStart[1] === false) {
        alert('Start the game first!');

        //? Concept heet "Early exit"
        //? Mooie manier om geen else statement te schrijven :)
        return;
    }

    //Checks if you already started the game
    if (gameStart[2] || gameStart[3]) {
        showAlerts(alertType);

        return;
    }

    gameStart[index] = true; //Sets the higher/lower to true
    diceStart(cycleGuess); //Runs the dice guess
    setTimeout(function () { //After 4 seconds
        guess(guessType); //Checks if you win
        updatePoints('points');
        updatePoints('xp');
        updatePoints('highscore');

        gameStart[1] = false;
        gameStart[index] = false; //Sets the gamestart to false
    }, 4000);

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

    //TODO 2x dezelfde code? This could be a function :)
    //TODO Probeer zo min mogelijk if in if in if in if.
    //TODO Soms ontkom je er niet aan, maar in dit geval zeker wel :P
    if (type === 'guessHigher') {
        //checks if currentdice is smaller than currentdiceguess
        if (currentDice < currentDiceGuess) {
            //checks if multiplier is true
            if (multiplier) {
                points = points + 20;
                highScorePoint = highScorePoint + 20;
                //adds the xp
                xp = xp + 40;
                levelUp()
            } else {
                points = points + 10;
                highScorePoint = highScorePoint + 10;
                //adds the xp
                xp = xp + 20;
                levelUp()
            }
            showAlerts('win');
        } else if (currentDiceGuess === currentDice) {
            //adds the xp
            xp = xp + 10
            levelUp()
            showAlerts('tie');
        } else {
            //removes the points
            points = points - 5;
            // adds the xp
            xp = xp + 5;
            levelUp()
            showAlerts('lose');
        }
    }
    if (type === 'guessLower') {
        //checks if currentdiceguess is smaller than currentdice
        if (currentDiceGuess < currentDice) {
            if (multiplier) {
                points = points + 20;
                highScorePoint = highScorePoint + 20;
                //adds the xp
                xp = xp + 40;
                levelUp()
            } else {
                points = points + 10;
                highScorePoint = highScorePoint + 10;
                //adds the xp
                xp = xp + 20;
                levelUp()
            }
            showAlerts('win');
        } else if (currentDiceGuess === currentDice) {
            //adds the xp
            xp = xp + 10;
            levelUp()
            showAlerts('tie');
        } else {
            //removes the points
            points = points - 5;
            //adds the xp
            xp = xp + 5;
            levelUp()
            showAlerts('lose');
        }
    }
}

function showAlerts(alertsArray) {
    // Show the alert
    alerts(alertsArray);
    // Close the alert after 3 seconds
    setTimeout(closeAlerts, 3000);
}

//function to update the points to localstorage
function updatePoints(type) {
    //checks if the points go under 0, if they do it stays at 0
    if (type === 'points') {
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

    if (type === 'highscore') {
        //updates the highscorepoints in localstorage
        highScore = document.querySelector('.highscore').innerText = highScorePoint;
        localStorage.setItem('highscore', highScorePoint);
    }

    if (type === 'xp') {
        xpNumber = document.querySelector('.progressxp').innerText = 'progress: ' + xp + '/' + xpNeeded;
        localStorage.setItem('xp', xp);
    }
}

function levelUp() {
    if (xp >= 100) {
        xp = xp - 100;
        level = level + 1;
        levelNumber = document.querySelector('.levelxp').innerText = "level: " + level;
        localStorage.setItem('level', level);
        updatePoints('xp');
    }
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

//function for alerts
function alerts(type) {
    const alertText = document.querySelector('.alert-text');

    // Probeer altijd zonder else statements te programmeren (Soms kan het niet anders)
    // Default values zijn belangrijk om te initialiseren aan het begin
    alertPopup.style.top = '1em';
    alertPopup.style.bottom = '';
    alertPopup.style.opacity = '1';

    // switch statements zijn korter dan een if chain.
    // Niet alleen korter, maar ook meer performant.
    // Dit komt doordat er maar 1x door de switch statement heen geloopt word integenstelling tot de gehele if chain.
    switch (type) {
        case 'win':
            alertText.innerText = 'You win!';
            break;
        case 'lose':
            alertText.innerText = 'You lose :(';
            break;
        case 'tie':
            alertText.innerText = 'Tie!';
            break;
        case 'guessLower':
            alertText.innerText = 'You already started guessing!!';
            break;
        case 'guessHigher':
            alertText.innerText = 'You already started guessing!!';
            break;
        case 'alreadyStarted':
            alertText.innerText = 'You already started the game!';
            break;
        case 'stillStarting':
            alertText.innerText = 'Please wait, the game is starting!';
            break;
        case 'alreadyOwn':
            alertText.innerText = 'You already own this!';
            break;
        default:
            'What are you doing here?';
    }
}

function closeAlerts() {
    alertPopup.style.opacity = '0';
    alertPopup.style.top = '-10em';
    alertPopup.style.bottom = '';
    alertPopup.style.transition = 'opacity 0.5s ease-in-out, top 0.5s ease-in-out';
}


//function for upgrading the background
function upgradeBackground(color) {
    if (color === 'yellow') {
        //checks if it is in localstorage
        if (localStorage.getItem('goldOwned', true)) {
            showAlerts('alreadyOwn');
            document.body.style.backgroundImage = 'url("../img/yellow.png")';
            //if not in local storage checks if you have enough points, then puts in localstorage that you own it
        } else if (points >= upgrades[0]) {
            points = points - upgrades[0];
            updatePoints('points');
            document.body.style.backgroundImage = 'url("../img/yellow.png")';
            updateText(".gold", "Gold background | owned");
            localStorage.setItem('goldOwned', true);
        }
    } else if (color === 'green') {
        //checks if it is in localstorage
        if (localStorage.getItem('greenOwned', true)) {
            showAlerts('alreadyOwn');
            document.body.style.backgroundImage = 'url("../img/green.png")';
            //if not in local storage checks if you have enough points, then puts in localstorage that you own it
        } else if (points >= upgrades[1]) {
            points = points - upgrades[1];
            updatePoints('points');
            document.body.style.backgroundImage = 'url("../img/green.png")';
            localStorage.setItem('greenOwned', true);
            updateText(".green", "Green background | owned");
        }
    } else if (color === 'multi') {
        //checks if it is in localstorage
        if (localStorage.getItem('multiOwned', true)) {
            showAlerts('alreadyOwn');
            document.body.style.backgroundImage = 'url("../img/multi.png")';
            //if not in local storage checks if you have enough points, then puts in localstorage that you own it
        } else if (points >= upgrades[2]) {
            points = points - upgrades[2];
            updatePoints('points');
            document.body.style.backgroundImage = 'url("../img/multi.png")';
            localStorage.setItem('multiOwned', true);
            updateText(".multi", "Multi background | owned");
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
            showAlerts('alreadyOwn');
            updateDiceGold();
            //if not in local storage checks if you have enough points, then puts in localstorage that you own it
        } else if (points >= upgrades[3]) {
            points = points - upgrades[3];
            updatePoints('points');
            updateDiceGold();
            localStorage.setItem('diceGoldOwned', true);
            updateText(".gold-dice", "Gold dice | owned");
        }
    } else if (color === 'blue') {
        //checks if it is in localstorage
        if (localStorage.getItem('diceBlueOwned', true)) {
            showAlerts('alreadyOwn');
            updateDiceBlue();
            //if not in local storage checks if you have enough points, then puts in localstorage that you own it
        } else if (points >= upgrades[4]) {
            points = points - upgrades[4];
            updateDiceBlue();
            updatePoints('points');
            localStorage.setItem('diceBlueOwned', true);
            updateText(".blue-dice", "Blue dice | owned");
        }
        //if not enough points and it's not in localstorage
    } else {
        alert('Not enough points!!');
        updateDiceBlue();
    }
}

function buyMultiplier() {
    if (points >= upgrades[5]) {
        points = points - upgrades[5];
        updatePoints('points');
        startTimer();
        updateText(".multiply", "Points multiply | owned");
    } else {
        alert('Not enough points!!');
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

function startTimer() {
    const timer = document.querySelector('.timer')
    timer.style.opacity = 1;

    multiplier = true;
    timeLeft = 600;

    //? If statements kan je ook "omdraaien" om een early exit te maken
    if (!multiplier) {
        document.querySelector('.timer').innerText = "Time's Up!";
        return;
    }

    setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.querySelector('.timer').innerText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        timeLeft--;

        if (timeLeft < 0) {
            document.querySelector('.timer').innerText = "Time's Up!";
            updateText(".multiply", "Multiply points x2");
            multiplier = false;
        }
    }, 1000);
}