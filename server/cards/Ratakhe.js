let Monster = require('../Monster');

class Ratakhe extends Monster {

    constructor() {
        super('monster', 7, 'monster', 'legendary', 'Ratakhe The Failure', 4, 4, 'advisor');

        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Ratakhe Signature',
            func: function(input, game, eventChain){

                for(let i = 0; i < 7; i++){
                    game.drawCard(game.otherPlayer, eventChain);
                }
 
            }
        });
    }
}

module.exports = Ratakhe;