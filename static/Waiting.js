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

function preload() {
    //create launchGif object
    waitGif = createImg('/static/assets/launchAnimation.gif');
    waitGameImage = createImg('/static/assets/waitGameImage.png');
    waitPlayersImage = createImg('/static/assets/waitPlayerImage.png');

    //load music
    music = loadSound('/static/assets/sounds/STRUGGLE_FOR_GERA.m4a');

    //load font
    timeFont = loadFont('/assets/fonts/Piedra-Regular.ttf')
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
        //text('GAME IS STARTING', width / 2, height / 2);
        waitGif.remove();
        waitPlayersImage.remove();
        waitGameImage.show();
        music.stop();
        remove();
        noLoop();
    } else {
        let currentTime = floor((new Date).getTime() / 1000);
        let timeElapsed = currentTime - beginTime;

        fill(0);
        let fontSize = width / 20;
        textSize(fontSize);
        textFont(timeFont);
        textStyle(BOLD);
        textAlign(CENTER);
        text(timeElapsed, width / 2, (height / 2) + fontSize);
    }
}

//if window resized change the canvas size
function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}