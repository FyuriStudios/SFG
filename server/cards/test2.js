var Spell = require('../Spell');

class test extends Spell {

    constructor() {
        super(-2, 'spell', 'test', 'test', 3, true);
        this.hasCardPlayed = true;
        this.addCardPlayed(damageWrapper);
    }

}

let damageWrapper = {
    name: 'damage',
    
    func: function(input, game, eventChain) {
        let damage = require('../genericEffects/Damage');

        damage.func(input, game, eventChain, 4);
    }
}

module.exports = test;