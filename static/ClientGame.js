var socket = io();


/**
 * This file holds all of the information required for the frontend to display the game properly.
 * It also contains the event history needed to do ~fancy~ animations (or it will, TODO: get events working)
 * 
 */
export class ClientGame { //FIXME: I'm pretty sure this export line doesn't actually work
    
    constructor() {
		this.setUp = false;
	}

	start() {
		socket.on('player id', playerIDCallback);
		socket.on('starting hand', startingHandCallback);
	}
	
	playerIDCallback(input) {
		this.ownPlayer = {
			id: input,
			characterHealth: PLAYER_MAX_HEALTH,
		};
		socket.emit('deck', null);
	}

	startingHandCallback(input) {
		this.ownPlayer.hand = input.cards;
	}
	
}


