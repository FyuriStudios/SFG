let Effect = require('../Effect');

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
                        amount: forseeEffect.amount,
                    };

                    eventChain.push(event);

                    if(forseeEffect.choice == 'monster') {
                        game.currentPlayer.mToks += forseeEffect.amount;
                    }
                    else if(forseeEffect.choice == 'action') {
                        game.currentPlayer.sToks += forseeEffect.amount;
                    }
                }
            }
        });

        game.currentPlayer.effects.push(forseeEffect);
    }
};
