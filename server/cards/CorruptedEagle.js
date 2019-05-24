let Monster = require('../Monster');
let Damage = require('../genericEffects/Damage');

class CorruptedEagle extends Monster {

    constructor() {
        super('monster', 25, 'monster', 'common', 'Corrupted Eagle', 5, 3, 'cur', false, false, true, false, false);

        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Corrupted Eagle Signature',
            func: function(input, game, eventChain) {
                Damage.func(input, game, eventChain, this.currentPower);
            }
        });
    }
}

module.exports = CorruptedEagle;