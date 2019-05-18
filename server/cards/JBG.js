let Monster = require('../Monster');
let Damage = require('../genericEffects/Damage');

class JBG extends Monster {

    constructor() {
        super('monster', 3, 'monster', 'legendary', 'Jasper the Obsessed', 5, 6, 'advisor', false, true);

        this.hasSelfAttack = true;

        this.addSelfAttack({
            name: 'JBG attack',

            func: function(input, game, eventChain) {

                let card = game.player1.deck.pop();
                game.player1.hand.unshift(card);

                let event1 = {
                    type: 'draw card',
                    player: 1,
                    card: card,
                    view: 2,
                }

                card = game.player2.deck.pop();
                game.player2.hand.unshift(card);

                let event2 = {
                    type: 'draw card',
                    player: 2,
                    card: card,
                    view: 2,
                }

                eventChain.push(event2, event1);
            }
        });
    }
}

module.exports = JBG;