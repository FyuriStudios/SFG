var Spell = require('../Spell');

class OutOfLeftField extends Spell {

    constructor() {
        super(46, 'spell', 'legendary', 'Out of Left Field', 2, false, false, true);
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
            name: 'Left Field',
            func: function(input, game, eventChain) {
                if((game.turnCounter - card.creationDate)%4 == 0) {
                    if(game.otherPlayer.mToks > game.currentPlayer.mToks) {
                        eventChain.push({
                            type: 'gain tokens',
                            player: game.currentPlayer.id,
                            tokenType: 'monster',
                            view: 1,
                            amount: 1,
                        });

                        game.currentPlayer.mToks += 1;
                    }
                    if(game.otherPlayer.sToks > game.currentPlayer.sToks) {
                        eventChain.push({
                            type: 'gain tokens',
                            player: game.currentPlayer.id,
                            tokenType: 'action',
                            view: 1,
                            amount: 1,
                        });

                        game.currentPlayer.sToks += 1;
                    }
                }
            }
        });
    }

}

module.exports = OutOfLeftField;