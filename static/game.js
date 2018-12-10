//var createjs = require('create.js')
var stage = new createjs.Stage("canvas");


var circle = new createjs.Shape();
circle.graphics.beginFill("DeepSkyBlue").drawRect(0, 0, window.innerWidth, window.innerHeight);
console.log(window.innerWidth + " " + window.innerHeight)
circle.x = 0;
circle.y = 0;
stage.addChild(circle);
stage.update();

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
