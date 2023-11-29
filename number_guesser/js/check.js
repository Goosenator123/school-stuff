// Get references to HTML elements
const hp_bar = document.getElementById("hp-bar");
const hp_label = document.getElementById("hp-label");
const hint = document.getElementById("hint");
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");

// Set values
let hp = 100;
let targetHp = 100;
let cooldown = false; // Set cooldown to avoid submit spam


// Testing Math object
// submit.addEventListener('click', () => {
//     let number = Math.random();
//     console.log(number);
//     number = Math.round(number * 100);
//     console.log(number);
// })

// Check answer function
function checkAnswer() {
    const guess = document.getElementById("guess").value;
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
            // console.log("lower");
        } else if (guess < answer) {
            hint.textContent = "Higher";
            hint.style.color = "orange";
            // console.log("higher");
            decreaseHp();
        } else {
            hint.textContent = "You guessed correct!";
            hint.style.color = "greenyellow";
        }
    }
}

// Decrease HP bar function
function decreaseHp() {
    // Set local variables
    const dmg = 10; // Set dmg
    targetHp -= dmg;
    hp_bar.style.width = `${targetHp}%` // Change hp_bar length

    // Decrease label gradually function
    const decreaseLabel = setInterval(() => {
        // Check if hp is at targetHp
        if (hp != targetHp) {
            hp -= 1;
            hp_label.textContent = `${hp}%`;
        } else {
            clearInterval(decreaseLabel) // Stops the interval
        }
    }, 30);

    // Display death message upon death
    if (targetHp === 0) {
        setTimeout(() => {
            hint.textContent = "You're Dead!";
            hint.style.color = "red"
        }, 400)
    }
}

// Reset cooldown
function resetCooldown() {
    cooldown = false;
}

// Events
submit.addEventListener('click', () => {
    // Check if user is dead or cooldown is on
    if (!cooldown && targetHp != 0) {
        checkAnswer();
        cooldown = true;
        setTimeout(resetCooldown, 300);
    }
});

reset.addEventListener('click', () => {
    hp = 100;
    targetHp = 100;
    cooldown = false; // Set cooldown to avoid submit spam
    hint.textContent = "";
    hp_bar.style.width = "100%";
    hp_label.textContent = "100%";
    guess.value = ""
}); // Reset game