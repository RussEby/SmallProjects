/*
** Gather Elements
*/
let coinTossScore = document.getElementById("CoinTossScore");
let coinTossModalContent = document.getElementById("coinToss");

/*
** Wire up events
*/
document.getElementById("btnHeads").addEventListener("click", tossCoin);
document.getElementById("btnTails").addEventListener("click", tossCoin);

/*
** Varibles and constants
*/
let score = [0, 0];
const coinArray = ['Heads', 'Tails'];
const player = 0;
const computer = 1;

/*
** The handler for coin toss
*/
function tossCoin(e) {

    let playerPick = e.target.innerText;
    let computerToss = getComputerToss();

    // if the playerPick is equal to the computerToss then the score goes to the player
    score[(playerPick === computerToss) ? player : computer] += 1;

    coinTossScore.innerHTML = `<p>Computer tossed ${computerToss}</p>
                <p>${(playerPick === computerToss) ? "Player" : "Computer"} Wins</p>
                <p>Player <span class="score">${score[player]}</span> Computer <span class="score">${score[computer]}</span></p>`;
};

/*
** Utility for the computer coin toss
*/
function getComputerToss() {
    return coinArray[Math.floor(Math.random() * coinArray.length)];
}