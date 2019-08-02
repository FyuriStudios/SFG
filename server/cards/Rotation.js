var Spell = require('../Spell');
let Discard = require('../genericEffects/Discard');

class Rotation extends Spell {

    constructor() {
        super(56, 'spell', 'common', 'Rotation', 1, false, false, false)
        this.hasCardPlayed = true;
        this.addCardPlayed = ({
            name: 'Rotation Effect',
            func: function(input, game, eventChain){
                Discard.func({player: game.currentPlayer.id, index:}, game, eventChain);

            }
        });
    }

}


module.exports = Rotation;