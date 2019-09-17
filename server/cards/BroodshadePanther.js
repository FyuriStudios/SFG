let Monster = require('../Monster');

class BroodshadePanther extends Monster {

    constructor() {
        super('monster', 34, 'monster', 'common', 'Broodshade Panther', 2, 2, 'cur');

        this.hasCardPlayed = true;
        this.addCardPlayed({name: "Broodshade signature",
    func: function(input, game, eventChain) {
        game.drawCard(game.currentPlayer, eventChain);
        game.drawCard(game.otherPlayer, eventChain);
    }})
    }
}

module.exports = BroodshadePanther;