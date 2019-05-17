let Monster = require('../Monster');
let Game = require('../Game');

class Mantra extends Monster {

    constructor() {

        super('monster', 1, 'monster', 'legendary', 'Mantra', 6, 3, 'mercenary', true, false);
        this.hasCardPlayed = true;
        
        this._currentPower = this.currentPower;
        this.currentPower = undefined;

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
                        card: Game.backendCardTranslate(melody),
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
                            card: Game.backendCardTranslate(mantra),
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
        if(value == this._currentPower -1 || value == this.currentPower -2) {
            return;
        }
        else if(value < this._currentPower - 2) {
            this._currentPower = value + 2;
        }
        else if(value >= this._currentPower) {
            this._currentPower = value;
        }
    }

}

module.exports = Mantra;