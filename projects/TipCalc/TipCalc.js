/*
** Select elements
*/
let costEle = document.getElementById("cost");
let roundUpEle = document.getElementById("doRoundUp");
let tipRateEle = document.getElementById("tipRate");
let resultsEle = document.getElementById("results");
let messageArea = document.getElementById('messageSpace');

/**
 * Add Event Listenter
 */
document.getElementById("btnCompute").addEventListener("click", computehandler);

/**
 * Init Function
 */
(function () {
    showTipResults('Enter an amount to determine the top and total.');
})();

/**
 * Event Handler Function
 */
// Compute Tip handler
function computehandler() {
    let cost = Number(costEle.value);
    let isRoundUp = roundUpEle.checked;
    let tipRate = Number(tipRateEle.options[tipRateEle.selectedIndex].value);

    if (!valid(cost)) {
        logMessage(`Please enter a price larger then zero`);
        return 0;
    }

    let tip = computeTip(cost, isRoundUp, tipRate);

    showTipResults(`You should leave a tip of $${tip.toFixed(2)} for a total of $${(tip + cost).toFixed(2)}.`);
};

/**
 * Utility Functions
 */
// Checks if the cost submitted is valid
// returns True if it is and false if not
function valid(cost) {
    if (cost <= 0) {
        return false;
    }
    return true;
}

// Outputs tip results message
function showTipResults(message) {
    resultsEle.innerHTML = `${name}${name == "" ? "" : ", "} ${message}`;
};

// Computes the tip
function computeTip(cost, isRoundUp, tipRate) {
    let tip = cost * (tipRate / 100);

    if (isRoundUp) {
        tempTot = Math.ceil(tip + cost);

        tip = tempTot - cost;
    }
    return tip;
}

// Using a polyfill to fix a toFix issue with the penny
(1.005).toFixed(2) == "1.01" || (function (prototype) {
    var toFixed = prototype.toFixed

    prototype.toFixed = function (fractionDigits) {
        var split = this.toString().split('.')
        var number = +(!split[1] ? split[0] : split.join('.') + '1')

        return toFixed.call(number, fractionDigits)
    }
}(Number.prototype));