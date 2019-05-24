var Spell = require('../Spell');
let Boost = require('../genericEffects/Boost');

class TwilightFog extends Spell {

    constructor() {
        super(20, 'spell', 'legendary', 'Twilight Fog', 5, false, false, false);
        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Twilight Fog',
            func: function(input, game, eventChain) {

                game.currentPlayer.board.forEach((value, index) => {
                    if(value.monsterClass == 'cur')
                        Boost.func({targetSide: game.currentPlayer.id, target: index}, game, eventChain, 2);
                });
            }
        });
    }

}

module.exports = TwilightFog;