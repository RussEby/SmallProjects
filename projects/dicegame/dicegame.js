/*
** Gather elements
*/
const outputArea = document.querySelector(".outputArea");
const player1Panel = document.getElementById("viewer-1");
const player2Panel = document.getElementById("viewer-2");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const diceScoreBoxArea = document.getElementById("diceScoreBox");

/*
** Wire up events
*/
document.getElementById("btnDiceGameRoll").addEventListener("click", DiceGameRollHandler);

/* 
** Variables
*/
let DRGScore = [0, 0, 0];  // Player 1, player 2, tie
let dieRollSound = new Audio('Roll Dice 2-SoundBible.com-1635338454.mp3');

/*
** Event handler for the Dive Game Button
*/
function DiceGameRollHandler() {
    rollDie(1);
}

function rollDie(num) {
    dieRollSound.play();

    updateOutput(player1, roll(6));
    updateOutput(player2, roll(6));

    if (num > 24) {
        dieRollSound.pause();
        let rolls = [roll(6), roll(6)];
        updateOutput(player1, rolls[0]);
        updateOutput(player2, rolls[1]);
        displayWinner(rolls[0], rolls[1]);
        return 1;
    }

    setTimeout(() => {
        rollDie(num + 1);
    }, 150)
}

// Display Winner
function displayWinner(player1Score, player2Score) {
    if (player1Score == player2Score) {
        output = "Draw";
        DRGScore[2] += 1;
    }
    else if (player1Score > player2Score) {
        player1Panel.style.backgroundColor = "green";
        output = "Player 1 wins";
        DRGScore[0] += 1;

        setTimeout(() => {
            player1Panel.style.backgroundColor = "rgba(150,226,154,.5)";
        }, 500);
    }
    else {
        player2Panel.style.backgroundColor = "green";
        output = "Player 2 wins";
        DRGScore[1] += 1;

        setTimeout(() => {
            player2Panel.style.backgroundColor = "rgba(150,226,154,.5)";
        }, 500);
    }

    outputArea.innerHTML = output;

    diceScoreBoxArea.innerHTML = `<p>Player one <span class="score">${DRGScore[0]}</span></p><p>Player two <span class="score">${DRGScore[1]}</span></p><p>Tied games <span class="score">${DRGScore[2]}</span></p>`;
}

/*
** Display a die roll in a spot
*/
function updateOutput(el, num) {
    let holder = builder(num);
    if (el.children[0]) { el.children[0].remove(); }
    el.appendChild(holder);
}

/*
** Build the die image element
*/
function builder(num) {
    const dice = [[5], [1, 9], [1, 5, 9], [1, 3, 7, 9], [1, 3, 5, 7, 9], [1, 3, 4, 6, 7, 9]];
    let dieArray = dice[num - 1];

    let div = document.createElement("div");

    for (let x = 1; x < 10; x++) {
        let span = document.createElement("div");
        span.setAttribute("class", "dot");
        if (dieArray.includes(x)) {
            span.classList.add("black");
        }
        div.appendChild(span);
    }
    div.setAttribute("class", "dicer");
    return div;
}

/*
** Roll a die of num size
*/
function roll(num) {
    let rNumber = Math.floor(Math.random() * num) + 1;
    return rNumber;
}