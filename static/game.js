//var createjs = require('create.js')
function resize_canvas(){
  canvas = document.getElementById('canvas')

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

var stage = new createjs.Stage("canvas");
var circle = new createjs.Shape();
circle.graphics.beginFill("DeepSkyBlue").drawRect(0, 0, canvas.width, canvas.height)
console.log(window.innerWidth + " " + window.innerHeight)
circle.x = 0;
circle.y = 0;
stage.addChild(circle);
stage.update();
}

function init() {
  resize_canvas();

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
