/**
 * This file exists to deal with the input/output to and from the backend. It should be the controlling file of the frontend.
 */
    
setupDisplay();   

let socket = io();
    
function setupConnection() {
        
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

    hand = hand.map((card) => {
        return card.type == 'monster' ? new Monster(card): new Spell(card);
    });

    game.init(id, hand, 30, 30);

    socket.on('events', function(event) {
        processEvent(event);
        if(game.currentPlayer == game.id) {
            game.outputQueue(socket);
        }
    });

        
}
