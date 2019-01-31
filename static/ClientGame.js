/**
 * This file holds all of the information required for the frontend to display the game properly.
 * It also contains the event history needed to do fancy animations (or it will, TODO: get events working).
 * It contains an object of the ClientGameDisplay class and an object of the IO class
 */

import ClientGameDisplay from './ClientGameDisplay';
import IO from './IO';
var constants = require('../sharedConstants/constants');

export default class ClientGame { //FIXME: I'm pretty sure this export line doesn't actually work

	constructor() {
		this.initialized = false;
	}
	
	/**
	 * The initializer of the ClientGame class. Initializes the following properties on this class:
	 * 1. id - the id number of this player
	 * 2. hand - the hand of this player
	 * 3. ownBoard - the board of this player
	 * 4. enemyBoard - the board of the other player
	 * 5. enemyCardsHeld - the number of cards held by the enemy player
	 * 6. ownDeckSize - the number of cards in this player's deck
	 * 7. enemyDeckSize - the number of cards in the enemy player's deck
	 * 8. turnCounter - the current turn that the game is on
	 * 
	 * @param {number} id the id of this player (either 1 or 2)
	 * @param {[Card]} hand the hand of this player
	 * @param {number} ownStartingDeckSize the total size of this player's deck
	 * @param {number} enemyStartingDeckSize the total size of the other player's deck
	 */
    init(id, hand, ownStartingDeckSize, enemyStartingDeckSize) {
		this.connection = new IO();
		this.view = new ClientGameDisplay(/* params here */);
		this.id = id;
		this.hand = hand;
		this.ownBoard = [];
		this.enemyBoard = [];
		this.enemyCardsHeld = constants.STARTING_CARDS_DRAWN;
		this.ownDeckSize = ownStartingDeckSize - constants.STARTING_CARDS_DRAWN;
		this.enemyDeckSize = enemyStartingDeckSize - constants.STARTING_CARDS_DRAWN;
		this.turnCounter = 0;
	}

	/**
	 * This is the most important function of the class. It takes in an event and then turns the event into
	 * a graphical change for the user and updates its own data based on the event's information. The documentation
	 * on event formatting is at the top of Game.js. This event processor will probably get broken down into a bunch of methods
	 * so that it's easier to read.
	 * @param {*} event the event to be processed
	 */
	processEvent(event) {
		if(event.type == 'draw card') {
			processDrawCardEvent(event); //like dat
		}
	}

	/**
	 * This function should output the next user input through the queue.
	 * @param {SocketIO} socket 
	 */
	outputQueue(socket) {

	}

	/**
	 * Returns the ID of the current player.
	 */
	get currentPlayer() {
		return (this.turnCounter%4 == 1 || this.turnCounter%4 == 2) ? 1:2;
		//if it's 1,2... 5,6... 9,10... then player 1's turn.
		//if it's 3,4... 7.8... player 2's turn.
	}

	/**
	 * Returns the id of the non-current player.
	 */
	get otherPlayer() {
		return (this.turnCounter%4 == 1 || this.turnCounter%4 == 2) ? 2:1;//literally just the opposite of the above method
	}
	
}