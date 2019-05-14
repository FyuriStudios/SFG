/*
p5.js library uses preload setup and draw function.
preload runs first, then setup, then draw runs repeatedly.
Create canvas element in setup then use in draw.
*/

let beginTime; //keep track of time elapsed until game begins
let gameStarting = false;

function preload() {
    //create launchGif object
    waitGif = createImg('/static/assets/launchAnimation.gif');

    //load music
    music = loadSound('/static/assets/sounds/STRUGGLE_FOR_GERA.m4a');
}

function setup() {
    waitGif.position(0, 0);
    createCanvas(innerWidth, innerHeight); //create p5.js canvas element

    beginTime = floor((new Date).getTime() / 1000);

    music.play();
}

function draw() {
    //loop sound
    if(!music.isPlaying())
      music.play();

    clear();

    let fontSize = width / 20;
    textSize(fontSize);
    textFont('Georgia');
    textStyle(BOLD);
    textAlign(CENTER);

    if (gameStarting) {
        fill(200, 0, 0);
        text('GAME IS STARTING', width / 2, height / 2);
        waitGif.remove();
        music.stop();
        noLoop();
    } else {
        let currentTime = floor((new Date).getTime() / 1000);
        let timeElapsed = currentTime - beginTime;

        fill(0);
        text('WAITING FOR OTHER PLAYER', width / 2, (height / 2) - fontSize);
        text('TIME ELAPSED: ' + timeElapsed + ' SEC', width / 2, (height / 2) + fontSize);
    }

}

//if window resized change the canvas size
function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}
