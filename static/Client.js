//hello marshmallow has taken over
var game;

const aspectRatio = 9/16;
const offset = 20;

var grass = 2;

//creates a PIXI Application to draw stuff on
//renderer, ticker, stage aka container is automatically created with app
//only create this once, the app is mutated in resizeCanvas and only drawn to the screen in func drawboard
//I'm not sure if the redrawn board is a new node added to the end of the list though. Children pile?? :(
let app = new PIXI.Application({
    antialias: true,    // default: false
    transparent: true, // default: false
    forceCanvas: false //if set to true, prevents selection of WebGL renderer
    }
);

/**
 * This function is called every time that the size of the player's screen changes. It should be used to forcefully redraw the board
 * to the new dimensions of the screen.
 */
function resizeCanvas() {

    //makes app rectangle fill bright blue (change transparent to false)
    // app.renderer.backgroundColor = 0x42a7f4;

    //now obsolete but in case you still want the random rectangle
    // var canvas = document.getElementById('canvas');



    //I subtracted 20 so you can now see the outside lines of the board when you're resizing. Open to changes in offset.
    if (innerWidth * aspectRatio  <= innerHeight) {
        app.renderer.resize(innerWidth - offset, innerWidth*aspectRatio - offset);
    } else if (innerWidth * aspectRatio  > innerHeight) {
        app.renderer.resize(innerHeight/aspectRatio - offset, innerHeight - offset);
    }

    //centers the main canvas
    //lmao it took way too long for me to figure out position mutation
    //need to subtract offset/4 to account for the resize offset
    app.renderer.view.style.left = (innerWidth - app.renderer.width)/2 - offset/4;
    app.renderer.view.style.top = (innerHeight - app.renderer.height)/2 - offset/4;
}

function init() {

//    var socket = io(); //initialize the socket connection
//    socket.emit('connected', {}); //TODO: input your deck and hero here
//
//    socket.on('init', function(info) {
//	 game = new Game(info.thisPlayer, info.otherPlayer);//TODO: we need a fancy game starting animation here, also I don't think this import works
//    });
//
//    socket.on('update', function(info) {
//
//    });

  //initialize game objects here

    var board;

    resizeCanvas();
    var friend = new PIXI.Graphics();
    document.body.appendChild(app.view);

    let loader = PIXI.loader;

    loader.add('/static/assets/numbers/Power-00.png');

    loader.load(function(loader, resources) {
        board = PIXI.Sprite.fromImage('/static/assets/numbers/Power-00.png');
    });

    loader.onComplete.add(function() {
        app.stage.addChild(board);
        board.width = innerWidth - offset;
        board.height = innerHeight - offset;
        board.x = offset/2;
        board.y = offset/2;
    });
}



//var socket = io()

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
