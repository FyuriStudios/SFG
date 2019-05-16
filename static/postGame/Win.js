function setup() {
    createCanvas(innerWidth, innerHeight);

}

function draw() {
    background(0, 200, 0);
    let fontSize = width / 20;
    textSize(fontSize);
    textFont('Georgia');
    textStyle(BOLD);
    textAlign(CENTER);
    fill(0);
    text('YOU WIN!', width / 2, (height / 2) - fontSize);
    text('PRESS ENTER TO RETURN TO LAUNCH SCREEN', width / 2, (height / 2) + fontSize);
}

//if window resized change the canvas size
function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}

function keyPressed() {
    if (keyCode == 13) {
        window.location.replace('/static/preGame/index.html');
    }
}