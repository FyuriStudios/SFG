/**
 * This class exists to deal with the input/output to and from the backend. It's the controlling class for everything that happens on
 * the frontend, because all events are filtered through this class, as suggested by the name of the file. This class possesses the
 * display class, which has the game class; therefore, per each game running on any client machine, this is the controlling class that
 * does entirely under-the-hood logic.
 */
import ClientGameDisplay from "./ClientGameDisplay";
var constants = require('../sharedConstants/constants');

export default class IO {

    /**
     * Constructs the game, but doesn't set up the connection for the game, see setupConnection for that
     * @param {number} width the width of the screen to be constructed
     * @param {number} height the height of the screen to be constructed
     */
    constructor(width, height) {
        this.socket = io();
        this.view = new ClientGameDisplay(width, height, function(userInput) {
            socket.emit('input', userInput); //this simply passes on the input directly to the server, TODO: change this?
        })
    }

    /**
     * This method actually creates all of the proper connection functions to the main server. It sets up a bunch of callbacks and
     * defines all of the behavior that this game takes in terms of connection. Call this function when you're ready for connections,
     * maybe once all assets have been loaded or something.
     */
    setupConnection() {
        
        var id;
        var hand;
        socket.on('player id', function(idNum) {
            id = idNum;
            socket.emit('deck', null);//there's no deck currently, TODO: add that functionality later
        });
        
        socket.on('starting hand', function(playerHand) {
            hand = playerHand.cards;
            socket.emit('mulligan', {replace: []});//disabling mulligans for now, effectively, TODO: add that functionality later
        });

        socket.on('hand', function(input) {
            hand = input.cards;
        }); //after all of this, the game has started

        socket.on('events', function(event) {
            view.processEvent(event);
        });

        view.game.init(id, hand, constants.MIN_DECK_SIZE, constants.MIN_DECK_SIZE);//TODO: actually get the deck sizes
    }

}