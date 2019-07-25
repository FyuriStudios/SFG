let Monster = require('../Monster');
let Humiliate = require('../genericEffects/Humiliate');

class Bubbles extends Monster {

    constructor() {
        super('monster', 45, 'monster', 'secret weapon', 'Bubbles the Administrator', 4, 5, 'advisor', false, false, false, false, true);

        this.addCardPlayed({
            name: 'Bubbles signature',
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

                    if(input.player == game.currentPlayer) { //In the unlikely event that card draw can happen in between humiliate effects, we need to fix this card.
                        newEvent.push({
                            type: 'hand cost',
                            player: game.currentPlayer.id,
                            cost: 2,
                            target: 0
                        });

                        game.currentPlayer.hand[0].currentCost = 2;
                    }
                    else {
                        newEvent.push({
                            type: 'hand cost',
                            player: game.otherPlayer.id,
                            cost: 2,
                            target: 0
                        });

                        game.otherPlayer.hand[0].currentCost = 2;
                    }

                    game.killDead(newEvent);
                    game.outputEventChain(newEvent);
                });
            }
        });
    }
}

module.exports = Bubbles;