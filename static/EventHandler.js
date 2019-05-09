function startGame() {

    console.log('yeah');

    let socket = io();

    let gameVars = {};

    let deck = [];

    for(var i = 0; i< 20; i++)
        deck.push(-1);

    socket.emit('deck', deck);

    socket.on('player id', (input) => {
        gameVars.id = input;
    });

    socket.on('deck sizes', (input) => {
        gameVars.player1DeckSize = input.player1DeckSize;
        gameVars.player2Decksize = input.player2DeckSize;

        GameView.setupDisplay(gameVars.id, gameVars.id == 1?gameVars.player1DeckSize:gameVars.player2DeckSize, gameVars.id == 2?gameVars.player1DeckSize:gameVars.player2DeckSize);
    })

    GameView.setupOutput(function(output) {
        socket.emit('event', output);
        console.log(output);
    });

}