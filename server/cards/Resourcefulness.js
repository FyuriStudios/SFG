var Spell = require('../Spell');
let Damage = require('../genericEffects/Damage');

class Resourcefullness extends Spell {

    constructor() {
        super(58, 'spell', 'common', 'Resourcefullness', 6, true, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Resourcefullness',
            func: function(input, game, eventChain){
                
                let temp;
                let amount;

                if(input.targetSide == game.currentPlayer.id){
                    temp = game.currentPlayer.board.splice(input.target, 1)[0];
                    amount = temp.currentPower;
                    temp.currentPower = temp.power;
                    game.currentPlayer.graveyard.push(temp);

                    let damageIndex = Math.floor(Math.random() * (game.otherPlayer.board.length + 1) - 1);
                    Damage.func({
                        targetSide: game.otherPlayer.id,
                        target: damageIndex,
                    }, game, eventChain, amount);

                    eventChain.push({
                        type: 'kill dead',
                        target: input.target,
                        targetSide: input.targetSide
                    });
                }

            }
        });
    }

}

module.exports = Resourcefullness;