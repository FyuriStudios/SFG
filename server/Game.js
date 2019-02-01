/*
Quick reference guide for events:

Events are the most important thing that anyone who handles the frontend needs to deal with. Every time an action occurs on the backend,
an event chain will be sent to the frontend. Then you need to deal with the event's information to update what's happening on the frontend,
for example animating attacks and drawn cards.

The event chain contains a full description of every event that occurred, in order. It's an array containing event objects. Event objects
follow this general format:

{
	type: string,
	[eventSpecificVars]: here,
}

The type specifies what kind of event is denoted; for example 'draw card' if a card was drawn. 
Here's a complete list and set of descriptions for all of the various event types (list is a work in progress):

1) type: 'fatigue' - This event occurs when a player draws a card but doesn't have a card in their deck to draw. They take damage to their
face as a result of it.
	Follows this format:
	
	{
		type: 'fatigue',
		damage: {int},
		player: {int}
	}
		* damage {int} - This is the amount of damage taken by the player due to fatigue.
		* player: {int} - This is the ID of the player that took the damage, either 1 or 2.


2) type: 'burn card' - This event occurs when a player draws a card but their hand is full and they burn the card. We're thinking about
   changing this rule but it's how I'm going to leave it for now because it's easier to implement.
	It follows this format:

	{
		type: 'burn card',
		player: {int},
		card: {Card}
	}
		* player {int} - This is the ID of the player that burned the card, 1 or 2.
		* card {Card} - This is the card that was burned. Contains probably a lot more information than needed but I'm leaving it like this
		  just in case it matters.


3) type: 'draw card' - This event occurs when a player draws a card. This is special because the player who drew the card receives
   information about the card that they drew but the other player only gets to know that they drew a card.
	For the current player, it follows this format:

	{
		type: 'draw card',
		player: {int},
		card: {Card}
	}
		* player {int} - The ID of the player who drew the card, 1 or 2.
		* card {Card} - The exact card object that was drawn. See Card.js for details.
	For the other player, it follows this format:

	{
		type: 'draw card',
		player: {int}
	}
	It's exactly the same except they don't get the card ID.


4) type: 'attack' - This event TODO: finish this lol

*/

//require everything that we need, probably this list will expand as we go
var Character = require('./Character');
var _ = require('lodash');
var idToCard = require('./IdToCard');
var constants = require('../sharedConstants/constants');

Array.prototype.extend = function (other_array) {
    /* You should include a test to check whether other_array really is an array */
    other_array.forEach(function(v) {this.push(v)}, this);
}

Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) { //here I'm adding two functions to make the array class not suck
        const j = Math.floor(Math.random() * (i + 1)); //I'm pretty sure this function works but I might be wrong
        [this[i], this[j]] = [this[j], this[i]];
    }
}

class Game {

