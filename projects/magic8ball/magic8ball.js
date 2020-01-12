const answerArray = [
    "It will work",
    "Maybe maybe not",
    "Probably Not",
    "Highly Likely",
    "I don't know",
    "No",
    "Yes",
    "That's crazy"
];
const question = document.querySelector("input");
const MagicCanvas = document.getElementById("MagicCanvas");

document.getElementById("btnMagic8Ball").addEventListener("click", shakeTheBall);

// Init function
(function () {
    drawMagic8Ball();
})();


function shakeTheBall() {
    let res = Math.floor(Math.random() * answerArray.length);
    drawMagic8Ball(answerArray[res]);
}

function drawMagic8Ball(message = "Hi!") {
    if (MagicCanvas.getContext) {
        let ctx = MagicCanvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(200, 200, 200, 0, Math.PI * 2); // Outer circle
        ctx.fillStyle = "#dddddd";
        ctx.fill();
        ctx.lineWidth = 0;
        ctx.stroke();

        ctx.moveTo(125, 100);
        ctx.lineTo(60, 200);
        ctx.lineTo(190, 200);
        ctx.closePath();

        // the outline
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // the fill color
        ctx.fillStyle = "#222222";
        ctx.fill();

        ctx.font = '16px Cabin';
        ctx.textAlign = "center";

        if (message.length > 8) {
            words = message.split(" ");
            console.log(words);
            ctx.fillText(words.shift(), 125, 168);
            ctx.fillText(words.join(" "), 125, 187);
        } else {
            ctx.fillText(message, 125, 180);
        }

        // ctx.fillText(message, 125, 180);
    }
};