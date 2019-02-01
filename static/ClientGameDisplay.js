/**
 * All of the methods that have been displayed on this class are the methods that I want to be able to call from another file or I feel
 * are necessary for the functionality of this class. Feel free to add more methods (actually, I completely expect you to have to) but 
 * this is all I should need externally. More details on what these methods need to do are available in the comments above each method.
 * 
 * This class should be used as the interface to display the game and represent everything that's happening for the user. It contains
 * all of the functionality required to display the game and to input what the user wants to happen. The ClientGame class is actually
 * going to be used as a child of this class, since the functionality required to choose a mulligan, etc. needs to go through this
 * file.
 */
export default class ClientGameDisplay {

    /**
     * This is the initializer of the ClientGameDisplay class. It should be used to fully set up the display and get a board up on the
     * screen. After this class is done being initialized, a mulligan will need to be picked and 
     * @param {number} width the width of the screen this guy is being initialized on
     * @param {number} height the height of the scrren this guy is being initialized on
     * @param {function} inputCallback the callback to be called whenever user input happens
     */
    constructor(width, height, inputCallback) {
        /*
        Here, I'm initializing an empty ClientGame instance. The constructor basically just does nothing and the class will
        continue to do nothing up until the moment that the init function has been called. To call that function, we need a bunch of input
        from the server, including mulligan information and such. The game hasn't actually started until this object has been fully
        initialized.
        */
        this.game = new ClientGame();
        this.inputCallback = inputCallback;
        //add more initialization code here
    }

    /**
     * This function will be called from Frontend.js every time that the window resizes. It should essentially duplicate the
     * functionality of the windowResize function from Client.js, although if that bit actually got deleted when you made the static
     * window size feel free to just delete this method.
     * @param {number} height the new window height
     * @param {number} width the new window width
     */
    windowResize(height, width) {

    }

    /**
     * This method is the most important method of the class. Events will be passed in from Frontend.js and this method should process
     * them, display the changes, and then pass the event on to the game object. All of the various event types are documented at the 
     * top of Game.js. The Event object type is an anonymous object that has various different variables, depending on what type of
     * event it is. For example, a "draw card" event only has two variables: type ('draw card') and player(1 or 2). It contains all of
     * the information associated with the event, again documented in Game.js in great detail.
     * @param {Event} event the event to be processed
     */
    processEvent(event) {

    }

    /**
     * This method should be called every time that the user puts input into the interface, for example ending their turn. "input" is
     * supposed to be an object containing all of the input information that will be sent to the server, and probably the most effective
     * thing for you to do is to make it similar in format to the "event" objects that I've been using a lot of - The only common
     * attribute among them is their "type" attribute that specifies what they type of the input is, for example 'end turn' or 
     * 'play spell'. The rest of the information in the object could be the specific information about the input - for example, a 
     * 'play spell' input might also contain a 'card' input specifying the hand location of the spell. Then, the input might also have
     * a 'target' attribute, etc.
     * 
     * The intent of this method is to call the inputCallback function using this method, giving the function the input. The callback
     * will be specified through the constructor of this class (this.inputCallback is the name of the variable) and should define the
     * necessary behavior to send the information to the server, so that all you have to do is call the function in this method and
     * pass it the input, making sure to document input types somewhere else.
     * @param {*} input  
     */
    userInput(input) {

    }

    /**
     * This function exists just in case, I'm not sure we even need it at all. All it should do is completely reset the screen based on
     * the information that exists in this.game.
     */
    resetDisplay() {

    }

}