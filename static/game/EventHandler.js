function startGame() {

    let socket = io();

    let gameVars = {};

    let deck = [];

    for(var i = 0; i< 10; i++)
        deck.push(-1);
    for(var i = 0; i<10; i++)
        deck.push(-2);

    socket.on('player id', (input) => {
        gameVars.id = input;
        console.log('received id');
        gameStarting = true;
        socket.emit('deck', deck);
    });

    socket.on('deck sizes', (input) => {
        gameVars.player1DeckSize = input.player1DeckSize;
        gameVars.player2Decksize = input.player2DeckSize;

        let ownDeckSize, enemyDeckSize;

        if(gameVars.id == 1) {
            ownDeckSize = input.player1DeckSize;
            enemyDeckSize = input.player2DeckSize;
        }
        else {
            ownDeckSize = input.player2DeckSize;
            enemyDeckSize = input.player1DeckSize;
        }


        GameView.setupDisplay(gameVars.id, ownDeckSize, enemyDeckSize);
    })

    GameView.setupOutput(function(output) {
        socket.emit('event', output);
        console.log(output);
    });

    socket.on('event', (value) => {
        console.log(value);
        GameView.processEvent(value);
    })

}