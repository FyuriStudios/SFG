var Spell = require('../Spell');
let Damage = require('../genericEffects/Damage');

class SowChaos extends Spell {

    constructor() {
        super(22, 'spell', 'uncommon', 'Sow Chaos', 2, true, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Sow Chaos',
            func: function(input, game, eventChain) {

                let guyToDamage = (input.targetSide == 1?game.player1:game.player2).board[input.target];

                let damage = guyToDamage.currentPower;
                guyToDamage.currentPower = 0;

                eventChain.push({
                    type: 'damage',
                    player: game.currentPlayer.id,
                    targetSide: input.targetSide,
                    target: input.target,
                    damage: damage,
                });

                Damage.func({targetSide: game.currentPlayer.id, target: -1}, game, eventChain, damage);
            }
        });
    }

}

module.exports = SowChaos;