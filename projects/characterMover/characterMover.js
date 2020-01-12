/*
** Variables
*/
let myHero;             // stores the element with the Hero
let myPrize;            // stores the element with the prize
let myScoreBox;         // stores the element with the score box
let myFunctionList;     // stores the element with the list of functions
let funList = [];       // stores the list of functions
let heroScore = 0;      // stores the score
let heroSteps = 0;

/*
** Constants
*/
const HeroSize = 32;

/*
** Gather Locations
*/
const Arena = document.getElementById("Arena");
const messageArea = document.getElementById("messageSpace");

/*
** Add event listeners
*/
document.addEventListener("DOMContentLoaded", startGame);
document.addEventListener("keydown", handleKeystroke);

/*
** Handle start of game
*/
function startGame() {

    myHero = createCharacterBox();
    Arena.appendChild(myHero);

    myPrize = createPrize(0);
    Arena.appendChild(myPrize);

    myInfo = createBackgroundText();
    Arena.appendChild(myInfo);

    myScoreBox = createScoreBox();
    Arena.appendChild(myScoreBox);

    myFunctionList = document.createElement("div");
    Arena.appendChild(myFunctionList);
}

/*
** Handle Keystrokes
*/
function handleKeystroke(e) {
    const movementArray = ["right", "left", "up", "down"];

    // e.preventDefault();
    let keyC = e.keyCode;

    switch (keyC) {
        case 37:
            addFun("left");
            break;
        case 39:
            addFun("right");
            break;
        case 38:
            addFun("up");
            break;
        case 40:
            addFun("down");
            break;
        case 82:
            let temp = movementArray[getRandomInt(0, movementArray.length)];
            addFun(temp);
            break;
        case 13:
        case 32:
            mover();
            break;
    }
}

function mover() {
    if (funList.length > 0) {
        let commEle = funList.shift();
        let leftEl = myHero.offsetLeft;
        let topEl = myHero.offsetTop;

        let item = commEle.textContent.replace("+", "");
        myFunctionList.removeChild(commEle);

        heroSteps += 1;

        switch (item) {
            case "left":
                myHero.style.left = leftEl - HeroSize + "px";
                myHero.childNodes[0].style.backgroundPosition = "0 -32px";
                break;
            case "right":
                myHero.style.left = leftEl + HeroSize + "px";
                myHero.childNodes[0].style.backgroundPosition = "0 -64px";
                break;
            case "up":
                myHero.style.top = topEl - HeroSize + "px";
                myHero.childNodes[0].style.backgroundPosition = "0 -96px";
                break;
            case "down":
                myHero.style.top = topEl + HeroSize + "px";
                myHero.childNodes[0].style.backgroundPosition = "0 0";
                break;
        }

        checkCollision();

        setTimeout(mover, 300);
    }
    else {
        myHero.childNodes[0].style.backgroundPosition = "0 0";
        return;
    }
}

function checkCollision() {

    if (isCollide(myHero, myPrize)) {

        logMessage(`You found coins worth ${myPrize.dataset.scoreValue} gold!`);
        heroScore += parseInt(myPrize.dataset.scoreValue);  // need to convert to number

        myPrize.remove();

        myPrize = createPrize(getRandomInt(0, 4));
        Arena.appendChild(myPrize);

        myScoreBox.innerHTML = `<p>You now have <span class="score">${heroScore}</span> gold pieces.</p><p>You've taken ${heroSteps} steps to get them all.`;
    }

    function isCollide(a, b) {
        let aRect = a.getBoundingClientRect();
        let bRect = b.getBoundingClientRect();

        return !(
            ((aRect.top + aRect.height) < (bRect.top)) ||
            (aRect.top > (bRect.top + bRect.height)) ||
            ((aRect.left + aRect.width) < bRect.left) ||
            (aRect.left > (bRect.left + bRect.width))
        );
    }
}

function addFun(val) {

    let span = createFunItem(val);

    span.addEventListener("mouseover", function () {
        this.style.backgroundColor = "red";
        this.style.color = "white";
    });

    span.addEventListener("mouseout", function () {
        this.style.backgroundColor = "";
        this.style.color = "black";
    });

    span.addEventListener("click", function () {
        let curIndex = funList.indexOf(this);
        let tempRemove = funList.splice(curIndex, 1);
        myFunctionList.removeChild(this);
    });

    myFunctionList.appendChild(span);
    funList.push(span);
}

