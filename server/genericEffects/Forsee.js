let Effect = require('../Effect');

module.exports = {
    name: 'Forsee',
    func: function(input, game, eventChain, amount) {
        let forseeEffect = new ForseeEffect(game.turnCounter, input.choice, amount);

        game.currentPlayer.effects.push(effect);
    }
};

class ForseeEffect extends Effect {

    constructor(turnCounter, choice, amount) {
        this.tokenAmount = amount;
        this.creationDate = turnCounter;
        this.choice = choice;

        this.hasTurnIncrement = true;

        let eff = this;

        this.addTurnIncrement({
            name: 'Forsee Effect',
            func: function(input, game, eventChain) {
                if(game.turnCounter == eff.creationDate + 4) {
                    let event = {
                        type: 'gain tokens',
                        player: game.currentPlayer.id,
                        
                    }
                    if(eff.choice == 'monster') {

                    }
                    else if(eff.choice == 'spell') {

                    }
                }
            }
        });
    }
}