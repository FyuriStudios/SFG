
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
        GameView.processEvent({type: 'draw card', player: 1, card: {
            type: 'monster',
            id: -1,
            tokenType: 'monster',
            rarity: 'common',
            name: 'Test Card',
            cost: 3,
            power: 3,
            hasDefender: false,
            isStatic: false
        }});
            
        GameView.processEvent({type: 'draw card', player: 2});
    }, 1000);

    setTimeout(() => {
        GameView.processEvent({type: 'draw card', player: 1, card: {
            type: 'monster',
            id: -1,
            tokenType: 'monster',
            rarity: 'common',
            name: 'Test Card',
            cost: 3,
            power: 3,
            hasDefender: false,
            isStatic: false
        }});

        GameView.processEvent({type: 'draw card', play: 2});
    }, 2000);

    setTimeout(() => {
        GameView.processEvent({type: 'draw card', player: 1, card: {
            type: 'monster',
            id: -1,
            tokenType: 'monster',
            rarity: 'common',
            name: 'Test Card',
            cost: 3,
            power: 4,
            hasDefender: false,
            isStatic: false
        }});
    }, 3000);

    setTimeout(() => {
        GameView.processEvent({type: 'draw card', player: 1, card: {
            type: 'monster',
            id: -1,
            tokenType: 'monster',
            rarity: 'common',
            name: 'Test Card',
            cost: 3,
            power: 4,
            hasDefender: false,
            isStatic: false
        }});
    }, 4000);

    setTimeout(() => {
        GameView.processEvent({type: 'draw card', player: 1, card: {
            type: 'monster',
            id: -1,
            tokenType: 'monster',
            rarity: 'common',
            name: 'Test Card',
            cost: 3,
            power: 3,
            hasDefender: false,
            isStatic: false
        }});
        GameView.processEvent({type: 'draw card', player: 2});
    }, 5000);

    setTimeout(() => {
        GameView.processEvent({type: 'play card', player: 1, handLoc: 0, playLoc: 0});
        GameView.processEvent({type: 'play card', player: 2, handLoc: 0, playLoc: 0, card: {
            type: 'monster',
            id: -1,
            tokenType: 'monster',
            rarity: 'common',
            name: 'Test Card',
            cost: 3,
            power: 3,
            hasDefender: false,
            isStatic: false
        }});
    }, 7000);

    setTimeout(() => {
        GameView.processEvent({type: 'play card', player: 1, handLoc: 0, playLoc: 0});
        GameView.processEvent({type: 'play card', player: 2, handLoc: 0, playLoc: 0, card: {
            type: 'monster',
            id: -1,
            tokenType: 'monster',
            rarity: 'common',
            name: 'Test Card',
            cost: 3,
            power: 3,
            hasDefender: false,
            isStatic: false
        }});
    }, 8000);

    setTimeout(() => {
        GameView.processEvent({type: 'play card', player: 1, handLoc: 0, playLoc: 0});
        GameView.processEvent({type: 'play card', player: 2, handLoc: 0, playLoc: 0, card: {
            type: 'monster',
            id: -1,
            tokenType: 'monster',
            rarity: 'common',
            name: 'Test Card',
            cost: 3,
            power: 3,
            hasDefender: false,
            isStatic: false
        }});
    }, 9000);

    setTimeout(() => {
        GameView.processEvent({type: 'play card', player: 1, handLoc: 0, playLoc: 0});
    }, 10000);

    setTimeout(() => {
        GameView.processEvent({type: 'attack', player: 1, attacker: 0, target: 0});
    }, 11000);

    setTimeout(() => {
        GameView.processEvent({type: 'kill dead', player: 2, target: 0});
    }, 13000); 

    setTimeout(() => {
        GameView.processEvent({type: 'kill dead', player: 2, target: 0});
    }, 14000);

    setTimeout(() => {
        GameView.processEvent({type: 'kill dead', player: 2, target: 0});
    }, 15000);
    
};