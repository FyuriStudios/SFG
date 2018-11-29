var Game = require('../base/Game')
var Card = require('../base/Card')

currentPlayer()
cardErrors()

function test(input, match, testName) {
    if(input == match) {
	console.log('Test passed: ' + testName)
    }
    else {
	console.log('Test FAILED' + testName + '\ninput: ' + input + '\nmatch: ' + match)
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