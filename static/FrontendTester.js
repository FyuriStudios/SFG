let test = function() {
    GameView.setupDisplay();

    GameView.setupOutput(function(output) {
        console.log(output);
    });

    GameView.processEvent({
        type: 'draw card', 
        player: 1,

    });
};