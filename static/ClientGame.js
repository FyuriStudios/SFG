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
    
    update(events) {
	eventObject = {
		event: events[0], //events[0] should be the base event object that all of the other events stem from. When we display it, all of the other events
				  //should stem from the initial player input. Thus, I'm making them "children" of the master event so we can display the input
				  //followed by all of the children of the event (resulting events caused by that event).
		children: events.slice(1).filter((x) => {return x.displayEvent == true})
	}
	
	this.eventHistory.push(eventObject); //push it to the event history so that we can draw it
	
	/*
	 * Then, we're going to put every event into the doEvent function. In theory, doEvent should resolve the effects of the event, followed by a beautiful animation
	 * in which we display the event to the user.
	 */
	for(event in events) {  
	    this.doEvent(event);
	}
    }
    
    doEvent(event) {
	
    }
    
}