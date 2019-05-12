//for launching the game in a new window
function newGame(url) {
  // var resolution = document.getElementById('resolution');
  // var value = resolution.options[resolution.selectedIndex].value;
  // console.log(value);
  let value = 1920;
  popupWindow = window.open(url, 'popUpWindow', 'height=' + value * 0.5625 + ',width=' + value + ',left=0,top=0,resizable=0,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=yes')
}


let launchVideo;

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
p5.js library uses setup and draw function.
Setup runs first then draw runs repeatedly.
Create canvas element in setup then use in draw.
*/

function setup() {
  createCanvas(innerWidth, innerHeight); //create p5.js canvas element

  //create launchVideo object and hide the dom
  launchVideo = createVideo(['/static/assets/launchAnimation.mp4']);
  launchVideo.hide();
  launchVideo.loop();

  //create loginBox and playButton images
  loginBox.img = loadImage('/static/assets/Login_Box.png')
  playButton.img = loadImage('/static/assets/Play_Button.png')
}

function draw() {
  //push/pop isolates the enclosed transformations. Scale video to the size of the window then draw it.
  push();
  scale(innerWidth / launchVideo.width, innerHeight / launchVideo.height);
  image(launchVideo, 0, 0);
  pop();

  //draw loginBox image
  loginBox.width = innerWidth / 3;
  loginBox.height = innerHeight / 2;
  loginBox.x = innerWidth - loginBox.width - (innerWidth / 30);
  loginBox.y = (innerHeight / 2) - (loginBox.height / 1.5);
  image(loginBox.img, loginBox.x, loginBox.y, loginBox.width, loginBox.height);

  //draw playButton image
  playButton.width = innerWidth / 5;
  playButton.height = innerHeight / 5;
  playButton.x = (innerWidth / 2) - (playButton.width / 2);
  playButton.y = innerHeight - (1.3 * playButton.height);
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
  )
    newGame('/static/game.html');
}
