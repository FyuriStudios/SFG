let test = function() {
    GameView.setupDisplay();

    GameView.setupOutput(function(output) {
        console.log(output);
    });
    
    setTimeout(() => {GameView.processEvent({type: 'draw card'});}, 1000)
    
};