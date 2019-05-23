function startGame() {

    let socket = io();

    let gameVars = {};

    let passDeck = localStorage.getItem("deckStored");

    let deck = [];

    if (passDeck == "random") {
        deck.push(1);
        deck.push(2);
        deck.push(3);
        deck.push(4);
        deck.push(5);
        deck.push(6);
        deck.push(7);
        deck.push(8);
        deck.push(9);
        deck.push(10);
        deck.push(11);
        deck.push(12);
        deck.push(13);
        deck.push(14);
        deck.push(14);
        deck.push(14);
        deck.push(14);
        for (var i = 0; i < 2; i++)
            deck.push(-1);
        for (var i = 0; i < 2; i++)
            deck.push(-2);
    } else {
        deck = passDeck.split(', ').map(Number);
    }

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

        if (gameVars.id == 1) {
            ownDeckSize = input.player1DeckSize;
            enemyDeckSize = input.player2DeckSize;
        } else {
            ownDeckSize = input.player2DeckSize;
            enemyDeckSize = input.player1DeckSize;
        }


        GameView.setupDisplay(gameVars.id, ownDeckSize, enemyDeckSize, socket);
    })

    GameView.setupOutput(function (output) {
        socket.emit('event', output);
        console.log(output);
    });

    socket.on('event', (value) => {
        console.log(value);
        GameView.processEvent(value);
    })

}