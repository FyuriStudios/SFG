let Monster = require('../Monster');
let Boost = require('../genericEffects/Boost');

class DebsAtkanton extends Monster {

    constructor() {
        super('monster', 47, 'monster', 'common', 'Debs Atkanton', 3, 3, 'advisor', false, false, true, false, true);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Debs Signature',
            func: function(input, game, eventChain){

                if(game.currentPlayer.board.length == 1 && game.otherPlayer.board.length == 0) {
                    return;
                }

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
                    Boost.func(input, game, newEvent, 2);
                    game.killDead(newEvent);
                    game.outputEventChain(newEvent);
                });
                
            }
        });
    }
}

module.exports = DebsAtkanton;