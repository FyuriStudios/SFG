/**
 * This file holds all of the information required for the frontend to display the game properly.
 * It also contains the event history needed to do ~fancy~ animations (or it will, TODO: get events working)
 * 
 */
export class Game {
    constructor(own, other) {
	this.ownPlayer = own;
	this.otherPlayer = other;
	this.eventHistory = [];
    }
}