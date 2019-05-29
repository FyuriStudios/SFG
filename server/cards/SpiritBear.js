let Monster = require('../Monster');

class SpiritBear extends Monster {

    constructor() {
        super('monster', 26, 'monster', 'common', 'Spirit Bear', 6, 5, 'cur', false, false, false, false, true);

        this.hasEntersBoard = true;
        let card = this;
        this.addEntersBoard({
            name: 'untitled',
            func: function(input, game, eventChain) {
                card.creationDate = game.turnCounter;
            }
        });

        this.hasTurnIncrement = true;
        this.addTurnIncrement({
            name: 'untitled',
            func: function(input, game, eventChain) {
                if(game.turnCounter%4 == (card.creationDate + 2)%4) {
                    card.actionTargetable = false;
                }
                else if(game.turnCounter%4 == card.creationDate%4){
                    card.actionTargetable = true;
                }
            }
        });

    }
}

module.exports = SpiritBear;