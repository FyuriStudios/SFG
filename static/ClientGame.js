import ClientGameDisplay from './ClientGameDisplay';
var constants = require('../sharedConstants/constants');


/**
 * This file holds all of the information required for the frontend to display the game properly.
 * It also contains the event history needed to do fancy animations (or it will, TODO: get events working)
 */
export default class ClientGame { //FIXME: I'm pretty sure this export line doesn't actually work
    
    constructor() {
		this.view = new ClientGameDisplay(/* params here */);
	}
	
}


