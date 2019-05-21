var Spell = require('../Spell');

class SanguineMire extends Spell {

    constructor() {
        super(8, 'spell', 'legendary', 'Sanguine Mire', 6, false, false, true);

        this.hasCardPlayed = true;

        let card = this;
        this.addCardPlayed({
            name: 'untitled',
            func: function(input, game, eventChain) {
                card.creationDate = game.turnCounter;
            }
        });

        this.hasTurnIncrement = true;

        this.addTurnIncrement({
            name: 'Sanguine Effect',
            func: function(input, game, eventChain) {
                if((card.creationDate-game.turnCounter)%4 == 0){
                    let damage = require('../genericEffects/Damage');
                    damage.func({
                        targetSide: game.otherPlayer.id,
                        target: -1
                    }, game, eventChain, 4);
                    damage.func({
                        targetSide: game.currentPlayer.id,
                        target: -1
                    }, game, eventChain, 3);
                }
            }
        });
    }
}


module.exports = SanguineMire;