//import './Events'

const MAX_TOKS = 15
const TOKS_PER_TURN = 3
const MAX_HAND_SIZE = 10

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
		character: new Character(),//TODO: change this to a real character
		socket: socket1,
		board: [],
		hand: [],
		graveyard: [],
		mToks = 0,
		sToks = 0
	}

	this.player2 = {
		id: 2,
		character: new Character(),//TODO: change this to a real character
		socket: socket2,
		board: [],
		hand: [],
		graveyard: [],
		mToks = 0,
		sToks = 0
	}
    }

    /**
     * After creating a new Game object, call this function. It will run an entire game from start to finish.
     * I didn't make this part of the constructor in case we decide that we want to create a game but wait to start it.
     */
    start() {
	player1.board = []//TODO: add a default deck
	player2.board = []



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

    endTurn(input) {
//	eventHistory.push(new TurnEndEvent(this))
	turnCounter++
//	for(element in effects){
//	if(element.hasTurnIncrement())
//	element.turnIncrement() //TODO: write to history, effects
//	}
	killDead()
	startTurn(input)
    }

    startTurn(input) {
	var temp = this.currentPlayer
	if(temp.sToks >= MAX_TOKS-TOKS_PER_TURN) {
	    temp.sToks += (TOKS_PER_TURN-(MAX_TOKS-TOKS_PER_TURN))
	} else {
	    temp.sToks += TOKS_PER_TURN
	}
	if(temp.mToks >= MAX_TOKS-TOKS_PER_TURN) {
	    temp.mToks += (TOKS_PER_TURN-(MAX_TOKS-TOKS_PER_TURN)) //give the player their frickin tokens
	} else {
	    temp.mToks += TOKS_PER_TURN
	}

	if(temp.deck.length > 0 && temp.hand.length < MAX_HAND_SIZE) { //TODO: write this to history, resolve effects.
	    temp.hand.append(temp.deck.pop())
	} else if(temp.deck.length == 0) {
	    //TODO: ya boy is in fatigue and we need to add a rule about this, since I forget what we were doing
	} else if(temp.hand.length >= MAX_HAND_SIZE) {
	    temp.deck.pop()
	}
	
	
//	eventHistory.push(new TurnBeginsEvent(this))
	turnCounter++ //TODO: effects, history
	for(dude in temp.board) {
	    if(!dude.isDefender) {
		dude.canAttack = true
	    }
	}
//	for(element in effects){
//	if(element.hasTurnIncrement())
//	element.turnIncrement() //TODO: write to history, effects
//	}
	killDead()

    }

    killDead() {

	if(player1.character.health == 0){
	    player1.socket.emit('game over', 1)
	    player2.socket.emit('game over', 1)
	    player1.socket.disconnect()
	    player2.socket.disconnect()
	} else if(player2.character.health == 0) {//check for game over first.
	    player1.socket.emit('game over', 2)
	    player2.socket.emit('game over', 2)
	    player1.socket.disconnect()
	    player2.socket.disconnect()
	}

	for(i in player1.board) {
	    if(i.power == 0)
		player1.graveyard.push(i)//add all dead guys to graveyards.
	}
	for(i in player2.board) {
	    if(i.power == 0)
		player2.graveyard.push(i)//TODO: Add effects and event writing
	}

	player1.board = player1.board.filter((n) => {n.power > 0})//remove all dead guys.
	player2.board = player2.board.filter((n) => {n.power > 0})
    }

    start() {
	doTurn(player1.socket)
	doTurn(player2.socket)
    }

    doTurn(socket) {
	socket.on('move', function(input) {
	    if(input.player != currentPlayer) {
		return
	    } else if(input.type == 'attack') {
		attack(input)
	    } else if(input.type == 'end turn') {
		endTurn(input)
	    } else if(input.type == 'play card') {
		playCard(input)
	    }

	})
    }

    attack(input) {
	if((input.attackerLoc >= currentPlayer.board.length || input.attackerLoc == -1) || input.targetLoc >= currentPlayer.board.length) { //just real quick making sure that the locations are valid
	    return
	}
	
	if(!attacker.canAttack) {
	    return
	}

	var attacker = currentPlayer.board[input.attackerLoc]
	attacker.canAttack = false

	if(input.targetLoc == -1) { //set the target equal to the enemy character if the targetLoc is -1.
	    var target = otherPlayer.character
	    target.health -= attacker.power
	} else {
	    var target = otherPlayer.board[input.targetLoc]
	    var tempPower = target.power
	    target.power -= attacker.power
	    attacker.power -= tempPower //TODO: write this to history, resolve effects
	}
	killDead()
    }

    playCard(input) {
	//finish this.


    }

}

module.exports = Game