/*
** Create Elements
*/
// Returns an element to store the list of functions
function createFunItem(val) {
    let span = document.createElement("span");
    span.textContent = `+${val}`;
    span.style.padding = "10px";
    span.style.border = "1px solid #ddd";
    return span;
}

// Return an Element with the Character inside
function createCharacterBox() {
    let ele = document.createElement("div");
    ele.style.width = `${HeroSize}px`;
    ele.style.height = `${HeroSize}px`;
    ele.style.textAlign = "center";
    ele.style.position = "absolute";
    ele.style.transition = "all 1s";
    ele.style.transform = "scale(2)";

    ele.style.top = "100px";
    ele.style.left = "100px";
    ele.style.padding = "0";
    ele.style.margin = "0";

    ele.appendChild(createCharacterImage());

    return ele;
}

// Return an Element for the Character Image
function createCharacterImage() {
    let ele = document.createElement("div");
    ele.style.backgroundImage = `url("./media/$Lanto(8).png")`;
    ele.style.width = `${HeroSize}px`;
    ele.style.height = `${HeroSize}px`;
    ele.style.textAlign = "center";
    ele.style.position = "absolute";
    ele.style.transition = "all 1s step";

    ele.style.padding = "0";
    ele.style.margin = "0";
    ele.style.top = "0";
    ele.style.left = "0";

    return ele;
}

// Return an Element with the Prize Image
function createPrize(num) {

    let [column, row] = getSpriteSpot(num);

    let ele = document.createElement("div");
    ele.id = "prize";
    ele.dataset.scoreValue = `${getRandomInt(1, ((num + 1) * 100))}`;

    ele.style.backgroundImage = `url("./media/1_Transparent_Icons.png")`;

    ele.style.backgroundPosition = `${column * (-32)}px ${row * (-32)}px`;
    ele.style.width = `${HeroSize}px`;
    ele.style.height = `${HeroSize}px`;
    ele.style.lineHeight = "100px";
    ele.style.textAlign = "center";
    ele.style.position = "absolute";

    ele.style.top = `${getRandomInt(1, 400)}px`;
    ele.style.left = `${getRandomInt(1, 400)}px`;

    return ele;

    function getSpriteSpot(num) {
        let sprites = {
            "singleCoin": [7, 12],
            "copperCoins": [8, 12],
            "silverCoins": [9, 12],
            "goldCoins": [10, 12],
        }
        return sprites[Object.keys(sprites)[num]];
    }
}

function createBackgroundText() {
    let backgroundInfo = document.createElement("div");
    backgroundInfo.style.textAlign = "center";
    backgroundInfo.style.fontWeight = "bold";
    backgroundInfo.style.backgroundColor = "rgba(222,222,222,0.2)";
    backgroundInfo.style.width = "75%";
    backgroundInfo.style.margin = "0 auto";
    backgroundInfo.style.fontSize = "1.4em";

    let title = document.createElement("h3");
    title.innerText = "Character Mover";

    let line1 = document.createElement("p");
    let line2 = document.createElement("p");
    let line3 = document.createElement("p");
    let line4 = document.createElement("p");
    let line5 = document.createElement("p");

    line1.innerText = "Use the Arrow Keys to load up directions for her to move";
    line2.innerText = "Click on a direction to remove from the list.";
    line3.innerText = "Press space or Enter to begin moving";
    line4.innerHTML = `The Hero Sprite was made by <a href="https://lanto.itch.io/">Lanto (SinisterMuffin)`;
    line5.innerHTML = `The coin Sprites were made by <a href="https://shikashiassets.itch.io/">Shikashi Assets</a>`

    backgroundInfo.appendChild(title);
    backgroundInfo.appendChild(line1);
    backgroundInfo.appendChild(line2);
    backgroundInfo.appendChild(line3);
    backgroundInfo.appendChild(line4);
    backgroundInfo.appendChild(line5);

    return backgroundInfo;
}

// Returns an Element for the Score box
function createScoreBox() {
    let ele = document.createElement("div");
    ele.style.backgroundColor = "rgba(222,222,222,0.3)";
    ele.style.width = "45%";
    ele.style.borderRadius = "0 50% 50% 0";

    ele.id = "arenaScoreBox";
    return ele;
}

/*
** Utility functions
*/
// Return an Integer between min and mox
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Outputs a message in upper corner
function logMessage(message) {
    messageArea.style.display = 'block';
    messageArea.innerHTML = `${name}${name == "" ? "" : ", "} ${message}`;

    setInterval(() => {
        messageArea.style.display = 'none';
    }, 2000)
}
