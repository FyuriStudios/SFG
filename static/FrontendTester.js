
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
    
            GameView.processEvent({type: 'play card', player: 1, handLoc: 0, playLoc: 0});
    
            GameView.processEvent({type: 'attack', player: 1, attacker: 0, target: 0});
    
            GameView.processEvent({type: 'kill dead', player: 2, target: 0});
    
            GameView.processEvent({type: 'kill dead', player: 2, target: 0});
    
            GameView.processEvent({type: 'kill dead', player: 2, target: 0});

            GameView.processEvent({type: 'kill dead', player: 1, target: 0});
    }, 1000);
    
};