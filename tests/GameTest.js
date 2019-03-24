var Game = require('../base/Game')
var Card = require('../base/Card')
var Potato = require('../cards/Potato')
//test
//currentPlayer() this test is broken, TODO: fix it
//cardErrors()
killDead()

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] != b[i]) return false;
  }
  return true;
}

function test(input, testName) {
    if(input) {
	console.log('Test passed: ' + testName)
    }
    else {
	console.log('Test FAILED: ' + testName + ';input: ' + input)
    }
}

function currentPlayer() {
    //testing the current player function
    var currentPlayerTest = new Game(null, null)
    currentPlayerTest.turnCounter += 1 //should be middle of the first player's turn
    
    test(currentPlayerTest.currentPlayer, currentPlayerTest.player1, 'Game.currentPlayer when counter = 1')
        
    test(currentPlayerTest.otherPlayer, currentPlayerTest.player2, 'Game.otherPlayer when counter = 1')
        
    currentPlayerTest.turnCounter += 2 //this should be equivalent to increasing a turn by 1, so it should be player 2's turn.
    
    test(currentPlayerTest.currentPlayer, currentPlayerTest.player2, 'Game.currentPlayer when counter = 3')
        
    test(currentPlayerTest.otherPlayer, currentPlayerTest.player1, 'Game.otherPlayer when counter = 3')
      
    var passedLoop = true
    var player1 = true
    for(var i = 0; i < 10; i++) {
        currentPlayerTest.turnCounter += 2
        if(currentPlayerTest.currentPlayer === player1?currentPlayerTest.player1:currentPlayerTest.player2){
    	player1 = !player1
        } else {
    	console.log('Test FAILED: Game.currentPlayer hard loop on turn: ' + (2+i))
    	passedLoop = false
        }
    }
    if(passedLoop) {
        console.log('Test passed: Game.currentPlayer hard loop')
    }
}





function cardErrors() {
    var cardTest = new Card()
    console.log(cardTest.ID)
}


function killDead() {
    var deadTest = new Game(null, null)
    deadTest.player1.board.push(new Potato())
    deadTest.player1.board[0].currentPower = 0
    deadTest.killDead()
    test(arraysEqual(deadTest.player1.board, []), 'KillDead 1')
    
    deadTest = new Game(null, null)
    deadTest.player1.board = []
    var potato = new Potato()
    deadTest.player1.board.push(potato)
    potato.currentPower = 0
    deadTest.killDead()
    test(arraysEqual(deadTest.player1.graveyard, [potato]), 'KillDead 2')
}
function attack() {
    var game = new Game(null, null)
    game.player1.push()
}