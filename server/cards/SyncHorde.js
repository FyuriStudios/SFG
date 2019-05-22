var Spell = require('../Spell');

class SyncHorde extends Spell {

    constructor() {
        super(11, 'spell', 'uncommon', 'Synchronized Horde', 3, false, false, false);
        this.hasCardPlayed = true;
        
        this.addCardPlayed({
            name: 'Synchronized Horde',
            func: function(input, game, eventChain) {
                let deck = game.currentPlayer.deck;

                for(var i = deck.length - 1; i >= deck.length - 5; i--) {
                    deck[i].currentCost -= 1;
                }

            }
        });
    }

}

module.exports = SyncHorde;