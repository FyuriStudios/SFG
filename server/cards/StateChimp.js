let Monster = require('../Monster');
let CharacterHealing = require('../genericEffects/CharacterHealing');

class StateChimp extends Monster {

    constructor() {
        super('monster', 30, 'monster', 'common', 'State Chimp', 3, 2, 'cur', true);

        this.hasCardPlayed = true;

        let card = this;
        this.addCardPlayed({
            name: 'State Chimp Signature',
            func: function(input, game, eventChain) {
                CharacterHealing.func({}, game, eventChain, card.currentPower);
            }
        });
    }
}

module.exports = StateChimp;