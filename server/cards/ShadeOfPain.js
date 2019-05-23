let Monster = require('../Monster');

class ShadeOfPain extends Monster {

    constructor() {
        super('monster', 14, 'monster', 'uncommon', 'Shade of Pain', 3, 4, 'dunkle');

        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Shade of Pain Signature',
            func: function(input, game, eventChain) {

                let player = game.currentPlayer;

                eventChain.push({
                    type: 'choose card',
                    player: player.id,
                    view: 3
                });

                player.socket.once('card choice', index => {
                    let card = player.hand.splice(index, 1)[0];

                    player.deck.unshift(card);

                    let newChain = [];

                    newChain.push({
                        type: 'remove hand card',
                        index: index,
                        player: player.id
                    });

                    newChain.push({
                        type: 'add deck card',
                        player: player.id,
                    });

                    game.drawCard(player, newChain);
                    game.killDead(newChain);

                    game.outputEventChain(newChain);
                });
               
            }
        });
    }
}

module.exports = ShadeOfPain;