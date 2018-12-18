/**
 * This file contains all of the logic required to run the base game.
 * I'm thinking about whether or not we should be writing a bunch of helper functions to make this easier,
 * like maybe a drawCard function, etc.
 * @author Hughes
 */

//require everything that we need, probably this list will expand as we go
var Character = require('./Character');
var _ = require('lodash');
var idToCard = require('./IdToCard');

Array.prototype.extend = function (other_array) {
    /* You should include a test to check whether other_array really is an array */
    other_array.forEach(function(v) {this.push(v)}, this);
}

Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) { //here I'm adding two functions to make the array class not suck
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
}

/**
 * The maximum number of each kind of tokens.
 */
const MAX_TOKS = 15;

/**
 * The number of tokens that each player can gain per turn.
 */
const TOKS_PER_TURN = 3;

/**
 * The maximum number of cards in a player's hand.
 */
const MAX_HAND_SIZE = 10;

/**
 * The maximum board size.
 */
const MAX_BOARD_SIZE = 10;

/**
 * The number of cards that a player draws for their starting turn. This number is here so that it's easier to balance.
 */
const STARTING_CARDS_DRAWN = 5;

/**
 * The damage taken due to fatigue. We haven't actually hashed out a real rule about this, pretty sure
 */
const FATIGUE_DAMAGE = 20;

class Game {

    constructor(socket1, socket2) {
		this.turnCounter = 0;
		this.eventHistory = [];

		/*
		Here, I'm creating non-prototypical objects for player1 and player2. They don't need any functions, just some variables.
		These player objects contain the exact same variable names, so it's super easy to just ask for something like currentPlayer().board
		or something like that.
		*/
		this.player1 = {
			setDeck: false,
			mulliganed: false,
			id: 1,
			character: new Character(),//TODO: change this to a real character
			socket: socket1,
			board: [],
			hand: [],
			graveyard: [],
			mToks: 0,
			sToks: 0
		};

		this.player2 = {
			setDeck: false,
			mulliganed: false,
			id: 2,
			character: new Character(),//TODO: change this to a real character
			socket: socket2,
			board: [],
			hand: [],
			graveyard: [],
			mToks: 0,
			sToks: 0
		};
    }

    /**
     * Starts the game. Call this function when you're ready for the entire game to start.
     * This function is separate from the initializer, just in case. Like, maybe we want to let both players ready up?
     * @author Hughes
     */
    start() {
		//TODO: add a default deck
		player1.socket.emit('player id', player1.id)
		player2.socket.emit('player id', player2.id)

		function deckConstruction(player) {
			player.socket.on('deck', function(input) {
				//TODO: deck verification and stuff!
				for(var i = 0; i<10; i++)
					player.deck.push(idToCard(-1)); //just constructs a potato list for the deck, TODO: make this a real function that does real stuff!

				player.setDeck = true;

				this.tryStart();//this function checks to make sure that the game can start
			});
		}
		
		deckConstruction(player1);
		deckConstruction(player2);
    }

    /**
     * This function makes sure that both players are ready. Then, it sends the hands of both players to them (TODO: add mulligans?).
     * Then it sets up all of the input listeners required to make the game run. This function should be called when a player sends their deck to the server and
     * it's a valid deck.
     * @author Hughes
     */
    tryStart() {
		if((player1.setDeck && player2.setDeck) && !(player1.mulliganed && player2.mulliganed)) {
	   		player1.deck.shuffle();
			player2.deck.shuffle();

			for(var i = 0; i < STARTING_CARDS_DRAWN; i++) {
				player1.hand.push(player1.deck.pop());
			}
			for(var i = 0; i < STARTING_CARDS_DRAWN; i++) {
				player2.hand.push(player1.deck.pop());
			}
			
			function setMulligan(player) {
				player.socket.on('mulligan', function(input) {
					
				})
			}
		} else if(player1.mulliganed && player2.mulliganed) {

		}
    }
    
    /**
     * Draws a card off of the player's deck. Makes sure that they actually have cards to take off of their deck or they take damage.
	 * This function also deals internally with the pain in the booty bit where you have to make events and shit.
     */
    drawCard(player) {
		if(player.deck.length == 0) {
			player.takeDamage(FATIGUE_DAMAGE);
		} else {
			var temp = player.deck.pop();
		}
    }

