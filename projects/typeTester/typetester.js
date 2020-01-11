/*
        ** Variables
        */
const wording = [
    "Do you like JavaScript as much as I do?",
    "Hope you are having fun this is a simple game you can make.",
    "Source code is included so you can create your own version of this challenge."];
let startTime, endTime;

/*
** Gather elements
*/
const practiceSentenceArea = document.getElementById("practiceSentence");
const typeArea = document.getElementById("typeArea");
const resultsArea = document.getElementById("typingResults");

/*
** Add Event Listeners
*/
document.getElementById("btnStartStop").addEventListener("click", startStopHandler)

/*
** Event Handlers
*/
function startStopHandler({ target: target }) {
    switch (target.innerText) {
        case "Start":
            typeArea.disabled = false;
            target.innerText = "Done";
            playGame();
            break;
        case "Done":
            typeArea.disabled = true;
            target.innerText = "Start Over";
            endPlay();
            break;
        case "Start Over":
            target.innerText = "Start";
            startTime = 0;
            endTime = 0;
            typeArea.value = "";
            practiceSentenceArea.innerText = "";
            results.innerHTML = "";
            break;
    }
}

function endPlay() {
    endTime = getCurrTime();
    let totalTime = ((endTime - startTime) / 1000);
    let userAttempt = typeArea.value;
    let wordCount = wordCounter(userAttempt);
    let speed = Math.round((wordCount / totalTime) * 60);

    resultsArea.innerHTML = `<p>You typed at <span class="score">${speed}</span> words per minute.</p><p>${compareWords(practiceSentenceArea.innerText, userAttempt)}</p>`;
}

function playGame() {
    let randomNum = Math.floor(Math.random() * wording.length);
    practiceSentenceArea.innerText = wording[randomNum];
    startTime = getCurrTime();
    typeArea.focus();
}

/*
** Utility Functions
*/

// returns the current time 
function getCurrTime() {
    let date = new Date();
    return date.getTime();
}

// returns a string describing the comparison of the two strings
function compareWords(original, userAttempt) {
    let originalWords = original.split(" ");
    let userWords = userAttempt.split(" ");
    let countCorrect = 0;
    let correctedLine = [];

    if (originalWords.length < userWords.length) {
        userWords = userWords.filter(word => word.length > 0);
    }

    originalWords.forEach((item, index) => {
        if (item == userWords[index]) {
            countCorrect += 1;
            correctedLine.push(item);
        } else {
            correctedLine.push(`<span class="wrongWord">${item}</span>`);
        }
    });

    return `<p><span class="score">${countCorrect}</span> correct out of <span class="score">${originalWords.length}</span> words.</p><p>${correctedLine.join(" ")}</p>`;
}

// returns the number of words in the string
function wordCounter(strWords) {
    return strWords.split(" ").length;
}
