//var createjs = require('create.js')
function resize_canvas(){
  canvas = document.getElementById('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
var stage = new createjs.Stage("canvas");
var circle = new createjs.Shape();
circle.graphics.beginFill("DeepSkyBlue").drawCircle(innerWidth/2, innerHeight/2, 50)
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
