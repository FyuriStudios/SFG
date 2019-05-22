var Spell = require('../Spell');
var Damage = require('../genericEffects/Damage');

class WoundRegen extends Spell {

    constructor() {
        super(12, 'spell', 'uncommon', 'Wound Regeneration', 3, false, false, false);
        
        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Wound Regeneration',
            func: function(input, game, eventChain) {
                input.targetSide = game.currentPlayer.id;
                input.target = -1;
                Damage.func(input, game, eventChain, -10);
            }
        });
        
    }
}

module.exports = WoundRegen;