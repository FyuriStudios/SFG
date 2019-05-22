var Spell = require('../Spell');
var Damage = require('../genericEffects/Damage');
var constants = require('../../constants/constants');

class WoundRegen extends Spell {

    constructor() {
        super(12, 'spell', 'uncommon', 'Wound Regeneration', 3, false, false, false);
        
        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Wound Regeneration',
            func: function(input, game, eventChain) {
                input.targetSide = game.currentPlayer.id;
                input.target = -1;
                
                let healthGain = 10;

                if(constants.STARTING_HEALTH - game.currentPlayer.health < healthGain) {
                    healthGain = constants.STARTING_HEALTH - game.currentPlayer.health;
                }

                Damage.func(input, game, eventChain, -healthGain);
            }
        });
        
    }
}

module.exports = WoundRegen;