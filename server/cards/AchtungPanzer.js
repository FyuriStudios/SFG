let Monster = require('../Monster');
let Humiliate = require('../genericEffects/Humiliate');

class AchtungPanzer extends Monster {

    constructor() {
        super('monster', 48, 'monster', 'common', 'Achtung Panzer', 4, 2, 'crow');
        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Achtung signature',
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
                    Humiliate.func(input, game, newEvent);

                    game.killDead(newEvent);
                    game.outputEventChain(newEvent);
                });
            }
        });
    }
}

module.exports = AchtungPanzer;