//hello the better version of this code has taken over
var game;
var board;
const aspectRatio = 9/16;
const offset = 20;
const loader = PIXI.loader;
var grass = 2;

//creates a PIXI Application to draw stuff on
//renderer, ticker, stage aka container is automatically created with app
//only create this once, the app is mutated in drawBoard and only drawn to the screen in func drawboard
//I'm not sure if the redrawn board is a new node added to the end of the list though. Children pile?? :(
let app = new PIXI.Application({
    antialias: true,    // default: false
    transparent: true, // default: false
    forceCanvas: false //if set to true, prevents selection of WebGL renderer
    }
);


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

  var Graphics = new PIXI.Graphics();
  document.body.appendChild(app.view);


        // This is the board stuff that I just copied from the loader functions below. idk if it's redundant (probs) or if you need
        // the whole setting the stage width height idk anything bro but have fun kitty. -marsh

        // also this commented out line idk man
//   loader.add('/static/assets/4k-Board.png');
  board = PIXI.Sprite.fromImage('/static/assets/4k-Board.png');
  app.stage.addChild(board);

  app.stage.width = window.innerWidth;
app.stage.height = window.innerWidth*aspectRatio;
board.width = app.stage.width;
board.height = app.stage.height;
board.x = 0;
board.y = 0;

        resizeCanvas();


}
/**
 * This function is called every time that the size of the player's screen changes. It should be used to forcefully redraw the board
 * to the new dimensions of the screen.
 */
function drawBoard() {

     loader.load(function(loader, resources) {
         board = PIXI.Sprite.fromImage('/static/assets/4k-Board.png');
     });
     loader.onComplete.add(function() {
         app.stage.addChild(board);
         board.width = app.stage.width;
         board.height = app.stage.height;
         board.x = 0;
         board.y = 0;
         board.scale.x = app.stage.width/innerWidth;
         board.scale.y = app.stage.height/innerHeight;
       });

}

function resizeCanvas() {
   console.log(app.stage.width);
   console.log(app.stage.height);
   if (innerWidth * aspectRatio  <= innerHeight) {
       //oh yeah and I added this space for resizing identification purposes
    console.log(" ");
       app.stage.width = window.innerWidth;
       app.stage.height = window.innerWidth*aspectRatio;
       app.renderer.resize(app.stage.width, app.stage.height);
   } else if (innerWidth * aspectRatio > innerHeight) {
       app.stage.width = window.innerHeight/aspectRatio;
       app.stage.height = window.innerHeight;
       app.renderer.resize(app.stage.width, app.stage.height);
   }
   console.log(app.stage.width);
   console.log(app.stage.height);
   drawBoard();
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
