let Monster = require('../Monster');
let Damage = require('../genericEffects/Damage');

class CorruptedEagle extends Monster {

    constructor() {
        super('monster', 25, 'monster', 'common', 'Corrupted Eagle', 5, 3, 'cur');

        this.hasCardPlayed = true;

        let card = this;

        this.addCardPlayed({
            name: 'Corrupted Eagle Signature',
            func: function(input, game, eventChain) {
                
                let player = game.currentPlayer;

                eventChain.push({
                    type: 'choose target',
                    player: player.id,
                    view: 3
                });

                player.socket.once('target choice', input => {

                    /*
                    We have to create this because there is no event chain when the choice is triggered. Therefore,
                    we have to emit the event ourselves right here. This is gross, I concede that.
                    */
                    let newEvent = [];
                    Damage.func(input, game, newEvent, card.currentPower);
                    game.killDead(newEvent);
                    game.outputEventChain(newEvent);
                });

            }
        });
    }
}

module.exports = CorruptedEagle;