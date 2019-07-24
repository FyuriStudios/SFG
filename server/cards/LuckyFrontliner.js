let Monster = require('../Monster');

class LuckyFrontliner extends Monster {

    constructor() {
        super('monster', 40, 'monster', 'common', 'Lucky Frontliner', 5, 3, 'mercenary', true, false, false, false, true);
        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Frontliner Signature',
            func: function(input, game, eventChain){
                game.drawCard(game.currentPlayer, eventChain);
            }

        });
    }
}

module.exports = LuckyFrontliner;