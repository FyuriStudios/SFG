//for launching the game

let launchGif;
let music;

let textDiv = {
    "div": "",
    "width": "",
    "height": "",
    "x": "",
    "y": ""
};

let useButton = {
    "img": "",
    "width": "",
    "height": "",
    "x": "",
    "y": ""
};

let buildButton = {
    "img": "",
    "width": "",
    "height": "",
    "x": "",
    "y": ""
};

let textBox;

let font;

let pasteText = "PASTE A DECK";

/*
p5.js library uses preload setup and draw function.
preload runs first, then setup, then draw runs repeatedly.
Create canvas element in setup then use in draw.
*/

function preload() {
    //create launchGif object
    launchGif = createImg('/static/assets/launchAnimation.gif');

    //create textBox
    textDiv.div = createDiv();
    textBox = createElement('textarea');
    textBox.parent(textDiv.div);
    textBox.id('textBox');

    //create useButton object
    useButton.img = createImg('/static/assets/useButton.png');
    useButton.img.hide();

    //load music
    music = loadSound('/static/assets/sounds/STRUGGLE_FOR_GERA.m4a');

    //load font
    font = loadFont('/static/assets/fonts/Piedra-Regular.ttf');
}

function setup() {
    launchGif.position(0, 0);
    launchGif.class('backImage');
    createCanvas(innerWidth, innerHeight); //create p5.js canvas element

    music.play();

    textFont(font);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    stroke(255);
}

function draw() {
    clear();

    //loop sound
    if (!music.isPlaying())
        music.play();

    let fontSize = width / 15;
    strokeWeight(fontSize / 20);
    fill(150, 60, 30);
    textSize(fontSize);
    text("HOME", innerWidth / 2, innerHeight / 12);

    fontSize = width / 25;
    strokeWeight(fontSize / 20);
    fill(255, 60, 60);
    textSize(fontSize);
    text(pasteText, innerWidth / 4, innerHeight / 5);

    fontSize = width / 25;
    strokeWeight(fontSize / 20);
    fill(255, 60, 60);
    textSize(fontSize);
    text("BUILD NEW DECK", 3 * innerWidth / 4, innerHeight / 5);

    fontSize = width / 25;
    strokeWeight(fontSize / 20);
    fill(255, 60, 60);
    textSize(fontSize);
    text("PRESS ENTER FOR RANDOM DECK", innerWidth / 2, 10 * innerHeight / 11);

    //draw useButton image
    useButton.width = innerWidth / 4;
    useButton.height = innerHeight / 5;
    useButton.x = innerWidth / 4;
    useButton.y = 19 * innerHeight / 25;
    push();
    imageMode(CENTER);
    image(useButton.img, useButton.x, useButton.y, useButton.width, useButton.height);
    pop();

    //draw textBox
    textDiv.width = innerWidth / 3;
    textDiv.height = 4 * innerHeight / 10;
    textDiv.x = innerWidth / 12;
    textDiv.y = innerHeight / 4;
    textDiv.div.size(textDiv.width, textDiv.height);
    textDiv.div.position(textDiv.x, textDiv.y);
    //image(loginBox.img, loginBox.x, loginBox.y, loginBox.width, loginBox.height);
}

//if window resized change the canvas size
function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}

// if mouse is clicked check if clicked on playButton. If so, start game
function mouseClicked() {
    if (mouseX > (useButton.x - useButton.width / 2) &&
        mouseX < (useButton.x + useButton.width / 2) &&
        mouseY > (useButton.y - useButton.height / 2) &&
        mouseY < (useButton.y + useButton.height / 2)
    ) {
        var box = document.getElementById('textBox');
        box.select();
        document.execCommand('copy');
        if(textToDeck(box.value) == "bad")
            pasteText = "BAD DECK";
    }
}

//if enter key is pressed use random deck
function keyPressed() {
    if (keyCode == 13) {
        textToDeck("random");
    }
  }