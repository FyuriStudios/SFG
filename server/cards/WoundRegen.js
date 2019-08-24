var Spell = require('../Spell');
var Heal = require('../genericEffects/CharacterHealing');


class WoundRegen extends Spell {

    constructor() {
        super(12, 'spell', 'common', 'Wound Regeneration', 6, false, false, false);
        
        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Wound Regeneration',
            func: function(input, game, eventChain) {
                Heal.func({targetSide: game.currentPlayer.id}, game, eventChain, 8);
                game.drawCard(game.currentPlayer, eventChain);
            }
        });
        
    }
}

module.exports = WoundRegen;