    /** Done (0.0.1)
     * Updates the board state for each player. I was considering running this on an interval but it's probably easier this way.
     * Each player should expect an object passed to them in the format shown below.
     * TODO: add events to this
     * @author Hughes
     */
    updatePlayers() {
		this.player1.socket.emit('game state', {
			self: {
			board: this.player1.board, //TODO: figure out how to map board, hand, and graveyard into arrays of anonymous objects
			hand: this.player1.hand,
			graveyard: this.player1.graveyard,
			mToks: this.player1.mToks,
			sToks: this.player1.sToks,
			deckSize: this.player1.deck.length,
			characterHealth: this.player1.character.health
			},
			other: {
			board: this.player2.board,
			handSize: this.player2.hand.length,
			graveyard: this.player2.graveyard,
			mToks: this.player2.mToks,
			sToks: this.player2.sToks,
			deckSize: this.player2.deck.length,
			characterHealth: this.player2.character.health
			},
			turnCounter: this.turnCounter
		})
		this.player2.socket.emit('game state', {
			self: {
			board: this.player2.board,
			hand: this.player2.hand,
			graveyard: this.player2.graveyard,
			mToks: this.player2.mToks,
			sToks: this.player2.sToks,
			deckSize: this.player2.deck.length,
			characterHealth: this.player2.character.health
			},
			other: {
			board: this.player1.board,
			handSize: this.player1.hand.length,
			graveyard: this.player1.graveyard,
			mToks: this.player1.mToks,
			sToks: this.player1.sToks,
			deckSize: this.player1.deck.length,
			characterHealth: this.player1.character.health
			},
			turnCounter: this.turnCounter
		})
    }

    get currentPlayer() {
	return (this.turnCounter%4 == 1 || this.turnCounter%4 == 2) ? this.player1:this.player2
		//if it's 1,2... 5,6... 9,10... then player 1's turn.
		//if it's 3,4... 7.8... player 2's turn.
    }										//these functions simply return the current player and other player. Call them like instance variables.

    get otherPlayer() {
	return (this.turnCounter%4 == 1 || this.turnCounter%4 == 2) ? this.player2:this.player1
		//Just the opposite of currentPlayer.
    }

    /** Done (0.0.1)
     * This function simply goes through the board and kills all dead dudes.
     * TODO: add event processing and effects
     * @author Hughes
     */
    killDead() {

	if(this.player1.character.health == 0){
	    player1.socket.emit('game over', 1)
	    player2.socket.emit('game over', 1)
	    player1.socket.disconnect()
	    player2.socket.disconnect()
	} else if(this.player2.character.health == 0) {//check for game over first.
	    player1.socket.emit('game over', 2)
	    player2.socket.emit('game over', 2)
	    player1.socket.disconnect()
	    player2.socket.disconnect()
	}

	this.player1.graveyard.extend(_.remove(this.player1.board, (n) => {return n.currentPower <= 0}))
	this.player2.graveyard.extend(_.remove(this.player2.board, (n) => {return n.currentPower <= 0}))


	//this.updatePlayers() TODO: fix update players func
    }

    /** Done (0.0.1)
     * The helper function to deal with attacks. Use this when a player asks to attack.
     * This function should also deal with invalid attacks.
     * @author Hughes
     */
    attack(input) {
	if((input.attackerLoc >= currentPlayer.board.length || input.attackerLoc == -1) || input.targetLoc >= currentPlayer.board.length) { //just real quick making sure that the locations are valid
	    return
	}

	var attacker = currentPlayer.board[input.attackerLoc]

	if(!attacker.canAttack) {
	    return
	}

	for(var i = 0; i < currentPlayer.board.length; i++) {
	    if(currentPlayer.board[i].defender && i != input.targetLoc) { //check to see if there's a dude with defender blocking the way
		return
	    } 
	}

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
	//this.updatePlayers()
	killDead()
    }

    playCard(input) {
	var temp = this.currentPlayer //storing it so we don't waste computation time on recalculating the current player
	if(input.cardLocation > temp.hand.length || input.cardLocation < 0) {
	    return
	}

	var toPlay = temp.hand[toPlay]
	//TODO: add flex token implementation
	var tokens = toPlay.tokenType == 'monster' ? temp.mToks:temp.sToks

		if(!(toPlay.playCost<=tokens) || temp.board.length == MAX_BOARD_SIZE) {
		    return //they don't have enough tokens to play the card.
		}

	toPlay.tokenType == 'monster' ? temp.mToks:temp.sToks -= toPlay.playCost //this line might just not work, but I don't want to rewrite it.

		temp.hand = temp.hand.splice(input.cardLocation)//this line also might not work, but it's supposed to remove the card at input.cardLocation

		if(toPlay.type == 'monster') {
		    temp.board.splice(input.playLocation, 0, toPlay) //TODO: write to history
		}
	if(toPlay.type == 'spell') {
	    //add code here
	}


    }

    /**
     * 
     * @param {object} input - the input from the user. Should be just an anonymous object, we'll define the format later.
     */
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
	    if(!dude.defender) {
		dude.canAttack = true
	    }
	}
	//	for(element in effects){
	//	if(element.hasTurnIncrement())
	//	element.turnIncrement() //TODO: write to history, effects
	//	}
	this.updatePlayers()
	killDead()

    }

    endTurn(input) {
	//eventHistory.push(new TurnEndEvent(this))
	turnCounter++
	//for(element in effects){
	//if(element.hasTurnIncrement())
	//element.turnIncrement() //TODO: write to history, effects
	//}
	this.updatePlayers()
	killDead()
	startTurn(input)
    }

}

module.exports = Game