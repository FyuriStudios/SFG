let Monster = require('../Monster');
let Humiliate = require('../genericEffects/Humiliate');

class AchtungPanzer extends Monster {

    constructor() {
        super('monster', 48, 'monster', 'common', 'Achtung Panzer', 4, 2, 'crow');
        this.hasCardPlayed = true;

        this.addCardPlayed = ({
            name: 'Achtung Signature',
            func: function(input, game, eventChain){
                Humiliate.func(input, game, eventChain);
            }
        });
    }
}

module.exports = AchtungPanzer;