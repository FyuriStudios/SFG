//hello marshmallow has taken over
var game;

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
    

    const aspectRatio = 9/16;
    const offset = 20
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

    drawBoard();
}

/**
 * This function should draw the board to the screen. You should call this every time that something graphically changes, e.g. a play
 * is made or the screen size changes.
 *
 * We might want to change this function though, since it's not reasonable to redraw the screen every time that someone moves a card or something.
 * Maybe we should cache the board somehow and just redefine it when the screen changes size.
 */
function drawBoard() {

    //redeclare canvas and stage since for some reason we can't declare them globally
    // var canvas = document.getElementById('canvas');

    // var boardLine1 = new createjs.Shape();
    // boardLine1.graphics.setStrokeStyle(3);
    // boardLine1.graphics.beginStroke("#000000");
    // boardLine1.graphics.moveTo(canvas.width/8,0);
    // boardLine1.graphics.lineTo(canvas.width/8,canvas.height);
    // boardLine1.graphics.endStroke();
    // stage.addChild(boardLine1);

    // var boardLine2 = new createjs.Shape();
    // boardLine2.graphics.setStrokeStyle(3);
    // boardLine2.graphics.beginStroke("#000000");
    // boardLine2.graphics.moveTo(canvas.width*7/8,0);
    // boardLine2.graphics.lineTo(canvas.width*7/8,canvas.height);
    // boardLine2.graphics.endStroke();
    // stage.addChild(boardLine2);

    // var boardLine3 = new createjs.Shape();
    // boardLine3.graphics.setStrokeStyle(3);
    // boardLine3.graphics.beginStroke("#000000");
    // boardLine3.graphics.moveTo(canvas.width/8,canvas.height/2);
    // boardLine3.graphics.lineTo(canvas.width*7/8,canvas.height/2);
    // boardLine3.graphics.endStroke();
    // stage.addChild(boardLine3);

    // var boardLine4 = new createjs.Shape();
    // boardLine4.graphics.setStrokeStyle(3);
    // boardLine4.graphics.beginStroke("#000000");
    // boardLine4.graphics.moveTo(canvas.width*7/8,canvas.height/6);
    // boardLine4.graphics.lineTo(canvas.width,canvas.height/6);
    // boardLine4.graphics.endStroke();
    // stage.addChild(boardLine4);

    // var boardLine5 = new createjs.Shape();
    // boardLine5.graphics.setStrokeStyle(3);
    // boardLine5.graphics.beginStroke("#000000");
    // boardLine5.graphics.moveTo(canvas.width*7/8,canvas.height*5/6);
    // boardLine5.graphics.lineTo(canvas.width,canvas.height*5/6);
    // boardLine5.graphics.endStroke();
    // stage.addChild(boardLine5);

    // //drawing all of the lines on the friendly side of the board
    // for(var i = 0; i< 10; i++) {
	// var playerField = new createjs.Shape();
	// playerField.graphics.beginStroke("#000");
	// playerField.graphics.setStrokeStyle(1);
	// playerField.snapToPixel = true;
	// playerField.graphics.drawRect(canvas.width*(3+i)/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
	// playerField.graphics.endStroke();
	// stage.addChild(playerField);
    // }

    // //drawing all of the lines on the enemy side of the board
    // for(var i = 0; i< 10; i++) {
	// var enemyField = new createjs.Shape();
	// enemyField.graphics.beginStroke("#000");
	// enemyField.graphics.setStrokeStyle(1);
	// enemyField.snapToPixel = true;
	// enemyField.graphics.drawRect(canvas.width*(3+i)/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
	// enemyField.graphics.endStroke();
	// stage.addChild(enemyField);
    // }

    // var playerDeck = new createjs.Shape();
    // playerDeck.graphics.beginStroke("#000");
    // playerDeck.graphics.setStrokeStyle(1);
    // playerDeck.snapToPixel = true;
    // playerDeck.graphics.drawRoundRect(canvas.width/50, 0, canvas.width/13, canvas.width/8, canvas.width/90)
    // playerDeck.graphics.endStroke();
  	// stage.addChild(playerDeck);

    // var enemyDeck = new createjs.Shape();
    // enemyDeck.graphics.beginStroke("#000");
    // enemyDeck.graphics.setStrokeStyle(1);
    // enemyDeck.snapToPixel = true;
    // enemyDeck.graphics.drawRoundRect(canvas.width/50, canvas.height*6.22/8, canvas.width/13, canvas.width/8, canvas.width/90)
    // enemyDeck.graphics.endStroke();
    // stage.addChild(enemyDeck);

    // var playerFieldAction = new createjs.Shape();
    // playerFieldAction.graphics.beginStroke("#000");
    // playerFieldAction.graphics.setStrokeStyle(1);
    // playerFieldAction.snapToPixel = true;
    // playerFieldAction.graphics.drawRect(canvas.width/50, canvas.height/2,canvas.width/13,canvas.width/13)
    // playerFieldAction.graphics.endStroke();
    // stage.addChild(playerFieldAction);

    // var enemyFieldAction = new createjs.Shape();
    // enemyFieldAction.graphics.beginStroke("#000");
    // enemyFieldAction.graphics.setStrokeStyle(1);
    // enemyFieldAction.snapToPixel = true;
    // enemyFieldAction.graphics.drawRect(canvas.width/50, canvas.height*5.8/16,canvas.width/13,canvas.width/13)
    // enemyFieldAction.graphics.endStroke();
    // stage.addChild(enemyFieldAction);

    // stage.update();

    //adds app to view, effectively refreshes. look into removing excess children or something, maybe use the 
    //function call .destroy()
    document.body.appendChild(app.view);
}

function init() {
    
    var socket = io(); //initialize the socket connection
    socket.emit('connected', {}); //TODO: input your deck and hero here
    
    socket.on('init', function(info) {
	 game = new Game(info.thisPlayer, info.otherPlayer);//TODO: we need a fancy game starting animation here, also I don't think this import works
    });
    
    socket.on('update', function(info) { 
	
    });

    //initialize game objects here
    resizeCanvas();
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
