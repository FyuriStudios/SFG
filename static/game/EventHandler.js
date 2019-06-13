function startGame() {

    let socket = io();

    let gameVars = {};

    let passDeck = localStorage.getItem("deckStored");
    let character = localStorage.getItem("character");

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
        //deck.push(12); Wound Regeneration only gets added back once its assets are done over.
        deck.push(13);
        deck.push(14);
        deck.push(15);
        deck.push(16);
        deck.push(17);
        deck.push(18);
        deck.push(19);
        deck.push(20);
        deck.push(21);
        deck.push(22);
        deck.push(23);
        deck.push(24);
        deck.push(25);
        deck.push(26);
        deck.push(27);
        deck.push(28);
        deck.push(29);
        deck.push(30);
        deck.push(31);
        deck.push(32);
        deck.push(33);
        deck.push(34);
    } else {
        deck = passDeck.split(', ').map(Number);
    }

    socket.once('player id', (input) => {
        gameVars.id = input;
        gameVars.ownCharacter = character;
        gameStarting = true;
        socket.emit('character', character);
    });

    socket.once('character', (input) => {
        gameVars.enemyCharacter = input;
        socket.emit('deck', deck);
    });

    socket.once('deck sizes', (input) => {
        gameVars.player1DeckSize = input.player1DeckSize;
        gameVars.player2Decksize = input.player2DeckSize;

        let ownDeckSize, enemyDeckSize;

        if (gameVars.id == 1) {
            gameVars.ownDeckSize = input.player1DeckSize;
            gameVars.enemyDeckSize = input.player2DeckSize;
        } else {
            gameVars.ownDeckSize = input.player2DeckSize;
            gameVars.enemyDeckSize = input.player1DeckSize;
        }
    })

    socket.once('start', (input) => {
        GameView.setupDisplay(gameVars.id, gameVars.ownDeckSize, gameVars.enemyDeckSize, socket, 'ignea', gameVars.enemyCharacter);
    });

    GameView.setupOutput(function (output) {
        socket.emit('event', output);
        console.log(output);
    });

    socket.on('event', (value) => {
        console.log(value);
        GameView.processEvent(value);
    })

}