function startGame() {

    let socket = io();

    let gameVars = {};

    let passDeck = localStorage.getItem("deckStored");

    let deck = [];

    let character = 'ignea';

    if (passDeck == "random") {
        deck.push(45);
        deck.push(45);
        deck.push(45);
        deck.push(45);
        deck.push(45);
       
        deck.push(48);
        deck.push(48);
        deck.push(48);
        deck.push(48);
        deck.push(48);
      
        deck.push(47);
        deck.push(47);
        deck.push(47);
        deck.push(47);
        deck.push(47);

        deck.push(50);
        deck.push(50);
        deck.push(50);
        deck.push(50);
    } else {
        deck = passDeck.split(', ');
        character = deck.shift();
        deck = deck.map(Number);
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
        GameView.setupDisplay(gameVars.id, gameVars.ownDeckSize, gameVars.enemyDeckSize, socket, gameVars.ownCharacter, gameVars.enemyCharacter);
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