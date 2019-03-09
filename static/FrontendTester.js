let test = function() {
    GameView.setupDisplay();

    GameView.setupOutput(function(output) {
        console.log(output);
    });
    
    setTimeout(() => {GameView.processEvent({type: 'draw card', player: 1});}, 1000)
    
};