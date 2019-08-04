var Spell = require('../Spell');
let Effect = require('../Effect');

class Flank extends Spell {

    constructor() {
        super(60, 'spell', 'common', 'Flank', 3, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Flank Effect',
            func: function(input, game, eventChain) {

                let removeDefender = (value) => {
                    if(value.hasDefender) {
                        value.hadDefender = true;
                        value.hasDefender = false;
                    }
                };

                game.currentPlayer.board.forEach(removeDefender);
                game.otherPlayer.board.forEach(removeDefender);

                let newEffect = new Effect();

                newEffect.creationDate = game.turnCounter;

                newEffect.hasTurnIncrement = true;
                newEffect.addTurnIncrement({
                    name: 'untitled',
                    func: function(input, game, eventChain) {
                        if(game.turnCounter == newEffect.creationDate + 4) {

                            let addDefender = (value) => {
                                if(value.hadDefender) {
                                    value.hasDefender = true;
                                    value.hadDefender = undefined;
                                }
                            };
                            game.currentPlayer.board.forEach(addDefender);
                            game.otherPlayer.board.forEach(addDefender);
                        }
                    }
                });
            }

        });
    }

}

module.exports = Flank;