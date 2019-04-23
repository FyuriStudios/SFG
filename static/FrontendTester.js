
/*
This starts a test script on the view that draws one card and pipes user output through standard out rather than through a socket 
connection. We're using this for now until the entire frontend functionality is finished and we can connect to the backend.
*/
let test = function() {

    GameView.setupDisplay();

    GameView.setupOutput(function(output) {
        console.log(output);
    });
    
    setTimeout(() => {
        GameView.processEvent({type: 'draw card', player: 1});
        GameView.processEvent({type: 'draw card', player: 2});
    }, 1000);

    setTimeout(() => {
        GameView.processEvent({type: 'play card', player: 1, handLoc: 0, playLoc: 0});
    }, 3000);
    
};