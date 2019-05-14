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
        require('../genericEffects/Damage')(input, game, eventChain, 1 /*1 is the damage that this spell deals.*/);
    }
}