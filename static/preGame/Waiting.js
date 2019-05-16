/*
p5.js library uses preload setup and draw function.
preload runs first, then setup, then draw runs repeatedly.
Create canvas element in setup then use in draw.
*/

let beginTime; //keep track of time elapsed until game begins
let gameStarting = false;
let music;

var waitGameImage;
var waitPlayersImage;
var waitGif;

function preload() {
    //create launchGif object
    waitGif = createImg('/static/assets/launchAnimation.gif');
    waitGameImage = createImg('/static/assets/WaitGameImage.png');
    waitPlayersImage = createImg('/static/assets/WaitPlayersImage.png');

    //load music
    music = loadSound('/static/assets/sounds/STRUGGLE_FOR_GERA.m4a');

    //load font
    timeFont = loadFont('/static/assets/fonts/Piedra-Regular.ttf');
}

function setup() {
    waitGif.position(0, 0);
    waitGameImage.position(0, 0);
    waitGameImage.hide();
    waitPlayersImage.position(0, 0);

    createCanvas(innerWidth, innerHeight); //create p5.js canvas element

    beginTime = floor((new Date).getTime() / 1000);

    music.play();
}

function draw() {
    //loop sound
    if (!music.isPlaying())
        music.play();

    clear();

    if (gameStarting) {
        fill(200, 0, 0);
        waitPlayersImage.remove();
        waitGameImage.show();
        music.stop();
        noLoop();
    } else {
        let currentTime = floor((new Date).getTime() / 1000);
        let timeElapsed = currentTime - beginTime;

        fill(255);
        let fontSize = width / 13;
        textSize(fontSize);
        textFont(timeFont);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        stroke(0);
        strokeWeight(fontSize / 20);
        text(timeElapsed + "s", (width / 2) + (3 * width / 13), (height / 2) + (5 * height / 23));
    }
}

//if window resized change the canvas size
function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}