let Monster = require('../Monster');

class Melody extends Monster {

    constructor() {

        super('monster', 1, 'monster', 'legendary', 'Melody', 6, 2, 'mercenary', false, true);
        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Melody Signature',
            func: function(input, game, eventChain) {

                let mantraIndex = -1;
                game.currentPlayer.deck.forEach((value, index) => {
                    if(value.name == 'Mantra') {
                        mantraIndex = index;
                    }
                });

                if(mantraIndex != -1) {
                    let mantra = game.currentPlayer.deck.splice(mantraIndex, 1)[0];
                    game.currentPlayer.board.unshift(mantra);

                    let event = {
                        type: 'deck invoke',
                        player: game.currentPlayer.id,
                        card: game.backendCardTranslate(mantra),
                    };

                    eventChain.push(event);
                }
                else {
                    game.currentPlayer.hand.forEach((value, index) => {
                        if(value.name == 'Mantra') {
                            mantraIndex = index;
                        }
                    });

                    if(mantraIndex != -1) {
                        let mantra = game.currentPlayer.hand.splice(mantraIndex, 1)[0];
                        game.currentPlayer.board.unshift(mantra);
    
                        let event = {
                            type: 'hand invoke',
                            player: game.currentPlayer.id,
                            handLoc: mantraIndex,
                            card: game.backendCardTranslate(mantra),
                        };
    
                        eventChain.push(event);
                    }

                }
            }
        });

        this.hasSelfAttack = true;

        let temp = this;

        this.addSelfAttack({
            name: 'Melody Attack',
            func: function(input, game, eventChain) {
                temp.currentPower += 1;

                let melodyIndex;
                game.currentPlayer.board.forEach((value, index) => value == temp? melodyIndex = index:null);

                let boostEvent = {
                    type: 'boost',
                    targetSide: game.currentPlayer.id,
                    target: melodyIndex,
                    boost: 1
                };

                eventChain.push(boostEvent);
            }
        });
 
    }


}

module.exports = Melody;