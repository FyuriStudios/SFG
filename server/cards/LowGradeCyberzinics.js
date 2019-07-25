var Spell = require('../Spell');
let Boost = require('../genericEffects/Boost');

class LowGradeCyberzinics extends Spell {

    constructor() {
        super(44, 'spell', 'common', 'Low-grade, Cyberzinics', 3, true, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'cyberzinic effect',
            func: function(input, game, eventChain){
                Boost.func(input, game, eventChain, 4);
            }
        });
    }

}

module.exports = LowGradeCyberzinics;