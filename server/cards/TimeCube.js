var Spell = require('../Spell');
let Humiliate = require('../genericEffects/Humiliate');

class TimeCube extends Spell {

    constructor() {
        super(50, 'spell', 'legendary', "Ryrin's Time Cube", 5, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Time Cube',
            func: function(input, game, eventChain) {
                _.times(game.currentPlayer.board.length, Humiliate.func({targetSide: game.currentPlayer.id, target: index}, game, eventChain));

                _.times(game.otherPlayer.board.length, Humiliate.func({targetSide: game.otherPlayer.id, target: index}, game, eventChain));
            }
        });
    }

}

module.exports = TimeCube;