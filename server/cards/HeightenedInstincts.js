var Spell = require('../Spell');
var Effect = require('../Effect');

class HeightenedInstincts extends Spell {

    constructor() {
        super(32, 'spell', 'common', 'Heightened Instincts', 2, false, false, false);
        this.hasCardPlayed = true;

        let card = this;
        this.addCardPlayed({
            name: 'Heightened Instincts',
            func: function(input, game, eventChain) {

                card.player = game.currentPlayer.id;

                let effect = new Effect();
                effect.hasCardDraw = true;
                effect.player = game.currentPlayer.id;
                effect.addCardDraw({
                    name: 'untitled',
                    func: function(input, game, eventChain) {
                        if(eventChain[eventChain.length].player == card.player && (card.player == 1? game.player1.hand:game.player2.hand)[0].type == 'monster') {

                            let powerGained = 4; //THIS IS THE AMOUNT THAT THE CARD BOOSTS BY

                            let hand;
                            if(card.player == 1)
                                hand = game.player1.hand;
                            else
                                hand = game.player2.hand;

                            hand[0].currentPower += powerGained; 

                            let event = {
                                type: 'hand boost',
                                target: 0,
                                boost: powerGained,
                                player: card.player
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