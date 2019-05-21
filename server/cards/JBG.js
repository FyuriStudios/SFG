let Monster = require('../Monster');
let Damage = require('../genericEffects/Damage');

class JBG extends Monster { //Fix this guy.

    constructor() {
        super('monster', 3, 'monster', 'legendary', 'Jasper the Obsessed', 5, 6, 'advisor', false, true);

        this.hasSelfAttack = true;

        this.addSelfAttack({
            name: 'JBG attack',

            func: function(input, game, eventChain) {

                game.drawCard(game.player1, eventChain);

                game.drawCard(game.player2, eventChain);
            }
        });
    }
}

module.exports = JBG;