	/**
	 * Sets up the game so that it can be started. All this function does is initialize variables, not to user input specifications.
	 * Currently, the function start() is the one that gets user input to actually initialize decks and characters and etc.
	 * @param {*} socket1 a reference to the socket connection to player 2
	 * @param {*} socket2 a reference to the socket connection to player 2
	 */
    constructor(socket1, socket2) {

		this.turnCounter = 0; //start the turn counter at zero since the game hasn't started yet
		this.eventHistory = []; //there are no events that have been written yet

		/*
		Here, I'm creating non-prototypical objects for player1 and player2. They don't need any functions, just some variables.
		These player objects contain the exact same variable names, so it's super easy to just ask for something like currentPlayer().board
		or something like that.
		*/
		this.player1 = {
			setDeck: false, //the player has not input their deck yet
			mulliganed: false, //the player has not mulliganed yet
			id: 1, //the player's id is player 1
			character: new Character(),//TODO: change this to a real character
			socket: socket1, //a reference to their socket connection
			board: [], //there's nothing on their board
			hand: [], //they don't have a hand yet
			graveyard: [], //there's nothing in the graveyard
			mToks: 0, //they have 0 monster tokens and spell tokens
			sToks: 0
		};

		this.player2 = { //see above for details on the variables
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
	 * 
     * This function lets the players set their decks and TODO: let the players choose characters, then gives them a mulligan opportunity.
	 * After that, it sets up the game input required so that the players can start. This function repeatedly calls itself so that
	 * the players can ready up all of their stuff.
     * @author Hughes
     */
    start() {
		
		//first, we're going to handle the case where both players haven't mulliganed or set their decks.
		if(!(player1.setDeck && player2.setDeck) && !(player1.mulliganed && player2.mulliganed)) {
			//TODO: add a default deck
			player1.socket.emit('player id', player1.id); //Send both players their IDs just in case they need them.
			player2.socket.emit('player id', player2.id);

			/*
			Here, I'm making a function that constructs the deck for each player. It sets up a callback that asks for a deck input,
			then turns that deck input into their deck.
			*/
			function deckConstruction(player) {
				player.socket.on('deck', function(input) {
					//TODO: deck verification and stuff!
					if(!player.setDeck) {
						for(var i = 0; i<10; i++)
							player.deck.push(idToCard(-1)); //just constructs a potato list for the deck, TODO: make this a real function that does real stuff!
						player.setDeck = true;

						this.start();//call itself to check to see if we can progress to the next step
					}
				});
			}
			
			deckConstruction(player1);//we're going to run this function for each player. This design pattern has been abused a lot by me (Hughes).
			deckConstruction(player2);

		/*
		When a player sets their deck, this function gets called again. When both players have set their decks, this function will be called.
		This part of the function is almost identical pattern-wise to the part above.
		*/
		} else if((player1.setDeck && player2.setDeck) && !(player1.mulliganed && player2.mulliganed)) {

	   		player1.deck.shuffle();
			player2.deck.shuffle();

			for(var i = 0; i < constants.STARTING_CARDS_DRAWN; i++) { //first, we're going to make each player draw an entire starting hand full of cards (there's a constant for this)
				player1.hand.push(player1.deck.pop());
			}
			for(var i = 0; i < constants.STARTING_CARDS_DRAWN; i++) { //draw a bunch of cards firstly
				player2.hand.push(player1.deck.pop());
			}

			player1.socket.emit('starting hand', {cards: player1.hand});
			player2.socket.emit('starting hand', {cards: player2.hand});
			
			//I think that this doesn't actually work.
			function setMulligan(player) {
					player.socket.on('mulligan', function(input) { //then give them the option to mulligan
						if(!player.mulliganed) {
							temp = [];

							input.replace.forEach((i) => { //iterating through the things that input needs
								temp.push(player.board[i]);
								player.board[i] = deck.pop();
							});
							player.deck.extend(temp);
							player.deck.shuffle();
							player.mulliganed = true;
							player.socket.emit('hand', {cards: player.hand});
						}
					});
			}
			setMulligan(player1);
			setMulligan(player2);

			start();

		} else if(player1.mulliganed && player2.mulliganed) {

			function setupGameInput(player) {

				function emitEvents(eventChain) {
					function sanitizeEventChain(eventChain, player) {
						//TODO: finish this
					}
				}
				player.socket.on('end turn', function(input) {
					eventChain = [];
					this.endTurn(eventChain);
					emitEvents(eventChain);
				});

				player.socket.on('attack', function(input) {
					eventChain = [];
					this.attack(input, eventChain);
					emitEvents(eventChain);
				});

				player.socket.on('play card', function(input) {
					eventChain = [];
					this.playCard(input, eventChain);
					emitEvents(eventChain);
				});
			}
			setupGameInput(player1);
			setupGameInput(player2);
		}
    }
    
    /**
     * Draws a card off of the player's deck. Makes sure that they actually have cards to take off of their deck or they take damage.
	 * This function also deals internally with the pain in the booty bit where you have to make events.
	 * @param player - a reference to the player who's drawing the card.
	 * @param eventChain - An object containing the chain of events that can be sent to the frontend
     */
    drawCard(player, eventChain) {

		var event = {};

		/*
		Here, we're going to check for fatigue and do the fatigues if it seems to be a thing
		*/
		if(player.deck.length == 0) {
			player.takeDamage(constants.FATIGUE_DAMAGE);
			event.view = 1;//public
			event.type = 'fatigue';
			event.damage = FATIGUE_DAMAGE;
			event.player = player.id;
		} 
		
		/*
		Otherwise, either a card gets burned or drawn
		*/
		else {
			
			temp = player.deck.pop();
			if(player.hand.length == constants.MAX_HAND_SIZE) {
				event.type = 'burn card';
				event.view = 1;
				event.player = player.id;
				event.card = temp;
				player.graveyard.push(temp);
			} 
			else {
				player.hand.push(temp);
				event.type = 'draw card';
				event.player = player.id;
				event.view = 2;//semi-private
				event.card = temp;
			}

		}

		eventChain.current.push(event);
		
	}

    /**
     * This function simply goes through the board and kills all dead dudes.
	 * It also will end the game if a hero is dead.
	 * @param eventChain - An object containing the chain of events that can be sent to the frontend. If this function decides that it needs to add something to the chain, it will.
     */
    killDead(eventChain) {

		if(this.player1.character.health == 0){
			player1.socket.emit('game over', 1);
			player2.socket.emit('game over', 1);
			player1.socket.disconnect();
			player2.socket.disconnect();
		} else if(this.player2.character.health == 0) {//check for game over first.
			player1.socket.emit('game over', 2);
			player2.socket.emit('game over', 2);
			player1.socket.disconnect();
			player2.socket.disconnect();
		}

		shouldDoEvent = false;
		player1.board.forEach((dude) => {if(dude.currentPower <= 0) {shouldDoEvent = true;}});
		player2.board.forEach((dude) => {if(dude.currentPower <= 0) {shouldDoEvent = true;}});

		if(!shouldDoEvent) //this code is disgusting but I don't want to make an empty event.
			return;

		var event = {type: 'dead', view: 1, dead: []};

		/*
		Here, I've extended the array prototype to allow for a function called "extend" that appends an array to another one.
		We're using this to add all dead monsters to the graveyard.
		*/
		function removeDead(player) {
			var deadDudes = [];
			for(var i = player.board.length-1; i >= 0; i--) {
				if(player.board[i].currentPower <= 0) {
					event.dead.append({id: player.board[i].id, position: i, player: player.id});
					deadDudes.append[player.board[i]];
				
				}
			}
			player.graveyard.extend(deadDudes);
		}

		removeDead(this.currentPlayer);
		removeDead(this.otherPlayer);

		eventChain.push(event);
    }

    /**
     * The helper function to deal with attacks. Use this when a player asks to attack.
     * This function should also deal with invalid attacks.
	 * 
	 * @param {*} input - the input from the player detailing what's gonna happen with the attack.
	 * @param {*} eventChain - the chain of events that this function should append to.
	 *
     */
    attack(input, eventChain) {
		
		if((input.attackerLoc >= this.currentPlayer.board.length || input.attackerLoc == -1) || input.targetLoc >= this.currentPlayer.board.length) { //just real quick making sure that the locations are valid
			return;
		}

		if(this.currentPlayer.board[input.attackerLoc].attack(otherPlayer, this.currentPlayer, input.targetLoc, eventChain)) {
			killDead(eventChain);
		}
    }

	/**
	 * This function should deal with playing a card.
	 * @param {*} input - a JSON object containing the information required to do this action.
	 * @param {*} eventChain - the chain of events.
	 */
    playCard(input, eventChain) {
		
		var temp = this.currentPlayer; //storing it so we don't waste computation time on recalculating the current player
		if(input.cardLocation > temp.hand.length || input.cardLocation < 0) {
			return; //check to see if the card's actually in their hand
		}


		var toPlay = temp.hand[input.toPlay];
		//TODO: add flex token implementation
		var tokens = toPlay.tokenType == 'monster' ? temp.mToks:temp.sToks;

		if(!(toPlay.playCost<=tokens) || temp.board.length == constants.MAX_BOARD_SIZE) {
			return //they don't have enough tokens to play the card.
		}

		var event = { //now that we're sure the event is going to happen
			view: 1,
			type: 'card played',
			locationInHand: input.toPlay,
			cost: toPlay.playCost,
			tokenType: toPlay.tokenType,
			cardType: toPlay.type,
			player: temp.id
		};

		toPlay.tokenType == 'monster' ? temp.mToks:temp.sToks -= toPlay.playCost; //this line might just not work, but I don't want to rewrite it.

		temp.hand = temp.hand.splice(input.cardLocation);//this line also might not work, but it's supposed to remove the card at input.cardLocation

		eventChain.push(event);

		if(toPlay.type == 'monster') {
			event.monster = toPlay;
			temp.board.splice(input.playLocation, 0, toPlay); 
			//TODO: add battlecry effect
		}

		if(toPlay.type == 'spell') {
			//TODO: add code here
		}
		
    }

    startTurn(eventChain) {

		var temp = this.currentPlayer;
		var event = {
			type: 'start turn',
			view: 1,
			player: temp.id
		};
		

		if(temp.sToks >= constants.MAX_TOKS-constants.TOKS_PER_TURN) {
			var currSToks = temp.sToks;
			temp.sToks = constants.MAX_TOKS;
			event.sToks = constants.MAX_TOKS - currSToks;
		} else {
			temp.sToks += constants.TOKS_PER_TURN;
			event.sToks = constants.TOKS_PER_TURN;
		}

		if(temp.mToks >= constants.MAX_TOKS-constants.TOKS_PER_TURN) {
			var currMToks = temp.mToks;
			temp.mToks = constants.MAX_TOKS;
			event.mToks = constants.MAX_TOKS - currMToks;
		} else {
			temp.mToks += constants.TOKS_PER_TURN;
			event.sToks = constants.TOKS_PER_TURN;
		}

		eventChain.push(event); //Here I'm pushing the event so that when we draw a card this event is already on the event chain.

		drawCard(temp, eventChain);


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
		killDead(eventChain);

    }

	/**
	 * Ends a player's turn.
	 * @param {*} input 
	 * @param {*} eventChain 
	 */
    endTurn(input, eventChain) {

		eventChain.push({
			type: 'end turn',
			view: 1,
			player: this.currentPlayer.id
		});

		turnCounter++;
		killDead(eventChain);
		startTurn();
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

}

module.exports = Game;