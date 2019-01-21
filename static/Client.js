//hello the better version of this code has taken over
var game;
var board;
const aspectRatio = 9/16;
const offset = 20;
const loader = PIXI.loader;
var grass = 420;

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

//these functions are for dragging and dropping. We'll mess with these later to work in the context of the game
function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd()
{
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        console.log(this.data.getLocalPosition(this.parent));
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
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



  document.body.appendChild(app.view);


  // This is the board stuff that I just copied from the loader functions below. idk if it's redundant (probs) or if you need
  // the whole setting the stage width height idk anything bro but have fun kitty. -marsh
  // also this commented out line idk man
  // loader.add('/static/assets/4k-Board.png');
  board = PIXI.Sprite.fromImage('/static/assets/4k-Board.png');

  app.stage.addChild(board);

  app.stage.width = window.innerWidth;
  app.stage.height = window.innerWidth*aspectRatio;
  board.width = app.stage.width;
  board.height = app.stage.height;
  board.x = 0;
  board.y = 0;

  addCard('Darfler');

  resizeCanvas();
  drawDeck();
}

function addCard(name) {
 let testCard = PIXI.Sprite.fromImage('/static/assets/cards/'+ name +'.png');
 app.stage.addChild(testCard);
 testCard.anchor.x = .5;
 testCard.anchor.y = .5;
 testCard.scale.x = .25;
 testCard.scale.y = .25;
 testCard.interactive = true;
 testCard.buttonMode = true;
 //setup events
  testCard
  // events for drag start
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
  // events for drag end
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
  // events for drag move
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);
 }

function drawDeck() {
  const Deck = new PIXI.Graphics();
  Deck.beginFill(0x000000);
  Deck.drawRect(
  app.stage.width*0.0150084779440986,
  app.stage.height*0.8929855010660981,
  app.stage.width*0.0995547441364606,
  app.stage.height*0.2568144989339019);
  app.stage.addChild(Deck);
}
/**
 * This function is called every time that the size of the player's screen changes. It should be used to forcefully redraw the board
 * to the new dimensions of the screen.
 */
function resizeCanvas() {
   console.log(app.stage.width);
   console.log(app.stage.height);
   //removes everything to redraw later
   if (innerWidth * aspectRatio  <= innerHeight) {
       //oh yeah and I added this space for resizing identification purposes
       app.stage.width = innerWidth;
       app.stage.height = innerWidth*aspectRatio;
       app.renderer.resize(app.stage.width, app.stage.height);
   } else if (innerWidth * aspectRatio > innerHeight) {
       app.stage.width = window.innerHeight/aspectRatio;
       app.stage.height = window.innerHeight;
       app.renderer.resize(app.stage.width, app.stage.height);
   }
}

app.ticker.add(()=>{

});

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
