/**
 * This class exists to deal with the input/output to and from the backend. It should be instantiated only as a object of the ClientGame
 * class that will be handling the game data and logic. This class is supposed to be an intermediary that makes it more readable in
 * the ClientGame file to work with network stuff.
 */
export default class IO {

    constructor() {
        this.socket = io();
    }

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

        game = new ClientGame(id, hand, 10 /*TODO: add a way to get sent back your deck size*/, 10);

        socket.on('events', function(event) {
            game.processEvent(event);
            if(game.currentPlayer == game.id) {
                game.outputQueue(socket);
            }
        });

        return {hand: hand, id: id};
    }

}