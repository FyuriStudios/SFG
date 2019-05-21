let Monster = require('../Monster');

class Mantra extends Monster {

    constructor() {

        super('monster', 2, 'monster', 'legendary', 'Mantra', 6, undefined, 'mercenary', true, false);
        this.hasCardPlayed = true;
        
        this.power = 3;
        this._currentPower = 3;

        this.addCardPlayed({
            name: 'Mantra Signature',
            func: function(input, game, eventChain) {

                let melodyIndex = -1;
                game.currentPlayer.deck.forEach((value, index) => {
                    if(value.name == 'Melody') {
                        melodyIndex = index;
                    }
                });

                if(melodyIndex != -1) {
                    let melody = game.currentPlayer.deck.splice(melodyIndex, 1)[0];
                    game.currentPlayer.board.unshift(melody);

                    let event = {
                        type: 'deck invoke',
                        player: game.currentPlayer.id,
                        card: game.backendCardTranslate(melody),
                    };

                    eventChain.push(event);
                }
                else {
                    game.currentPlayer.hand.forEach((value, index) => {
                        if(value.name == 'Melody') {
                            melodyIndex = index;
                        }
                    });

                    if(melodyIndex != -1) {
                        let melody = game.currentPlayer.hand.splice(melodyIndex, 1)[0];
                        game.currentPlayer.board.unshift(melody);
    
                        let event = {
                            type: 'hand invoke',
                            player: game.currentPlayer.id,
                            handLoc: melodyIndex,
                            card: game.backendCardTranslate(melody),
                        };
    
                        eventChain.push(event);
                    }

                }
            }
        });
 
    }

    get currentPower() {
        return this._currentPower;
    }

    set currentPower(value) {

        if(this._currentPower - value <= 2 && !(value > this._currentPower)) {
            return;
        }
        else if(value > this._currentPower) {
            this._currentPower = value;
        }
        else {
            this._currentPower = value + 2;
        }
    }

}

module.exports = Mantra;