let Monster = require('../Monster');
let idToCard = require('../IDToCard');

class Darfler extends Monster {

    constructor() {
        super('monster', 52, 'monster', 'legendary', 'Darfler The Persistent Genius', 6, 2, 'advisor');

        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'darfler signature',
            func: function(input, game, eventChain){
                game.currentPlayer.deck.push(idToCard(51));
                eventChain.push({
                    type: 'add deck card',
                    player: game.currentPlayer.id
                });
                game.drawCard(game.currentPlayer, eventChain);
            }
        });
    }
}

module.exports = Darfler;