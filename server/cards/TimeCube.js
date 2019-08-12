var Spell = require('../Spell');
let Humiliate = require('../genericEffects/Humiliate');
let _ = require('lodash');

class TimeCube extends Spell {

    constructor() {
        super(50, 'spell', 'legendary', "Ryrin's Time Cube", 5, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Time Cube',
            func: function(input, game, eventChain) {

                game.currentPlayer.board.forEach((value, index) => {
                    Humiliate.func({
                        targetSide: game.currentPlayer.id,
                        target: index
                    }, game, eventChain);
                });

                game.otherPlayer.board.forEach((value, index) => {
                    Humiliate.func({
                        targetSide: game.otherPlayer.id,
                        target: index
                    }, game, eventChain);
                });
            }
        });
    }

}

module.exports = TimeCube;