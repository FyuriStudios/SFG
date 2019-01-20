//hello mobamba has taken over
var game;
var board;
const aspectRatio = 9/16;
const offset = 40;
var weed = 420;

//creates a PIXI Application to draw stuff on
//renderer, ticker, stage aka container is automatically created with app
//only create this once, the app is mutated in drawBoard and only drawn to the screen in func drawboard
//I'm not sure if the redrawn board is a new node added to the end of the list though. Children pile?? :(
let app = new PIXI.Application(
    {
    antialias: true,    // default: false
    transparent: true, // default: false
    forceCanvas: false //if set to true, prevents selection of WebGL renderer
    }
);


function init() {

    document.body.appendChild(app.view);

    board = PIXI.Sprite.fromImage('/static/assets/4k-Board.png');
    app.stage.addChild(board);

    app.stage.width = window.innerWidth;
    app.stage.height = window.innerWidth*aspectRatio;
    board.width = app.stage.width;
    board.height = app.stage.height;

    board.anchor.set(.5,.5);//center the anchor of the board image

    resizeCanvas();


}

 
function resizeCanvas() {
    app.stage.height = (innerWidth * aspectRatio) - offset;
    app.stage.width = innerWidth - offset;
    app.renderer.resize(app.stage.width, app.stage.height);
//    if (innerWidth * aspectRatio  <= innerHeight) {
//        app.stage.width = window.innerWidth;
//        app.stage.height = window.innerWidth*aspectRatio;
//        app.renderer.resize(app.stage.width, app.stage.height);
//    } else if (innerWidth * aspectRatio > innerHeight) {
//        app.stage.width = window.innerHeight/aspectRatio;
//        app.stage.height = window.innerHeight;
//        app.renderer.resize(app.stage.width, app.stage.height);
//    }
    board.width = app.stage.width;
    board.height = app.stage.height;
    board.x = window.innerWidth/2;
    board.y = window.innerHeight/2 + (offset/2);
    // board.scale.x = app.stage.width/innerWidth;
    // board.scale.y = app.stage.height/innerHeight;
}





//var socket = io() KEEP THIS CODE HERE

//var playerID

//var self

//var other

//var turnCounter

//socket.on('player id', (id) => {playerID = id})

//socket.on('game state', (input) => {
//self = input.self
//other = input.other
//turnCounter = input.gameCounter
//gameUpdate()
//})

//function gameUpdate() {

//}
