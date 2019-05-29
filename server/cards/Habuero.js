let Monster = require('../Monster');
let Damage = require('../genericEffects/Damage');

class Habuero extends Monster {

    constructor() {
        super('monster', 17, 'monster', 'secret weapon', 'Habuero', 10, 10, 'advisor', false, false, true);

        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Habuero Signature',
            func: function(input, game, eventChain) {
                
                let input1 = {
                    targetSide: 1,
                    target: -1
                };
                Damage.func(input1, game, eventChain, game.player1.health - 25);

                let input2 = {
                    targetSide: 2,
                    target: -1
                };
                Damage.func(input2, game, eventChain, game.player2.health - 25);
            }
        });
    }
}

module.exports = Habuero;