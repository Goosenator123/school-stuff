// Get references to HTML elements
const hp_bar = document.getElementById("hp-bar");
const hp_label = document.getElementById("hp-label");
const hint = document.getElementById("hint");
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");

// Get difficulty buttons' references
const easyMode = document.getElementById("easy");
const normalMode = document.getElementById("normal");
const hardMode = document.getElementById("hard");

// Set values
let dmg = 0; // Set dmg
let hp = 100;
let targetHp = 100;
let cooldown = false; // Set cooldown to avoid submit spam
let guess = "";

// Audio
let bgMusic = new Audio("../audio/prayerInC.mp3"); // Set background audio
let dmgSound = new Audio("../audio/undertale-dmg.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;

//! Functions
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

    // Display death message upon death
    if (targetHp <= 0) {
        setTimeout(() => {
            hint.textContent = "You're Dead!";
            hint.style.color = "red";
            bgMusic.pause();
            submit.Disabled = true;
        }, 500);
    }
}

// checkAnswer function
function checkAnswer() {
    guess = document.getElementById("guess").value;
    const answer = 10; // Set test answer

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
            return true;
            // console.log("lower");
        } else if (guess < answer) {
            hint.textContent = "Higher";
            hint.style.color = "orange";
            decreaseHp();
            return true;
            // console.log("higher");
        } else {
            hint.textContent = "You guessed correct!";
            hint.style.color = "greenyellow";
            return false;
        }
    }
}

// Start game / Restart game
function toggleGame() {
    document.body.classList.toggle('start-game');
}

// Reset cooldown
function resetCooldown() {
    cooldown = false;
}

//! Events
submit.addEventListener('click', () => {
    // Check if user is dead or cooldown is on
    if (!cooldown && targetHp > 0) {
        checkAnswer();
        cooldown = true;
        setTimeout(resetCooldown, 300);
        // console.log(targetHp);
    }
});

reset.addEventListener('click', () => {
    hp = 100;
    targetHp = 100;
    cooldown = false; // Set cooldown to avoid submit spam
    hint.textContent = "";
    hp_bar.style.width = "100%";
    hp_label.textContent = "100%";
    guess = "";
    toggleGame();
    bgMusic.pause();
    submit.Disabled = false;
}); // Reset game

// Setting difficulty
easyMode.addEventListener('click', () => {
    bgMusic.currentTime = 0;
    dmg = 10;
    bgMusic.play();
    toggleGame();
})

normalMode.addEventListener('click', () => {
    bgMusic.currentTime = 0;
    dmg = 13;
    bgMusic.play();
    toggleGame();
})

hardMode.addEventListener('click', () => {
    bgMusic.currentTime = 0;
    dmg = 17;
    bgMusic.play();
    toggleGame();
})
