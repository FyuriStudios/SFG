let Monster = require('../Monster');
let Forsee = require('../genericEffects/Forsee');

class FranklinRosebud extends Monster {

    constructor() {
        super('monster', 53, 'monster', 'uncommon', 'Franklin Rosebud', 7, 6, 'mercenary', true);

        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Franklin Signature',
            func: function(input, game, eventChain) {
                Forsee.func(input, game, eventChain, 2, 'action');
            }
        });
    }
}

module.exports = FranklinRosebud;