//import './Events'

class Game {

    constructor(socket1, socket2) {
	this.turnCounter = 0
	//this.eventHistory = []

	/*
	 Here, I'm creating non-prototypical objects for player1 and player2. They don't need any functions, just some variables.
	 These player objects contain the exact same variable names, so it's super easy to just ask for something like currentPlayer().board
	 or something like that.
	 */
	this.player1 = {
		id: 1,
		socket: socket1,
		board: [],
		hand: [],
		graveyard: []
	}

	this.player2 = {
		id: 2,
		socket: socket2,
		board: [],
		hand: [],
		graveyard: []
	}
    }

    /**
     * After creating a new Game object, call this function. It will run an entire game from start to finish.
     * I didn't make this part of the constructor in case we decide that we want to create a game but wait to start it.
     */
    start() {
	player1.board = []//TODO: add a default deck
	player2.board = []
	
	var doTurn = function(input) {
	    if(input.player != this.currentPlayer) {
		return //If we receive input from the other player, ignore it.
	    } else {
		
	    }
	}

	player1.socket.on('move', function(input) {

	})
    }


//  get allEffects() {
//  return player1.board.concat(player1.effects).concat(player1)
//  } /* I'm commenting this out because we aren't implementing effects yet. */

    get currentPlayer() {
	return (turnCounter%4 == 1 || turnCounter%4 == 2) ? player1:player2
		//if it's 1,2... 5,6... 9,10... then player 1's turn.
		//if it's 3,4... 7.8... player 2's turn.
    }

    get otherPlayer() {
	return (turnCounter%4 == 1 || turnCounter%4 == 2) ? player2:player1
		//Just the opposite of currentPlayer.
    }

    endTurn() {
//	eventHistory.push(new TurnEndEvent(this))
	turnCounter++
//	for(element in effects){
//	if(element.hasTurnIncrement())
//	element.turnIncrement()
//	}
	killDead()
    }

    startTurn() {
//	eventHistory.push(new TurnBeginsEvent(this))
	turnCounter++
//	for(element in effects){
//	if(element.hasTurnIncrement())
//	element.turnIncrement()
//	}
	killDead()
    }

    killDead() {

    }

    start() {

    }

}

module.exports = Game