/**
 * This file holds all of the information required for the frontend to display the game properly. The ClientGameDisplay class possesses
 * an object of this class that will hold all of the game information, like card health, graveyard contents, etc. While this class won't
 * handle any animations or anything, it will hold all of the information and logic needed for the graphics class to display information
 * to the user.
 */

class ClientGame {

	/**
	 * Constructing this class empty is useful since the display needs to start displaying the game even before the full game has started,
	 * like during the mulligans phase.
	 * I'm initializing a "initialized" variable to false just to show that the class doesn't have all of the information it needs
	 * to be a full grown up ClientGame instance just yet.
	 */
	constructor() {
		this.initialized = false;
	}

	/**
	 * This should be called once the rest of the information is given to the client, like the final contents of the player's deck and
	 * their player id. A method might need to be added to ClientGameDisplay just to pass through all of this information, but I probably
	 * can find a workaround so we don't need to clutter.
	 *
	 * Initializes the following properties on this class:
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
		this.id = id;
		this.hand = hand;
		this.ownBoard = [];
		this.enemyBoard = [];
		this.enemyCardsHeld = constants.STARTING_CARDS_DRAWN;
		this.ownDeckSize = ownStartingDeckSize - constants.STARTING_CARDS_DRAWN;
		this.enemyDeckSize = enemyStartingDeckSize - constants.STARTING_CARDS_DRAWN;
		this.turnCounter = 0;
		this.initialized = true;
	}

	/**
	 * This is the most important function of the class. It takes in an event and then turns the event into
	 * a data change for the user and updates its own data based on the event's information. The documentation
	 * on event formatting is at the top of Game.js. This event processor will probably get broken down into a bunch of methods
	 * so that it's easier to read.
	 * @param {Event} event the event to be processed
	 */
	processEvent(event) {
		if(event.type == 'draw card') {
			processDrawCardEvent(event); //like dat
		}
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
