//for launching the game

let launchGif;
let music;

let deckWord = "DECK";

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
    "x": "",
    "y": ""
};

let character = {
    "yakov": {
        "img": "",
        "x": "",
        "y": ""
    },
    "rinwald": {
        "img": "",
        "x": "",
        "y": ""
    },
    "caius": {
        "img": "",
        "x": "",
        "y": ""
    },
    "lorewell": {
        "img": "",
        "x": "",
        "y": ""
    },
    "ignea": {
        "img": "",
        "x": "",
        "y": ""
    },
    "width": "",
    "height": ""
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
    useButton.img0 = createImg('/static/assets/useButton.png');
    useButton.img0.hide();
    useButton.img1 = createImg('/static/assets/useButtonHover.png');
    useButton.img1.hide();

    //create characters' images
    character.caius.img = createImg('/static/assets/caius.png');
    character.caius.img.hide();
    character.yakov.img = createImg('/static/assets/yakov.png');
    character.yakov.img.hide();
    character.lorewell.img = createImg('/static/assets/lorewell.png');
    character.lorewell.img.hide();
    character.rinwald.img = createImg('/static/assets/rinwald.png');
    character.rinwald.img.hide();
    character.ignea.img = createImg('/static/assets/ignea.png');
    character.ignea.img.hide();

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


    pasteText = pasteText.substr(0, pasteText.length - 4) + deckWord;

    //loop sound
    if (!music.isPlaying())
        music.play();

    let fontSize = width / 15;
    strokeWeight(fontSize / 20);
    fill(150, 60, 30);
    textSize(fontSize);
    text("HOME", innerWidth / 2, innerHeight / 12);

    fontSize = width / 30;
    strokeWeight(fontSize / 20);
    fill(255, 60, 60);
    textSize(fontSize);
    text(pasteText, innerWidth / 4, innerHeight / 5);

    fontSize = width / 30;
    strokeWeight(fontSize / 20);
    fill(255, 60, 60);
    textSize(fontSize);
    text("BUILD NEW " + deckWord, 3 * innerWidth / 4, innerHeight / 5);

    fontSize = width / 30;
    strokeWeight(fontSize / 20);
    fill(60, 180, 60);
    textSize(fontSize);
    text("PRESS 'ENTER' TO USE A RANDOM " + deckWord, innerWidth / 2, 10 * innerHeight / 11);

    //draw useButton image
    useButton.width = innerWidth / 6;
    useButton.height = innerHeight / 5;
    useButton.x = innerWidth / 4;
    useButton.y = 19 * innerHeight / 25;
    push();
    imageMode(CENTER);
    if (mouseIsOver())
        image(useButton.img1, useButton.x, useButton.y, useButton.width, useButton.height);
    else
        image(useButton.img0, useButton.x, useButton.y, useButton.width, useButton.height);
    pop();

    //draw textBox
    textDiv.width = innerWidth / 3;
    textDiv.height = 4 * innerHeight / 10;
    textDiv.x = innerWidth / 12;
    textDiv.y = innerHeight / 4;
    textDiv.div.size(textDiv.width, textDiv.height);
    textDiv.div.position(textDiv.x, textDiv.y);
    document.getElementById('textBox').style.fontSize = (width / 30).toString(10) + "px";

    //drawCharacters
    drawCharacters();
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
        alert("Deck copied to clipboard");
        if (textToDeck(box.value) == "bad")
            pasteText = "BAD " + deckWord;
        return;
    }

    // switch (characterPressed()) {
    //     case "ignea":
    //         localStorage.setItem("character", "ignea");
    //         window.location.replace('/static/preGame/Deckbuilder.html');
    //         break;

    //     case "lorewell":
    //         localStorage.setItem("character", "lorewell");
    //         window.location.replace('/static/preGame/Deckbuilder.html');
    //         break;

    //     case "caius":
    //         localStorage.setItem("character", "caius");
    //         window.location.replace('/static/preGame/Deckbuilder.html');
    //         break;

    //     case "yakov":
    //         localStorage.setItem("character", "yakov");
    //         window.location.replace('/static/preGame/Deckbuilder.html');
    //         break;

    //     case "rinwald":
    //         localStorage.setItem("character", "rinwald");
    //         window.location.replace('/static/preGame/Deckbuilder.html');
    //         break;

    //     default:
    //         return;
    // }

    deckWord = deckWord == "DECK" ? "DICK" : "DECK";
}

//if enter key is pressed use random deck
function keyPressed() {
    if (keyCode == 13) {
        textToDeck("random");
    }
}

function mouseIsOver() {
    if (mouseX > (useButton.x - useButton.width / 2) &&
        mouseX < (useButton.x + useButton.width / 2) &&
        mouseY > (useButton.y - useButton.height / 2) &&
        mouseY < (useButton.y + useButton.height / 2)
    )
        return true;

    return false;
}

function drawCharacters() {
    character.width = width / 11;
    character.height = 2 * height / 11;

    character.ignea.x = 32.5 * width / 50;
    character.ignea.y = height / 4;
    character.lorewell.x = 32.5 * width / 50;
    character.lorewell.y = (height / 4) + (height / 5);
    character.yakov.x = 32.5 * width / 50;
    character.yakov.y = (height / 4) + 2 * (height / 5);
    character.caius.x = (42.5 * width / 50) - character.width;
    character.caius.y = height / 4;
    character.rinwald.x = (42.5 * width / 50) - character.width;
    character.rinwald.y = (height / 4) + (height / 5);


    image(character.ignea.img, character.ignea.x, character.ignea.y, character.width, character.height);
    image(character.lorewell.img, character.lorewell.x, character.lorewell.y, character.width, character.height);
    image(character.yakov.img, character.yakov.x, character.yakov.y, character.width, character.height);
    image(character.caius.img, character.caius.x, character.caius.y, character.width, character.height);
    image(character.rinwald.img, character.rinwald.x, character.rinwald.y, character.width, character.height);
}

function characterPressed() {
    if (mouseX > (character.ignea.x - character.width / 2) &&
        mouseX < (character.ignea.x + character.width / 2) &&
        mouseY > (character.ignea.y - character.height / 2) &&
        mouseY < (character.ignea.y + character.height / 2)
    )
        return "ignea";

    if (mouseX > (character.lorewell.x - character.width / 2) &&
        mouseX < (character.lorewell.x + character.width / 2) &&
        mouseY > (character.lorewell.y - character.height / 2) &&
        mouseY < (character.lorewell.y + character.height / 2)
    )
        return "lorewell";

    if (mouseX > (character.yakov.x - character.width / 2) &&
        mouseX < (character.yakov.x + character.width / 2) &&
        mouseY > (character.yakov.y - character.height / 2) &&
        mouseY < (character.yakov.y + character.height / 2)
    )
        return "yakov";

    if (mouseX > (character.caius.x - character.width / 2) &&
        mouseX < (character.caius.x + character.width / 2) &&
        mouseY > (character.caius.y - character.height / 2) &&
        mouseY < (character.caius.y + character.height / 2)
    )
        return "caius";

    if (mouseX > (character.rinwald.x - character.width / 2) &&
        mouseX < (character.rinwald.x + character.width / 2) &&
        mouseY > (character.rinwald.y - character.height / 2) &&
        mouseY < (character.rinwald.y + character.height / 2)
    )
        return "rinwald";

    return "none";
}