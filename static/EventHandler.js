function startGame() {
    let socket = io();

    let gameVars = {};

    socket.on('player id', (input) => {
        gameVars.id = input;
    });

    

}