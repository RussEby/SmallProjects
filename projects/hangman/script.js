/**
 * Variables
 */
const myWords = ["javascript", "course", "developer", "cascading", "android", "google fonts"];
// const myWords = ["ab", "bc", "cd"];
let player = {
    guessesTaken: 0,
};
const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const maxTries = 10;

/**
 * Gather Elements
 */
const message = document.getElementById('outputMessage');
const letterArea = document.getElementById("lettersArea");
const guessArea = document.getElementById("guessArea");
const startBtn = document.getElementById("startBtn");

/**
 * Add Event Listeners
 */
startBtn.addEventListener("click", actionBtn);

/**
 * Event Handler
 */
function actionBtn() {
    // Reset board
    letterArea.innerHTML = "";
    guessArea.innerHTML = "";
    message.innerHTML = "";
    // if still words left
    if (myWords.length > 0) {
        startBtn.disabled = true;
        pickWord();
        buildBoard();
    }
    // no more words left
    else {
        setMessageType("default");
        message.innerHTML = ("No more words");
    }
};

function buildBoard() {
    allLetters.split('').forEach((letter) => {
        letterArea.appendChild(buildLetterHolder(letter));
    });

    player.solution.forEach((letter) => {
        guessArea.appendChild(buildUnknownLetters(letter));
    });
}

let guessHandler = function ({ target }) {
    let numTotalFound = 0;
    let numLetterFound = 0;
    let outputMessage;

    let solutionLetter = document.querySelectorAll(".unknownLetter");
    let letterNumber = target.dataset.myLetter.toUpperCase();

    // once clicked remove listener and mark as used
    target.removeEventListener("click", guessHandler);
    target.classList.add("usedLetter");

    // Count the number of letter unknown and known
    solutionLetter.forEach((letter) => {
        if (letter.innerHTML != "_") {
            numTotalFound++;
        }
        if (letter.dataset.myLetter.toUpperCase() === letterNumber) {
            letter.innerHTML = letterNumber;
            letter.classList.add('foundLetter');
            numLetterFound++;
        }
    });

    if (numLetterFound > 0) {
        setMessageType('found');
        outputMessage = `You found letter ${letterNumber} ${numLetterFound} ${numLetterFound > 1 ? "times" : "time"}`;
    } else {
        setMessageType('noMatch');
        outputMessage = `${letterNumber.toUpperCase()} is not in the word`;
        player.guessesTaken += 1;
    }

    let letterLeft = solutionLetter.length - (numLetterFound + numTotalFound);

    message.innerHTML =
        `${outputMessage}<br>
        ${letterLeft} letters left to find.<br>
        You have ${maxTries - player.guessesTaken} guesses left.`;

    if (letterLeft < 1) {
        wonTheGame();
    } else if (player.guessesTaken >= maxTries) {
        lostTheGame();
    }
}

/**
 * End Game
 */
function lostTheGame() {
    endGame();
    message.innerHTML = `You've ran out of turns.`;

    let solutionLetter = document.querySelectorAll(".unknownLetter");
    solutionLetter.forEach((letter) => {
        letter.innerHTML = letter.dataset.myLetter.toUpperCase();
    })

}

function wonTheGame() {
    endGame();
    message.innerHTML = `You've won the game!`;
}

function endGame() {
    const letters = document.getElementsByClassName('letter');
    for (var i = 0, len = letters.length | 0; i < len; i += 1) {
        letters[i].removeEventListener("click", guessHandler);
    }
    startBtn.disabled = false;
    player = {
        guessesTaken: 0,
    };
}

/**
 * Build Elements
 */
function buildUnknownLetters(letter) {
    let div = document.createElement("div");
    div.classList.add("unknownLetter");
    div.innerHTML = (letter === ' ') ? " " : "_";
    div.dataset.myLetter = letter;
    return div;
}

function buildLetterHolder(letterNumber) {
    let div = document.createElement("div");
    div.classList.add("letter");
    div.dataset.myLetter = letterNumber;
    div.myLetter = letterNumber;
    div.innerHTML = letterNumber;
    div.addEventListener("click", guessHandler);
    return div;
}

/**
 * randomize sort function
 */
function blender() {
    return .5 - Math.random();
    // return Math.random();
}

/**
 * Change message type
 */
function setMessageType(mesType = 'default') {
    message.classList.remove('defaultMessage', 'foundMessage', 'noMatchMessage');

    message.classList.add(`${mesType}Message`);
}

/**
 * Pick the next word
 */
function pickWord() {
    myWords.sort(blender);
    let theWord = myWords.shift();
    player.solution = theWord.split("");
}
