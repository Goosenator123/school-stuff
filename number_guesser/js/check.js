const hp_bar = document.getElementById("hp-bar");
const hp_label = document.getElementById("hp-label");
const hint = document.getElementById("hint");
const submit = document.getElementById("submit");


submit.addEventListener('click', () => {
    let number = Math.random();
    console.log(number);
    number = Math.round(number * 100);
    console.log(number);
})
