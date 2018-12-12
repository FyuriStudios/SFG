/**
 * This function is called every time that the size of the player's screen changes. It should be used to forcefully redraw the board
 * to the new dimensions of the screen.
 */
function resizeCanvas() {

    var canvas = document.getElementById('canvas')
    var stage = new createjs.Stage("canvas");
    var aspectRatio = 9/16

    if (innerWidth * aspectRatio  <= innerHeight) {
	canvas.width = innerWidth
	canvas.height = innerWidth * aspectRatio;
    } else if (innerWidth * aspectRatio  >= innerHeight) {
	canvas.width = innerHeight / aspectRatio
	canvas.height = innerHeight
    }
    canvas.style.left = (innerWidth - canvas.width)/2
    canvas.style.top =  (innerHeight - canvas.height)/2

    stage.update();
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
    var canvas = document.getElementById('canvas');
    var stage = new createjs.Stage("canvas");

    var boardLine1 = new createjs.Shape();
    boardLine1.graphics.setStrokeStyle(3);
    boardLine1.graphics.beginStroke("#000000");
    boardLine1.graphics.moveTo(canvas.width/8,0);
    boardLine1.graphics.lineTo(canvas.width/8,canvas.height);
    boardLine1.graphics.endStroke();
    stage.addChild(boardLine1);

    var boardLine2 = new createjs.Shape();
    boardLine2.graphics.setStrokeStyle(3);
    boardLine2.graphics.beginStroke("#000000");
    boardLine2.graphics.moveTo(canvas.width*7/8,0);
    boardLine2.graphics.lineTo(canvas.width*7/8,canvas.height);
    boardLine2.graphics.endStroke();
    stage.addChild(boardLine2);

    var boardLine3 = new createjs.Shape();
    boardLine3.graphics.setStrokeStyle(3);
    boardLine3.graphics.beginStroke("#000000");
    boardLine3.graphics.moveTo(canvas.width/8,canvas.height/2);
    boardLine3.graphics.lineTo(canvas.width*7/8,canvas.height/2);
    boardLine3.graphics.endStroke();
    stage.addChild(boardLine3);

    var boardLine4 = new createjs.Shape();
    boardLine4.graphics.setStrokeStyle(3);
    boardLine4.graphics.beginStroke("#000000");
    boardLine4.graphics.moveTo(canvas.width*7/8,canvas.height/6);
    boardLine4.graphics.lineTo(canvas.width,canvas.height/6);
    boardLine4.graphics.endStroke();
    stage.addChild(boardLine4);

    var boardLine5 = new createjs.Shape();
    boardLine5.graphics.setStrokeStyle(3);
    boardLine5.graphics.beginStroke("#000000");
    boardLine5.graphics.moveTo(canvas.width*7/8,canvas.height*5/6);
    boardLine5.graphics.lineTo(canvas.width,canvas.height*5/6);
    boardLine5.graphics.endStroke();
    stage.addChild(boardLine5);

    //drawing all of the lines on the friendly side of the board
    for(var i = 0; i< 10; i++) {
	var playerField = new createjs.Shape();
	playerField.graphics.beginStroke("#000");
	playerField.graphics.setStrokeStyle(1);
	playerField.snapToPixel = true;
	playerField.graphics.drawRect(canvas.width*(3+i)/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
	playerField.graphics.endStroke();
	stage.addChild(playerField);
    }

    //drawing all of the lines on the enemy side of the board
    for(var i = 0; i< 10; i++) {
	var enemyField = new createjs.Shape();
	enemyField.graphics.beginStroke("#000");
	enemyField.graphics.setStrokeStyle(1);
	enemyField.snapToPixel = true;
	enemyField.graphics.drawRect(canvas.width*(3+i)/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
	enemyField.graphics.endStroke();
	stage.addChild(enemyField);
    }
    
    stage.update();
}

function init() {

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

