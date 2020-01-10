/*
** Varibles
*/
let playingAudio = false; // keep track of playing status
let audioObject = new Audio();
let meterTock;

/*
** Data of episodes from https://archive.org/download/OTRR_Dragnet_Singles
*/
const dragnet = {
    "nickelplatedgun": {
        name: "Nickel Plated Gun",
        link: "Dragnet_49-06-10_002_Production_2_aka_Homicide_aka_The_Nickel_Plated_Gun.mp3",
    },
    "werewolf": {
        name: "The Werewolf",
        link: "Dragnet_49-06-17_003_Production_3_aka_The_Werewolf.mp3"
    },
    "quicktrigger": {
        name: "Quick Trigger Gun Men",
        link: "Dragnet_49-06-24_004_Production_4_aka_Homicide_aka_Quick_Trigger_Gun_Men.mp3"
    },
    "helencordaymurder": {
        name: "Helen Corday Murder",
        link: "Dragnet_49-07-07_005_The_Helen_Corday_Murder.mp3"
    },
    "redlightbandit": {
        name: "Red Light Bandit",
        link: "Dragnet_49-07-14_006_Red_Light_Bandit.mp3"
    },
    "cityhallbombing": {
        name: "Attempted City Hall Bombing",
        link: "Dragnet_49-07-21_007_Attempted_City_Hall_Bombing.mp3"
    },
    "misspersonlasky": {
        name: "Missing Persons - Juanita Lasky",
        link: "Dragnet_49-07-28_008_Missing_Persons_-_Juanita_Lasky.mp3"
    }
};
const startURL = "https://archive.org/download/OTRR_Dragnet_Singles/"; // added to the link to make a complete URL

/*
** Grab Locations
*/
let DragnetPlayPauseBtn = document.getElementById("DragnetPlayPause");
let meterDisplay = document.getElementById("trackMeter");
let DragnetImageArea = document.getElementById("DragnetImage");

/*
** Wire the events
*/
document.addEventListener("DOMContentLoaded", init);
document.getElementById("DragnetPlayPause").addEventListener("click", PlayPause);
document.getElementById("DragnetStop").addEventListener("click", StopAudio);

/*
** The init function
*/
function init() {
    for (episode in dragnet) {
        let div = document.createElement("option");
        div.innerText = dragnet[episode].name.toUpperCase();
        div.setAttribute("value", episode);
        document.querySelector("#soundSection").appendChild(div);
    };
};

/*
** Toggle button for playing and pausing the audio
*/
function PlayPause() {

    if (audioObject.paused) { // is audio Paused

        if (audioObject.src == "") { // was a audio file loaded

            let soundSelection = document.getElementById("soundSection");

            let episodeID = soundSelection.value;

            audioObject.src = startURL + dragnet[episodeID].link;

            playAudio();

            soundSelection.setAttribute("disabled", true);

        } else {
            playAudio();
        }

    } else {
        audioObject.pause();
        DragnetPlayPauseBtn.innerHTML = "Play";
    }
}

/*
** Stop the audio and reset the file
*/
function StopAudio() {
    audioObject.pause();
    audioObject = new Audio();
    DragnetPlayPauseBtn.innerHTML = "Play";
    clearInterval(meterTock);
    meterDisplay.innerHTML = `<span class="score">00:00 of 00:00</span>`;
    document.getElementById("soundSection").removeAttribute("disabled");
}

function playAudio() {
    audioObject.play();
    DragnetPlayPauseBtn.innerHTML = "Pause";

    meterTock = setInterval(() => {
        meterDisplay.innerHTML = `<span class="score">${displayTime(audioObject.currentTime)} of ${displayTime(audioObject.duration)}</span>`;

    }, 1000);
}

/*
** Clean up the time of the play to be mm:ss
*/
function displayTime(time) {
    let min = Math.floor(time / 60);
    let sec = (time % 60).toFixed(0);

    if (isNaN(min)) {
        return "Unknown";
    }

    if (sec < 10) {
        sec = "0" + sec;
    }
    return `${min}:${sec}`;
}