//var createjs = require('create.js')
function resize_canvas(){
  var canvas = document.getElementById('canvas')
    var stage = new createjs.Stage("canvas");
    var AspectRatio = 9/16

if (innerWidth * AspectRatio  <= innerHeight) {
  canvas.width = innerWidth
  canvas.height = innerWidth * AspectRatio;
} else if (innerWidth * AspectRatio  >= innerHeight) {
  canvas.width = innerHeight / AspectRatio
  canvas.height = innerHeight
}
canvas.style.left = (innerWidth - canvas.width)/2
canvas.style.top =  (innerHeight - canvas.height)/2


/*
var circle = new createjs.Shape();
circle.graphics.beginFill("DeepSkyBlue").drawRect(0, 0, canvas.width, canvas.height)
console.log(window.innerWidth + " " + window.innerHeight)
circle.x = 0;
circle.y = 0;
stage.addChild(circle);
*/
stage.update();
drawBoard();
}
function drawBoard(){
  var canvas = document.getElementById('canvas')
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
  stage.update();

  var boardLine4 = new createjs.Shape();
  boardLine4.graphics.setStrokeStyle(3);
  boardLine4.graphics.beginStroke("#000000");
  boardLine4.graphics.moveTo(canvas.width*7/8,canvas.height/6);
  boardLine4.graphics.lineTo(canvas.width,canvas.height/6);
  boardLine4.graphics.endStroke();
  stage.addChild(boardLine4);
  stage.update();

  var boardLine5 = new createjs.Shape();
  boardLine5.graphics.setStrokeStyle(3);
  boardLine5.graphics.beginStroke("#000000");
  boardLine5.graphics.moveTo(canvas.width*7/8,canvas.height*5/6);
  boardLine5.graphics.lineTo(canvas.width,canvas.height*5/6);
  boardLine5.graphics.endStroke();
  stage.addChild(boardLine5);
  stage.update();
}

//init function
function init() {
    resize_canvas();
    drawBoard();
}



//var socket = io()
//
//var playerID
//
//var self
//
//var other
//
//var turnCounter
//
//socket.on('player id', (id) => {playerID = id})
//
//socket.on('game state', (input) => {
//    self = input.self
//    other = input.other
//    turnCounter = input.gameCounter
//    gameUpdate()
//})
//
//function gameUpdate() {
//
//}


//checking to see how to use github on linux
