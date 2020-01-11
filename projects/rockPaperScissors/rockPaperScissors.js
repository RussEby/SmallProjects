// gather the elements
const RPSMessage = document.getElementById("RPSscore");
const RPSscoreArea = document.getElementById("RPSmessage");
const btnPlayerChoices = document.querySelectorAll("#RockPaperScissors button");

// Add event listeners
for (let i = 0; i < btnPlayerChoices.length; i += 1) {
    btnPlayerChoices[i].addEventListener("click", playRPS);
}

// Create enumerations for look-up tables
const gamePieces = ["Rock", "Paper", "Scissor"];
const ScoringPlacement = {
    "Wins": 0,
    "Lost": 1,
    "Tie": 2
};
const resultsConfiguration = {
    "Rock": {
        "Rock": "Tie",
        "Paper": "Lost",
        "Scissor": "Wins"
    },
    "Paper": {
        "Rock": "Wins",
        "Paper": "Tie",
        "Scissor": "Lost"
    },
    "Scissor": {
        "Rock": "Lost",
        "Paper": "Wins",
        "Scissor": "Tie"
    },
};

// Array to store Wins, Lost, Tie
let RPSscore = [0, 0, 0]; // Player, Computer, Tie

function playRPS(e) {
    // What ever button, get text for players selection
    let playerSelection = e.target.innerText;

    // Use the function to get computer's selection
    let computerSelection = getComputerChoice();

    // Using the object resultsConfiguration, look up the result of player vs computer.
    let gameResults = resultsConfiguration[playerSelection][computerSelection];

    // Add one to proper spot in the score array
    RPSscore[ScoringPlacement[gameResults]] += 1;

    // display the message and score
    RPSMessage.innerHTML = `Player choice is ${playerSelection} and the computer chose ${computerSelection}. <br/> The player ${gameResults}.`

    RPSscoreArea.innerHTML = `Score is now Player <span class="score">${RPSscore[0]}</span>, <br/> the computer <span class="score">${RPSscore[1]}</span> and there have been <span class="score">${RPSscore[2]}</span> ties.`;
}

// return a random game piece
function getComputerChoice() {
    return gamePieces[Math.floor(Math.random() * (gamePieces.length))];
}