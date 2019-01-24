//hello the better version of this code has taken over
var game;
var board;
const aspectRatio = 9/16;
const offset = 20;
const loader = PIXI.loader;
var marijuana = 420;
var queue = [];
var cardNum
//creates a PIXI Application to draw stuff on
//renderer, ticker, stage aka container is automatically created with app
//only create this once, the app is mutated in drawBoard and only drawn to the screen in func drawboard
//I'm not sure if the redrawn board is a new node added to the end of the list though. Children pile?? :(

let ClickEventShapes = new PIXI.Container();
let PlayerCards = new PIXI.Container();
let EnemyCards = new PIXI.Container();
let app = new PIXI.Application({
    antialias: true,    // default: false
    transparent: true, // default: false
    forceCanvas: false //if set to true, prevents selection of WebGL renderer
    }
);

function bringToFront(sprite, parent)
{
var sprite = (typeof(sprite) != "undefined") ? sprite.target || sprite : this;var parent = parent || sprite.parent || {"children": false};
  if (parent.children) {
    for (var keyIndex in sprite.parent.children) {
      if (sprite.parent.children[keyIndex] === sprite) {
        sprite.parent.children.splice(keyIndex, 1);
        break;
      }
    }
    parent.children.push(sprite);
  }
}
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
function AnimateReq(child, x2, y2, t){
  this.child = child;
  this.x2 = x2;
  this.y2 = y2;
  this.t = t;
  this.x1 = child.x
  this.y1 = child.y
}
function addToQueue(child, x, y, t) {
  var Request = new AnimateReq(child, x, y, t)
  queue.push(Request);
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

  //PIXI.sound.add(cardFlip, '/static/assets/sounds/cardFlip.{ogg,mp3}');

  document.body.appendChild(app.view);


  // This is the board stuff that I just copied from the loader functions below. idk if it's redundant (probs) or if you need
  // the whole setting the stage width height idk anything bro but have fun kitty. -marsh
  // also this commented out line idk man
  // loader.add('/static/assets/4k-Board.png');
  board = PIXI.Sprite.fromImage('/static/assets/4k-Board.png');
  app.stage.addChild(board);
  app.stage.addChild(ClickEventShapes);
  app.stage.addChild(PlayerCards);
  app.stage.addChild(EnemyCards);

  app.stage.width = window.innerWidth;
  app.stage.height = window.innerHeight;
  board.width = app.stage.width;
  board.height = app.stage.height;
  board.x = 0;
  board.y = 0;



  resizeCanvas();
  drawDeck();
}

function addCard(cardName) {
 let testCard = PIXI.Sprite.fromImage('/static/assets/cards/'+cardName+'.png');
 PlayerCards.addChild(testCard);
 //PIXI.sound.play('cardFlip');
 testCard.scale.x = (app.stage.width*0.086) / 750;
 testCard.scale.y = (app.stage.height*0.225) / 1050;
 testCard.x = app.stage.width*0.0565;
 testCard.y = app.stage.height*0.885;
 testCard.anchor.x = .5;
 testCard.anchor.y = .5;

 //animation of cards to hand
 let cardNum = PlayerCards.children.length;
addToQueue(PlayerCards.children[cardNum - 1], 0, 0, 0.1);
 //(app.stage.width*0.4161780383795311) * ((10 - (PlayerCards.children.length - 1)) / 10)

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
    .on('touchmove', onDragMove)


}

function drawDeck() {
  const Deck = new PIXI.Graphics();
  Deck.beginFill(0x000000);
  Deck.drawRect(
  app.stage.width*0.0132,
  app.stage.height*0.775,
  app.stage.width*0.086,
  app.stage.height*0.225);
  ClickEventShapes.addChild(Deck);
  Deck.alpha = 0.5;
  Deck.interactive = true;
  Deck.buttonMode = true;
  Deck.on('pointerdown', event =>{
    addCard('Darfler');
  })
}
/**
 * This function is called every time that the size of the player's screen changes. It should be used to forcefully redraw the board
 * to the new dimensions of the screen.
 */
function resizeCanvas() {
  console.log(app.stage.width);
  console.log(app.stage.height);
   //removes everything to redraw later
   /*
   if (innerWidth * aspectRatio  <= innerHeight) {
       //oh yeah and I added this space for resizing identification purposes
       app.stage.width = innerWidth;
       app.stage.height = innerWidth*aspectRatio;
       app.renderer.resize(app.stage.width, app.stage.height);
       app.stage.x = 0;
       app.stage.y = (innerHeight - app.stage.height) / 2;
   } else if (innerWidth * aspectRatio > innerHeight) {
       app.stage.width = window.innerHeight/aspectRatio;
       app.stage.height = window.innerHeight;
       app.renderer.resize(app.stage.width, app.stage.height);
       app.stage.x = (innerWidth - app.stage.width) / 2;
       app.stage.y = 0;
   }
   */
   app.stage.width = innerWidth;
   app.stage.height = innerHeight;
   app.renderer.resize(app.stage.width, app.stage.height);
   console.log(app.stage.width);
   console.log(app.stage.height);
}

app.ticker.add(()=>{
  let FPS = app.ticker.FPS
  if (queue.length > 0) {

  for (let i = 0; i < queue.length; i++) {
    let dx = queue[i].x2 - queue[i].x1
    let dy = queue[i].y2 - queue[i].y1
    if (Math.round(queue[i].child.x) == Math.round(queue[i].x2) && Math.round(queue[i].child.y) == Math.round(queue[i].y2)) {
      queue[i].child.x = queue[i].x2;
      queue[i].child.y = queue[i].y2;
      queue.splice(i,1);
    } else {
      console.log(dx + ' ' + dy);
      queue[i].child.x += dx / 15*queue[i].t;
      queue[i].child.y += dy / 15*queue[i].t;
    }
  }
  console.log(queue.length)
}
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
