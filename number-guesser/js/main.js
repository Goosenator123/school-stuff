// Get references to HTML elements
const hp_bar = document.getElementById("hp-bar");
const hp_label = document.getElementById("hp-label");
const hint = document.getElementById("hint");
const submit = document.getElementById("submit");
const menu = document.getElementById("menu");
const restart = document.getElementById("try-again");
const gameOverScore = document.getElementById("game-over-score-container");

// Get difficulty buttons' references
const easyMode = document.getElementById("easy");
const normalMode = document.getElementById("normal");
const hardMode = document.getElementById("hard");

// Set values
let dmg = 0; // Set dmg
let hp = 100;
let targetHp = 100;
let submitCooldown = false; // Set cooldown to avoid submit spam
let gameOverCooldown = false;
let answer = 0;

// Audio
let bgMusic = new Audio("../audio/prayerInC.mp3"); // Set background audio
let dmgSound = new Audio("../audio/undertale-dmg.mp3");
let correctSound = new Audio("../audio/8bitSuccess.mp3");
let deadSound = new Audio("../audio/gameOver.mp3")
bgMusic.loop = true;
bgMusic.volume = 0.3;
dmgSound.volume = 0.6;


//! Functions ------------------------------------------

// Changing windows arrow functions
const startGame = () => {
    document.body.classList.toggle('start-game');
}

const stopGame = () => {
    document.body.classList.toggle('end-game');
}

// Decrease HP function
function decreaseHp() {
    // Set local variables
    targetHp -= dmg;
    dmgSound.currentTime = 0;
    dmgSound.play();

    // Decrease label gradually function
    const decreaseLabel = setInterval(() => {
        // Check if hp is at targetHp
        if (hp != targetHp) {     
            if (hp >0) {
                hp -= 1;
                hp_label.textContent = `${hp}%`;
                hp_bar.style.width = `${hp}%`; // Change hp_bar length
            }    
        } else {
            clearInterval(decreaseLabel) // Stops the interval
        }
    }, 20);

    // Check if dead
    checkDead();
}

// When dead function
function checkDead() {
    if (targetHp <= 0) {
        setTimeout(() => {
            // hint.textContent = "You're Dead!";
            // hint.style.color = "red";
            bgMusic.pause();

            setTimeout(() => {
                stopGame();
                reset();
                deadSound.currentTime = 0;
                deadSound.play();
            }, 100);
        }, 500);
    }
}

// checkAnswer function
function checkAnswer() {
    const guess = document.getElementById("guess").value;

    // Check if valid input
    if (guess < 1 || guess > 100 || guess === "") {
        hint.textContent = "The number is from 1 to 100!";
        hint.style.color = "yellow";
        // console.log("invalid");
    } else {

        // Check if guess is correct
        if (guess > answer) {
            hint.textContent = "Lower";
            hint.style.color = "aqua";
            decreaseHp();
            // return true;
            // console.log("lower");
        } else if (guess < answer) {
            hint.textContent = "Higher";
            hint.style.color = "orange";
            decreaseHp();
            // return true;
            // console.log("higher");
        } else {
            hint.textContent = "Correct!";
            hint.style.color = "greenyellow";
            correctSound.currentTime = 0;
            correctSound.play();
            setTimeout(reset, 600);
            // return false;
        }
    }
}

// Setting answer function
function setAnswer() {
    const number = Math.round(Math.random() * 100);
    answer = number;
    console.log(number);
    return number
}

// Reset game
function reset() {
    const guess = document.getElementById("guess");
    guess.value = "";
    hp = 100;
    targetHp = 100;
    submitCooldown = false;
    hint.textContent = "";
    hp_bar.style.width = "100%";
    hp_label.textContent = "100%";
}


//! Events
submit.addEventListener('click', () => {
    // Check if user is dead or submitCooldown is on
    if (!submitCooldown && targetHp > 0) {
        checkAnswer();
        submitCooldown = true;
        setTimeout(() => {
            submitCooldown = false; // Reset submitCooldown
        }, 300);
        // console.log(targetHp);
    }
});

menu.addEventListener('click', () => {
    deadSound.pause();
    stopGame();
    startGame();
});

restart.addEventListener('click', () => {
    deadSound.pause();
    stopGame();
    bgMusic.currentTime = 0.3;
    bgMusic.play();
    setAnswer();
})

// Setting difficulty
easyMode.addEventListener('click', () => {
    bgMusic.currentTime = 0.3;
    dmg = 10;
    bgMusic.play();
    startGame();
    setAnswer();
})

normalMode.addEventListener('click', () => {
    bgMusic.currentTime = 0.3;
    dmg = 13;
    bgMusic.play();
    startGame();
    setAnswer();
})

hardMode.addEventListener('click', () => {
    bgMusic.currentTime = 0.3;
    dmg = 17;
    bgMusic.play();
    startGame();
    setAnswer();
})
