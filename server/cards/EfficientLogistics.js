var Spell = require('../Spell');
let Forsee = require('../genericEffects/Forsee');

class EfficientLogistics extends Spell {

    constructor() {
        super(55, 'spell', 'common', 'Efficient Logistics', 3, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed = ({
            name: 'Efficient Logistics Effect',
            func: function(input, game, eventChain){
                Forsee.func(input, game, eventChain, 3, 'monster');
            }
        });
    }

}

module.exports = EfficientLogistics;