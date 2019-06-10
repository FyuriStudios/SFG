let Monster = require('../Monster');
let Damage = require('../genericEffects/Damage');

class Poke extends Monster {

    constructor() {
        super('monster', 28, 'monster', 'common', 'Poke', 4, 3, 'crow')

        this.hasEntersBoard = true;
        let card = this;
        this.addEntersBoard({
           name: 'untitled',
           func: function(input, game, eventChain) {
               card.creationDate = game.turnCounter;
               card.id = game.otherPlayer.id;
           } 
        });

        this.hasTurnIncrement = true;
        this.addTurnIncrement({
            name: 'Poke Turn Increment',
            func: function(input, game, eventChain) {
                input.targetSide = card.id;
                input.target = -1;
                if(game.turnCounter%2 == (card.creationDate + 1)%2) {
                    Damage.func(input, game, eventChain, 1);
                }
            }
        });
    }
}

module.exports = Poke;