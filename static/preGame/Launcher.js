//for launching the game

let launchGif;
let music;

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
  loginBox.img = loadImage('/static/assets/Login_Box.png');
  playButton.img = loadImage('/static/assets/Play_Button.png');

  //load music
  music = loadSound('/static/assets/sounds/STRUGGLE_FOR_GERA.m4a');
}

function setup() {
  launchGif.position(0, 0);
  createCanvas(innerWidth, innerHeight); //create p5.js canvas element

  music.play();
}

function draw() {
  //loop sound
  if (!music.isPlaying())
    music.play();

  //draw loginBox image
  loginBox.width = innerWidth / 3;
  loginBox.height = innerHeight / 2;
  loginBox.x = innerWidth - loginBox.width - (innerWidth / 30);
  loginBox.y = (innerHeight / 1.8) - (loginBox.height / 1.3);
  image(loginBox.img, loginBox.x, loginBox.y, loginBox.width, loginBox.height);

  //draw playButton image
  playButton.width = innerWidth / 5;
  playButton.height = innerHeight / 6;
  playButton.x = loginBox.x + (loginBox.width / 2) - (playButton.width / 2);
  playButton.y = loginBox.y + (4 * loginBox.height / 5);
  image(playButton.img, playButton.x, playButton.y, playButton.width, playButton.height);
}

//if window resized change the canvas size
function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

// if mouse is clicked check if clicked on playButton. If so, start game
function mouseClicked() {
  if (mouseX > playButton.x &&
    mouseX < (playButton.x + playButton.width) &&
    mouseY > playButton.y &&
    mouseY < (playButton.y + playButton.height)
  ) {
    music.stop();
    //window.location.replace('/static/game/game.html');
    window.location.replace('/static/preGame/home.html');
  }
}

//if enter key is pressed start the game
function keyPressed() {
  if (keyCode == 13) {
    music.stop();
    //window.location.replace('/static/game/game.html');
    window.location.replace('/static/preGame/home.html');
  }
}
