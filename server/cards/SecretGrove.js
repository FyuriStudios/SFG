var Spell = require('../Spell');

class SecretGrove extends Spell {

    constructor() {
        super(6, 'spell', 'common', 'Secret Grove', 6, false, true);

        this.hasCardPlayed = true;
        this.addCardPlayed(forseeWrapper);
    }

}

let forseeWrapper = {
    name: 'Forsee',
    
    func: function(input, game, eventChain) {
        let Forsee = require('../genericEffects/Forsee');
        Forsee.func(input, game, eventChain, 6, 'monster');
    }
}

module.exports = SecretGrove;