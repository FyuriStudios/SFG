let Effect = require('../Effect');
let constants = require('../../constants/constants');

module.exports = {
    name: 'Forsee',
    func: function(input, game, eventChain, amount, choice) {
        let forseeEffect = new Effect();
        forseeEffect.amount = amount;
        forseeEffect.creationDate = game.turnCounter;
        forseeEffect.choice = choice;

        forseeEffect.hasTurnIncrement = true;
        forseeEffect.addTurnIncrement({
            name: 'Forsee Effect',
            func: function(input, game, eventChain) {
                if(game.turnCounter == forseeEffect.creationDate + 4) {
                    let event = {
                        type: 'gain tokens',
                        player: game.currentPlayer.id,
                        tokenType: forseeEffect.choice,
                        view: 1,
                    };

                    eventChain.push(event);

                    if(forseeEffect.choice == 'monster') {
                        game.currentPlayer.mToks += forseeEffect.amount;
                    }
                    else if(forseeEffect.choice == 'action') {
                        game.currentPlayer.sToks += forseeEffect.amount;
                    }

                    if(forseeEffect.choice == 'monster') {
                        if (game.currentPlayer.mToks >= constants.MAX_TOKS - forseeEffect.amount) {
                            var currMToks = temp.sToks;
                            game.currentPlayer.mToks = constants.MAX_TOKS;
                            event.amount = constants.MAX_TOKS - currMToks;
                        } else {
                            game.currentPlayer.mToks += forseeEffect.amount;
                            event.amount = forseeEffect.amount;
                        }
                    }
                    else if(forseeEffect.choice == 'action') {
                        if (game.currentPlayer.sToks >= constants.MAX_TOKS - forseeEffect.amount) {
                            var currSToks = temp.sToks;
                            game.currentPlayer.sToks = constants.MAX_TOKS;
                            event.amount = constants.MAX_TOKS - currSToks;
                        } else {
                            game.currentPlayer.sToks += forseeEffect.amount;
                            event.amount = forseeEffect.amount;
                        }
                    }
            
                }
            }
        });

        game.currentPlayer.effects.push(forseeEffect);
    }
};
