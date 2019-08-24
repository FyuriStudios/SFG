var Spell = require('../Spell');
let Discard = require('../genericEffects/Discard');

class Rotation extends Spell {

    constructor() {
        super(56, 'spell', 'common', 'Rotation', 1, false, false, false, true);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Rotation Effect',
            func: function(input, game, eventChain){
                game.currentPlayer.hand.splice(input.target, 1)[0];
                eventChain.push({
                    type: 'remove hand card',
                    index: input.target,
                    player: game.currentPlayer.id
                });
                game.drawCard(game.currentPlayer, eventChain);
            }
        });
    }

}


module.exports = Rotation;