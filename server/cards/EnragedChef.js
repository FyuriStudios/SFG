let Monster = require('../Monster');
let IDToCard = require('../IDToCard');
let constants = require('../../constants/constants');

class EnragedChef extends Monster {

    constructor() {
        super('monster', 53, 'monster', 'common', 'Enraged Chef', 4, 2, 'mercenary', false, false, false, false, true);

        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'enraged signature',
            func: function(input, game, eventChain) {
                let newChef = IDToCard(53);
                if(game.currentPlayer.board.length < constants.MAX_BOARD_SIZE) {
                    game.currentPlayer.board.unshift(newChef);

                    eventChain.push({
                        type: 'invoke',
                        player: game.currentPlayer.id,
                        card: newChef,
                    });
                }
            }
        });
    }
}

module.exports = EnragedChef;