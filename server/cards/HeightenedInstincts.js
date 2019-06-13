var Spell = require('../Spell');
var Effect = require('../Effect');

class HeightenedInstincts extends Spell {

    constructor() {
        super(32, 'spell', 'common', 'Heightened Instincts', 2, false, false, false);
        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Heightened Instincts',
            func: function(input, game, eventChain) {
                let effect = new Effect();
                effect.hasCardDraw = true;
                effect.player = game.currentPlayer.id;
                effect.addCardDraw({
                    name: 'untitled',
                    func: function(input, game, eventChain) {
                        if(game.currentPlayer.id == effect.player && game.currentPlayer.hand[0].type == 'monster') {

                            let powerGained = 4; //THIS IS THE AMOUNT THAT THE CARD BOOSTS BY

                            game.currentPlayer.hand[0].currentPower += powerGained;

                            let event = {
                                type: 'hand boost',
                                target: 0,
                                boost: powerGained,
                            };

                            eventChain.push(event);

                            game.currentPlayer.effects = game.currentPlayer.effects.filter(value => value == effect?true:false); //Remove the effect once it goes off.
                        }
                    }
                });

                game.currentPlayer.effects.push(effect);
            }
        });
    }

}

module.exports = HeightenedInstincts;