
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
        GameView.processEvent({type: 'draw card', player: 1});
    }, 2000);

    setTimeout(() => {
        GameView.processEvent({type: 'draw card', player: 1});
    }, 3000);

    setTimeout(() => {
        GameView.processEvent({type: 'draw card', player: 1});
    }, 4000);

    setTimeout(() => {
        GameView.processEvent({type: 'draw card', player: 1});
    }, 5000);

    setTimeout(() => {
        GameView.processEvent({type: 'play card', player: 1, handLoc: 0, playLoc: 0});
    }, 7000);

    setTimeout(() => {
        GameView.processEvent({type: 'play card', player: 1, handLoc: 0, playLoc: 0});
    }, 8000);

    setTimeout(() => {
        GameView.processEvent({type: 'play card', player: 1, handLoc: 0, playLoc: 0});
    }, 9000);

    setTimeout(() => {
        GameView.processEvent({type: 'play card', player: 1, handLoc: 0, playLoc: 0});
    }, 10000);
    
};