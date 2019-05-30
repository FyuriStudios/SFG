var Spell = require('../Spell');
let Damage = require('../genericEffects/Damage');
let CharacterHealing = require('../genericEffects/CharacterHealing');

class BestialSupport extends Spell {

    constructor() {
        super(21, 'spell', 'uncommon', 'Bestial Support', 3, false, false, false);

        this.hasCardPlayed = true;
        this.addCardPlayed({
           name: 'Bestial Support',
           func: function(input, game, eventChain) {

                let input1 = {
                    targetSide: 1,
                    target: -1
                };
                Damage.func(input1, game, eventChain, 4);

                let input2 = {
                    targetSide: 2,
                    target: -1
                };
                Damage.func(input2, game, eventChain, 4);

                let hasCur = false;
                game.currentPlayer.board.forEach(value => value.monsterClass == 'cur' ? hasCur = true: null);

                if(hasCur) {
                    CharacterHealing.func({targetSide: game.currentPlayer.id}, game, eventChain, 8);
                }
           } 
        });
    }

}

module.exports = BestialSupport;