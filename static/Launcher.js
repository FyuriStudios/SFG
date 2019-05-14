//for launching the game in a new window
function newGame(url) {
  window.location.replace(url);
}


let launchGif;

let loginBox = {
  "img": "",
  "width": "",
  "height": "",
  "x": "",
  "y": ""
};

let playButton = {
  "img": "",
  "width": "",
  "height": "",
  "x": "",
  "y": ""
};

/*
p5.js library uses preload setup and draw function.
preload runs first, then setup, then draw runs repeatedly.
Create canvas element in setup then use in draw.
*/

function preload() {
  //create launchGif object
  launchGif = createImg('/static/assets/launchAnimation.gif');

  //create loginBox and playButton images
  loginBox.img = loadImage('/static/assets/Login_Box.png')
  playButton.img = loadImage('/static/assets/Play_Button.png')

  //load music
  music = loadSound('/static/assets/sounds/STRUGGLE_FOR_GERA.m4a');
}

function setup() {
  launchGif.position(0, 0);
  createCanvas(innerWidth, innerHeight); //create p5.js canvas element

  music.play();
}

function draw() {
  viewBuilder ? deckBuilder() : homeScreen();
}

//if window resized change the canvas size
function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

// if mouse is clicked check if clicked on playButton. If so, start game
function mouseClicked() {
  if (mouseX > builder.x &&
    mouseX < (builder.x + builder.width) &&
    mouseY > builder.y &&
    mouseY < (builder.y + builder.height)
  )
  viewBuilder = true;
}
