import ClientGameDisplay from './ClientGameDisplay';
var constants = require('../sharedConstants/constants');


/**
 * This file holds all of the information required for the frontend to display the game properly.
 * It also contains the event history needed to do fancy animations (or it will, TODO: get events working)
 */
export default class ClientGame { //FIXME: I'm pretty sure this export line doesn't actually work
    
    constructor(ownPlayer, otherPlayer, turnCounter, ) {
		this.view = new ClientGameDisplay(/* params here */);
		this.ownPlayer = ownPlayer;
		this.otherPlayer = otherPlayer;
		this.turnCounter = turnCounter;
		this.history = [];//this contains the full event history.
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
	
}