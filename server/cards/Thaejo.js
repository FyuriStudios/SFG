let Monster = require('../Monster');
var Heal = require('../genericEffects/CharacterHealing');

class Thaejo extends Monster {

    constructor() {
        super('monster', 49, 'monster', 'common', 'Thaejo', 6, 3, 'crow', true);
        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Thaejo Signature',
            func: function(input, game, eventChain){
                Heal.func({}, game, eventChain, 10);
            }
        });
    }
}

module.exports = Thaejo;