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

  var playerField1 = new createjs.Shape();
  playerField1.graphics.beginStroke("#000");
  playerField1.graphics.setStrokeStyle(1);
  playerField1.snapToPixel = true;
  playerField1.graphics.drawRect(canvas.width*3/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
  playerField1.graphics.endStroke();
  stage.addChild(playerField1);

  var playerField2 = new createjs.Shape();
  playerField2.graphics.beginStroke("#000");
  playerField2.graphics.setStrokeStyle(1);
  playerField2.snapToPixel = true;
  playerField2.graphics.drawRect(canvas.width*4/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
  playerField2.graphics.endStroke();
  stage.addChild(playerField2);

  var playerField3 = new createjs.Shape();
  playerField3.graphics.beginStroke("#000");
  playerField3.graphics.setStrokeStyle(1);
  playerField3.snapToPixel = true;
  playerField3.graphics.drawRect(canvas.width*5/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
  playerField3.graphics.endStroke();
  stage.addChild(playerField3);

  var playerField4 = new createjs.Shape();
  playerField4.graphics.beginStroke("#000");
  playerField4.graphics.setStrokeStyle(1);
  playerField4.snapToPixel = true;
  playerField4.graphics.drawRect(canvas.width*6/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
  playerField4.graphics.endStroke();
  stage.addChild(playerField4);

  var playerField5 = new createjs.Shape();
  playerField5.graphics.beginStroke("#000");
  playerField5.graphics.setStrokeStyle(1);
  playerField5.snapToPixel = true;
  playerField5.graphics.drawRect(canvas.width*7/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
  playerField5.graphics.endStroke();
  stage.addChild(playerField5);

  var playerField6 = new createjs.Shape();
  playerField6.graphics.beginStroke("#000");
  playerField6.graphics.setStrokeStyle(1);
  playerField6.snapToPixel = true;
  playerField6.graphics.drawRect(canvas.width*8/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
  playerField6.graphics.endStroke();
  stage.addChild(playerField6);

  var playerField7 = new createjs.Shape();
  playerField7.graphics.beginStroke("#000");
  playerField7.graphics.setStrokeStyle(1);
  playerField7.snapToPixel = true;
  playerField7.graphics.drawRect(canvas.width*9/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
  playerField7.graphics.endStroke();
  stage.addChild(playerField7);

  var playerField8 = new createjs.Shape();
  playerField8.graphics.beginStroke("#000");
  playerField8.graphics.setStrokeStyle(1);
  playerField8.snapToPixel = true;
  playerField8.graphics.drawRect(canvas.width*10/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
  playerField8.graphics.endStroke();
  stage.addChild(playerField8);

  var playerField9 = new createjs.Shape();
  playerField9.graphics.beginStroke("#000");
  playerField9.graphics.setStrokeStyle(1);
  playerField9.snapToPixel = true;
  playerField9.graphics.drawRect(canvas.width*11/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
  playerField9.graphics.endStroke();
  stage.addChild(playerField9);

  var playerField10 = new createjs.Shape();
  playerField10.graphics.beginStroke("#000");
  playerField10.graphics.setStrokeStyle(1);
  playerField10.snapToPixel = true;
  playerField10.graphics.drawRect(canvas.width*12/16, canvas.height*5/9,canvas.width/16,canvas.width/16)
  playerField10.graphics.endStroke();
  stage.addChild(playerField10);


    var enemyField1 = new createjs.Shape();
    enemyField1.graphics.beginStroke("#000");
    enemyField1.graphics.setStrokeStyle(1);
    enemyField1.snapToPixel = true;
    enemyField1.graphics.drawRect(canvas.width*3/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
    enemyField1.graphics.endStroke();
    stage.addChild(enemyField1);

    var enemyField2 = new createjs.Shape();
    enemyField2.graphics.beginStroke("#000");
    enemyField2.graphics.setStrokeStyle(1);
    enemyField2.snapToPixel = true;
    enemyField2.graphics.drawRect(canvas.width*4/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
    enemyField2.graphics.endStroke();
    stage.addChild(enemyField2);

    var enemyField3 = new createjs.Shape();
    enemyField3.graphics.beginStroke("#000");
    enemyField3.graphics.setStrokeStyle(1);
    enemyField3.snapToPixel = true;
    enemyField3.graphics.drawRect(canvas.width*5/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
    enemyField3.graphics.endStroke();
    stage.addChild(enemyField3);

    var enemyField4 = new createjs.Shape();
    enemyField4.graphics.beginStroke("#000");
    enemyField4.graphics.setStrokeStyle(1);
    enemyField4.snapToPixel = true;
    enemyField4.graphics.drawRect(canvas.width*6/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
    enemyField4.graphics.endStroke();
    stage.addChild(enemyField4);

    var enemyField5 = new createjs.Shape();
    enemyField5.graphics.beginStroke("#000");
    enemyField5.graphics.setStrokeStyle(1);
    enemyField5.snapToPixel = true;
    enemyField5.graphics.drawRect(canvas.width*7/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
    enemyField5.graphics.endStroke();
    stage.addChild(enemyField5);

    var enemyField6 = new createjs.Shape();
    enemyField6.graphics.beginStroke("#000");
    enemyField6.graphics.setStrokeStyle(1);
    enemyField6.snapToPixel = true;
    enemyField6.graphics.drawRect(canvas.width*8/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
    enemyField6.graphics.endStroke();
    stage.addChild(enemyField6);

    var enemyField7 = new createjs.Shape();
    enemyField7.graphics.beginStroke("#000");
    enemyField7.graphics.setStrokeStyle(1);
    enemyField7.snapToPixel = true;
    enemyField7.graphics.drawRect(canvas.width*9/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
    enemyField7.graphics.endStroke();
    stage.addChild(enemyField7);

    var enemyField8 = new createjs.Shape();
    enemyField8.graphics.beginStroke("#000");
    enemyField8.graphics.setStrokeStyle(1);
    enemyField8.snapToPixel = true;
    enemyField8.graphics.drawRect(canvas.width*10/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
    enemyField8.graphics.endStroke();
    stage.addChild(enemyField8);

    var enemyField9 = new createjs.Shape();
    enemyField9.graphics.beginStroke("#000");
    enemyField9.graphics.setStrokeStyle(1);
    enemyField9.snapToPixel = true;
    enemyField9.graphics.drawRect(canvas.width*11/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
    enemyField9.graphics.endStroke();
    stage.addChild(enemyField9);

    var enemyField10 = new createjs.Shape();
    enemyField10.graphics.beginStroke("#000");
    enemyField10.graphics.setStrokeStyle(1);
    enemyField10.snapToPixel = true;
    enemyField10.graphics.drawRect(canvas.width*12/16, canvas.height*3/9,canvas.width/16,canvas.width/16)
    enemyField10.graphics.endStroke();
    stage.addChild(enemyField10);
    
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
