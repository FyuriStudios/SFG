var Spell = require('../Spell');
let Damage = require('../genericEffects/Damage');
let Effect = require('../Effect');
let Discard = require('../genericEffects/Discard');

class test extends Spell {

    constructor() {
        super(23, 'spell', 'uncommon', 'Strenuous Path', 1, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Strenuous Path',
            func: function(input, game, eventChain) {
                
                Damage.func({targetSide: game.currentPlayer.id, target: -1}, game, eventChain, 3);

                let effect = new Effect();
                effect.hasCardDraw = true;
                effect.creationDate = game.turnCounter;
                effect.addCardDraw({
                    name: 'untitled',
                    func: function(input, game, eventChain) {
                        if(game.turnCounter <= effect.creationDate + 5) {
                            Discard.func({player: input.player, index: 0}, game, eventChain);
                        }
                    }
                });

                game.currentPlayer.effects.push(effect);
            } 
        });
    }

}

module.exports = test;