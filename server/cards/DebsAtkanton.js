let Monster = require('../Monster');
let Boost = require('../genericEffects/Boost');

class DebsAtkanton extends Monster {

    constructor() {
        super('monster', 47, 'monster', 'common', 'Debs Atkanton', 2, 1, 'advisor', false, false, true, false, true);
        this.hasCardPlayed = true;
        this.addCardPlayed = ({
            name: 'Debs Signature',
            func: function(input, game, eventChain){
                Boost.func(input, game, eventChain, 2);
            }
        });
    }
}

module.exports = DebsAtkanton;