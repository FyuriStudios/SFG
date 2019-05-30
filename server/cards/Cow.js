let Monster = require('../Monster');
let Damage = require('../genericEffects/Damage');

class Cow extends Monster {

    constructor() {
        super('monster', 19, 'monster', 'legendary', 'Cow', 6, 8, 'Cur');
        this.isStatic = true;

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
            name: 'Cow Turn Increment',
            func: function(input, game, eventChain) {

                if(game.turnCounter%4 == (card.creationDate + 1)%4) {

                    let damageIndex = Math.floor(Math.random() * (game.otherPlayer.board.length + 1) - 1);
                    Damage.func({
                        targetSide: game.otherPlayer.id,
                        target: damageIndex,
                    }, game, eventChain, card.currentPower);
                }
            }
        });
    }
}

module.exports = Cow;