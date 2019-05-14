let viewBuilder = false;

function preload() {}

function setup() {
    createCanvas(innerWidth, innerHeight); //create p5.js canvas element
}

function draw() {
    viewBuilder ? deckBuilder() : homeScreen();
}

//if window resized change the canvas size
function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}

function mouseClicked() {
    if (mouseX > builder.x &&
        mouseX < (builder.x + builder.width) &&
        mouseY > builder.y &&
        mouseY < (builder.y + builder.height)
    )
    viewBuilder = true;
}