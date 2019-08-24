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

1) type: 'fatigue' - This event occurs when a player deckdraws a card but doesn't have a card in their deck to draw. They take damage to their
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

5) type: 'heal' - signifies healing. DIFFERENT FROM BOOST/DAMAGE
	{
		type: 'heal',
		player: int,
		targetSide: int,
		target: int (index on board),
		amount: int
	}

6) type: 'humiliate' - humiliation.

	{
		type: 'humiliate',
		player: int,
		targetSide: int,
		target: int
	}

	7) type: 'play card'
*/

//require everything that we need, probably this list will expand as we go
var Character = require('./Character');
var _ = require('lodash');
var idToCard = require('./IDToCard');
var constants = require('../constants/constants');

Array.prototype.extend = function (other_array) {
	other_array.forEach(function (v) {
		this.push(v)
	}, this);
}

Array.prototype.shuffle = function () {
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

		/*
		Here, I'm creating non-prototypical objects for player1 and player2. They don't need any functions, just some variables.
		These player objects contain the exact same variable names, so it's super easy to just ask for something like currentPlayer().board
		or something like that.
		*/
		this.player1 = {
			setDeck: false, //the player has not input their deck yet
			id: 1, //the player's id is player 1
			health: constants.STARTING_HEALTH, //TODO: change this to a real character
			socket: socket1, //a reference to their socket connection
			board: [], //there's nothing on their board
			hand: [], //they don't have a hand yet
			graveyard: [], //there's nothing in the graveyard
			mToks: 3,
			sToks: 3,
			deck: [],
			effects: [],
			fieldSpell: null,
			character: null,
			setCharacter: false,
			setMulligan: false,
		};

		this.player2 = { //see above for details on the variables
			setDeck: false,
			id: 2,
			health: constants.STARTING_HEALTH, //TODO: change this to a real character
			socket: socket2,
			board: [],
			hand: [],
			graveyard: [],
			mToks: 0,
			sToks: 0,
			deck: [],
			effects: [],
			fieldSpell: null,
			character: null,
			setCharacter: false,
			setMulligan: false,
		};
	}

	backendCardTranslate(card) {
		if (card.type == 'monster') {
			return {
				id: card.id,
				type: card.type,
				power: card.power,
				tokenType: card.tokenType,
				rarity: card.rarity,
				name: card.name,
				cost: card.cost,
				playCost: card.currentCost,
				power: card.power,
				currentPower: card.currentPower,
				hasDefender: card.hasDefender,
				isStatic: card.isStatic,
				forseeing: card.forseeing,
			};
		} else {
			return {
				id: card.id,
				type: card.type,
				power: card.power,
				tokenType: card.tokenType,
				rarity: card.rarity,
				name: card.name,
				cost: card.cost,
				playCost: card.currentCost,
				targeting: card.targeting,
				forseeing: card.forseeing,
				field: card.field,
			};
		}
	}

	/**
	 * Starts the game. Call this function when you're ready for the entire game to start.
	 * This function is separate from the initializer, just in case. Like, maybe we want to let both players ready up?
	 *
	 * This function lets the players set their decks and (TODO) let the players choose characters.
	 * After that, it sets up the gamedeck input required so that the players can start. This function repeatedly calls itself so that
	 * the players can ready up all of their stuff.
	 * @author Hughes
	 */
	start(gameReference = this) {

		if(!this.player1.setCharacter || !this.player2.setCharacter) {

			this.player1.socket.emit('player id', this.player1.id); //Send both players their IDs just in case they need them.
			this.player2.socket.emit('player id', this.player2.id);

			function setPlayer(player) {
				player.socket.once('character', input => {
					player.character = input;
					player.setCharacter = true;
					gameReference.start();
				});
			}

			setPlayer(gameReference.player1);
			setPlayer(gameReference.player2);
		}
		else if (!this.player1.setDeck || !this.player2.setDeck) {

			this.player1.socket.emit('character', this.player2.character);
			this.player2.socket.emit('character', this.player2.character);

			/*
			Here, I'm making a function that constructs the deck for each player. It sets up a callback that asks for a deck input,
			then turns that deck input into their deck.
			*/
			function deckConstruction(player) {
				player.socket.once('deck', function (input) {
					//TODO: deck verification and stuff!
					if (!player.setDeck) {
						input.forEach(value => player.deck.push(idToCard(value))); //TODO: Make this a real deck
						player.setDeck = true;
						gameReference.start(); //call itself to check to see if we can progress to the next step
					}
				});
			}
 
			deckConstruction(this.player1); //we're going to run this function for each player. This design pattern has been abused a lot by me (Hughes).
			deckConstruction(this.player2);
		} 
		
		else if (this.player1.setDeck && this.player2.setDeck && !this.player1.setMulligan && !this.player2.setMulligan) {

			let deckSizes = {
				player1DeckSize: this.player1.deck.length,
				player2DeckSize: this.player2.deck.length,
			}

			this.player1.socket.emit('deck sizes', deckSizes);
			this.player2.socket.emit('deck sizes', deckSizes);

			this.player1.socket.emit('start', null);
			this.player2.socket.emit('start', null);

			this.player1.deck.shuffle();
			this.player2.deck.shuffle();

			this.player1.deck.forEach(value => {
				if (value.hasCreation)
					value.creation({}, this, null);
			});

			this.player2.deck.forEach(value => {
				if (value.hasCreation)
					value.creation({}, this, null);
			});

			let drawChain = [];
			this.drawHand(gameReference.player1, drawChain);
			this.drawHand(gameReference.player2, drawChain);
			
			this.outputEventChain(drawChain);

			function mulligan(player) {
				player.socket.emit('event', {type: 'mulligan'});
				player.socket.once('mulligan', input => {
					if(input == 'yes') {
						let mulliganChain = [];
						let hand = player.hand;
						player.hand = [];
						mulliganChain.push({
							type: 'mulligan hand',
							player: player.id,
						});
						gameReference.drawHand(player, mulliganChain);

						gameReference.outputEventChain(mulliganChain);
						player.deck.extend(hand);
						player.deck.shuffle();
					}
					player.setMulligan = true;
					gameReference.start(gameReference);
				});
			}

			function yakovMulligan(player) {
				//'Discard' event has 'index' as the location of the card to be discarded, not target like in some other events. Idk why I couldn't be more consistent.
				player.socket.emit('event', {type: 'yakov mulligan'});
				player.socket.once('yakov mulligan', input => {

					let mulliganChain = [];
					player.setMulligan = true;

					if(input.choices.length == 0) {
						gameReference.start(gameReference);
						return;
					}

					let discards = [];
					input.choices.forEach(index => discards.push(player.hand[index]));

					//This lodash method removes all of the cards that got mulliganed.
					_.pullAll(player.hand, discards);

					mulliganChain.push({
						type: 'drop cards',
						player: player.id,
						choices: input.choices
					});

					_.times(discards.length, () => gameReference.drawCard(player, mulliganChain)); //this "times" syntax is beautiful. All languages need it.

					player.deck.extend(discards);

					_.times(discards.length, () => mulliganChain.push({type: 'add deck card', player: player.id}));

					gameReference.outputEventChain(mulliganChain);

					gameReference.start(gameReference);

				});
			}

			gameReference.player1.character == 'yakov'? yakovMulligan(gameReference.player1) : mulligan(gameReference.player1);
	
			gameReference.player2.character == 'yakov'? yakovMulligan(gameReference.player2) : mulligan(gameReference.player2); 
			
		}

		else if(gameReference.player1.setMulligan && gameReference.player2.setMulligan) {

			this.turnCounter += 1;
			let event = {
				type: 'start turn',
				player: 1,
				spellTokensGained: constants.TOKS_PER_TURN,
				monsterTokensGained: constants.TOKS_PER_TURN,
			};

			this.player1.socket.emit('event', event);
			this.player2.socket.emit('event', event);


			this.player1.socket.on('event', input => {
				console.log(input);
				this.processEvent(this.player1, input);
			});

			this.player2.socket.on('event', input => {
				console.log(input);
				this.processEvent(this.player2, input);
			});

		}
	}

	processEvent(player, input) {

		if (player != this.currentPlayer) {
			return;
		}

		let eventChain = [];

		switch (input.type) {
			case 'attack':
				this.attack(input, eventChain);
				break;
			case 'play card':
				this.playCard(input, eventChain);
				break;
			case 'end turn':
				this.endTurn(input, eventChain);
				break;
		}
		console.log(this.currentPlayer.board);

		this.outputEventChain(eventChain);
	}

	outputEventChain(eventChain) {
		eventChain.forEach(value => {

			if (value.view == 3) {
				this.currentPlayer.socket.emit('event', value);
			} else if (value.view == 2) {
				if (value.player == 1) {
					this.player1.socket.emit('event', value);
					this.player2.socket.emit('event', {
						type: value.type,
						player: value.player
					});
				} else {
					this.player2.socket.emit('event', value);
					this.player1.socket.emit('event', {
						type: value.type,
						player: value.player
					});
				}
			} else {
				this.player1.socket.emit('event', value);
				this.player2.socket.emit('event', value);
			}
		});

		console.log('no');
	}

	drawHand(player, eventChain) {
		if(player.character == 'ignea') {
			this.drawCard(player, eventChain); //draw an extra card if the character's Ignea.
		}

		for(var i = 0; i< constants.STARTING_CARDS_DRAWN; i++) {
			this.drawCard(player, eventChain);
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
		if (player.deck.length == 0) {
			player.health -= constants.FATIGUE_DAMAGE;
			event.view = 1; //public
			event.type = 'fatigue';
			event.damage = constants.FATIGUE_DAMAGE;
			event.player = player.id;
		}

		/*
		Otherwise, either a card gets burned or drawn
		*/
		else {

			let temp = player.deck.pop();
			if (player.hand.length == constants.MAX_HAND_SIZE) {
				event.type = 'burn card';
				event.view = 1;
				event.player = player.id;
				event.card = this.backendCardTranslate(temp);
				eventChain.push(event);
			} else {
				player.hand.unshift(temp);
				event.type = 'draw card';
				event.player = player.id;
				event.view = 2; //semi-private
				event.card = this.backendCardTranslate(temp);
				eventChain.push(event);

				this.currentPlayer.board.forEach(value => {
					if (value.hasCardDraw) {
						value.cardDraw({
							player: player.id
						}, this, eventChain);
					}
				});

				this.otherPlayer.board.forEach(value => {
					if (value.hasCardDraw) {
						value.cardDraw({
							player: player.id
						}, this, eventChain);
					}
				});

				this.currentPlayer.effects.forEach(value => {
					if (value.hasCardDraw) {
						value.cardDraw({
							player: player.id
						}, this, eventChain);
					}
				});

				this.otherPlayer.effects.forEach(value => {
					if (value.hasCardDraw) {
						value.cardDraw({
							player: player.id
						}, this, eventChain);
					}
				});

				if (this.currentPlayer.fieldSpell != null && this.currentPlayer.fieldSpell.hasCardDraw) {
					this.currentPlayer.fieldSpell.cardDraw({
						player: player.id
					}, this, eventChain);
				}

				if (this.otherPlayer.fieldSpell != null && this.otherPlayer.fieldSpell.hasCardDraw) {
					this.otherPlayer.fieldSpell.cardDraw({
						player: player.id
					}, this, eventChain);
				}
			}
		}

		this.killDead(eventChain);

	}

	/**
	 * This function simply goes through the board and kills all dead dudes.
	 * It also will end the game if a hero is dead.
	 * @param eventChain - An object containing the chain of events that can be sent to the frontend. If this function decides that it needs to add something to the chain, it will.
	 */
	killDead(eventChain) {

		if (this.player1.health <= 0) {
			let event = {
				'type': 'game over',
				'player': 2 //player 2 won
			}
			this.player1.socket.emit('event', event);
			this.player2.socket.emit('event', event);
			this.player1.socket.disconnect();
			this.player2.socket.disconnect();
		} else if (this.player2.health <= 0) { //check for game over first.
			let event = {
				'type': 'game over',
				'player': 1 //player 1 won
			}
			this.player1.socket.emit('event', event);
			this.player2.socket.emit('event', event);
			this.player1.socket.disconnect();
			this.player2.socket.disconnect();
		}

		let shouldDoEvent = false;
		this.player1.board.forEach((dude) => {
			if (dude.currentPower <= 0) {
				shouldDoEvent = true;
			}
		});
		this.player2.board.forEach((dude) => {
			if (dude.currentPower <= 0) {
				shouldDoEvent = true;
			}
		});

		if (!shouldDoEvent) //this code is disgusting but I don't want to make an empty event.
			return;

		let dead = [];

		let game = this; //Create an alias here because of line 526 and the function scope created by it.

		function removeDead(player) {
			let deadGuys = [];
			for (var i = player.board.length - 1; i >= 0; i--) {
				if (player.board[i].currentPower <= 0) {

					let deadGuy = player.board.splice(i, 1)[0];
					deadGuy.curentPower = deadGuy.power;
					//TODO: add effects here
					if (deadGuy.hasSelfDeath) {
						deadGuy.selfDeath(null, game, eventChain);
					}

					deadGuys.push(deadGuy);
					dead.push({
						index: i,
						id: player.id
					});
				}
			}
			player.graveyard.extend(deadGuys);
		}

		removeDead(this.currentPlayer);
		removeDead(this.otherPlayer);

		dead.forEach(value => {
			let event = {
				type: 'kill dead',
				view: 1,
				player: value.id,
				target: value.index
			};
			eventChain.push(event);
		});
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

		if (this.currentPlayer.board[input.attacker].attack(this, input.attacker, input.target, eventChain)) {
			if (this.currentPlayer.board[input.attacker].hasSelfAttack) {
				this.currentPlayer.board[input.attacker].selfAttack(input, this, eventChain);
			}
			this.otherPlayer.board.forEach((value) => {
				if (value.hasEnemyAttack) {
					value.enemyAttack(input, this, eventChain);
				}
			});

			this.otherPlayer.effects.forEach((value) => {
				if (value.hasEnemyAttack) {
					value.enemyAttack(input, this, eventChain);
				}
			});
			//TODO: add effects
			this.killDead(eventChain);
		}
	}

	/**
	 * This function should deal with playing a card.
	 * @param {*} input - a JSON object containing the information required to do this action.
	 * @param {*} eventChain - the chain of events.
	 */
	playCard(input, eventChain) {

		var temp = this.currentPlayer; //storing it so we don't waste computation time on recalculating the current player

		var toPlay = temp.hand[input.handLoc];

		//TODO: add flex token implementation
		var tokens = toPlay.tokenType == 'monster' ? temp.mToks : temp.sToks;

		if (toPlay.currentCost > tokens || temp.board.length == constants.MAX_BOARD_SIZE) {
			return; //they don't have enough tokens to play the card.
		}

		if (toPlay.type == 'spell' && toPlay.targeting) {
			if (input.target != -1) {
				let player = input.targetSide == 1 ? this.player1 : this.player2;
				if (!(player.board[input.target].actionTargetable))
					return;
			}
		}

		temp.hand.splice(input.handLoc, 1);

		var event = { //now that we're sure the event is going to happen
			view: 1,
			type: 'play card',
			handLoc: input.handLoc,
			playLoc: input.playLoc,
			cost: toPlay.currentCost,
			tokenType: toPlay.tokenType,
			player: temp.id,
			card: this.backendCardTranslate(toPlay),
		};

		if (toPlay.tokenType == 'monster')
			temp.mToks -= toPlay.currentCost;
		else
			temp.sToks -= toPlay.currentCost;

		eventChain.push(event);

		if (toPlay.type == 'monster') {
			temp.board.splice(input.playLoc, 0, toPlay);

			let checkMonsterPlayed = (value) => {
				if(value.hasMonsterPlayed)
					value.monsterPlayed(input, this, eventChain);
			}
			if(this.currentPlayer.fieldSpell != null && this.currentPlayer.fieldSpell.hasMonsterPlayed)
				this.currentPlayer.fieldSpell.monsterPlayed(input, this, eventChain);
			if(this.otherPlayer.fieldSpell != null && this.otherPlayer.fieldSpell.hasMonsterPlayed)
				this.otherPlayer.fieldSpell.monsterPlayed(input, this, eventChain);
			this.currentPlayer.board.forEach(checkMonsterPlayed);
			this.otherPlayer.board.forEach(checkMonsterPlayed);

			if (toPlay.hasCardPlayed)
				toPlay.cardPlayed(input, this, eventChain);

			if(toPlay.hasEntersBoard) {
				toPlay.entersBoard(input, this, eventChain);
			}

		} else if (toPlay.type == 'spell') {

			toPlay.cardPlayed(input, this, eventChain);

			if (toPlay.field) {
				if (temp.fieldSpell != null) {
					if(temp.fieldSpell.hasSelfDeath)
						temp.fieldSpell.selfDeath(input, this, eventChain);
					temp.graveyard.push(temp.fieldSpell);
				}
				temp.fieldSpell = toPlay;
			} else {
				temp.graveyard.push(toPlay);
			}
		}

		this.killDead(eventChain);
	}

	startTurn(eventChain) {

		this.turnCounter++;

		var temp = this.currentPlayer;

		var event = {
			type: 'start turn',
			view: 1,
			player: temp.id,
		};

		if (temp.sToks >= constants.MAX_TOKS - constants.TOKS_PER_TURN) {
			var currSToks = temp.sToks;
			temp.sToks = constants.MAX_TOKS;
			event.spellTokensGained = constants.MAX_TOKS - currSToks;
		} else {
			temp.sToks += constants.TOKS_PER_TURN;
			event.spellTokensGained = constants.TOKS_PER_TURN;
		}

		if (temp.mToks >= constants.MAX_TOKS - constants.TOKS_PER_TURN) {
			var currMToks = temp.mToks;
			temp.mToks = constants.MAX_TOKS;
			event.monsterTokensGained = constants.MAX_TOKS - currMToks;
		} else {
			temp.mToks += constants.TOKS_PER_TURN;
			event.monsterTokensGained = constants.TOKS_PER_TURN;
		}

		eventChain.push(event); //Here I'm pushing the event so that when we draw a card this event is already on the event chain.

		this.drawCard(temp, eventChain);

		temp.board.forEach(value => {
			if (!value.hasDefender && !value.isStatic) {
				value.turnsBeforeAttack -= 1;
			}
		});

		this.currentPlayer.board.forEach(value => {
			if (value.hasTurnIncrement)
				value.turnIncrement({}, this, eventChain);
		});
		this.otherPlayer.board.forEach(value => {
			if (value.hasTurnIncrement)
				value.turnIncrement({}, this, eventChain);
		});
		this.currentPlayer.effects.forEach(value => {
			if (value.hasTurnIncrement)
				value.turnIncrement({}, this, eventChain);
		});
		this.otherPlayer.effects.forEach(value => {
			if (value.hasTurnIncrement)
				value.turnIncrement({}, this, eventChain);
		});
		if (this.currentPlayer.fieldSpell != null && this.currentPlayer.fieldSpell.hasTurnIncrement) {
			this.currentPlayer.fieldSpell.turnIncrement({}, this, eventChain);
		}
		if (this.otherPlayer.fieldSpell != null && this.otherPlayer.fieldSpell.hasTurnIncrement) {
			this.otherPlayer.fieldSpell.turnIncrement({}, this, eventChain);
		}

		this.killDead(eventChain);

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

		this.turnCounter++;


		this.currentPlayer.board.forEach(value => {
			if (value.hasTurnIncrement)
				value.turnIncrement({}, this, eventChain);
		});
		this.otherPlayer.board.forEach(value => {
			if (value.hasTurnIncrement)
				value.turnIncrement({}, this, eventChain);
		});
		this.currentPlayer.effects.forEach(value => {
			if (value.hasTurnIncrement)
				value.turnIncrement({}, this, eventChain);
		});
		this.otherPlayer.effects.forEach(value => {
			if (value.hasTurnIncrement)
				value.turnIncrement({}, this, eventChain);
		});
		this.killDead(eventChain);

		this.startTurn(eventChain);
	}

	get currentPlayer() {
		return (this.turnCounter % 4 == 1 || this.turnCounter % 4 == 2) ? this.player1 : this.player2;
		//if it's 1,2... 5,6... 9,10... then player 1's turn.
		//if it's 3,4... 7.8... player 2's turn.
	} //these functions simply return the current player and other player. Call them like instance variables.

	get otherPlayer() {
		return (this.turnCounter % 4 == 1 || this.turnCounter % 4 == 2) ? this.player2 : this.player1;
		//Just the opposite of currentPlayer.
	}

}

module.exports = Game;