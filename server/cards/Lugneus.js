let Monster = require('../Monster');

class Lugneus extends Monster {

    constructor() {
        super('monster', 9, 'monster', 'uncommon', 'Lugneus', 3, 2, 'cur');

        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Lugneus Signature',
            func: function(input, game, eventChain) {

                let boosted = 0;
                let currentIndex = 1;
                let deck = game.currentPlayer.deck;
                while(boosted < 3 && currentIndex <= deck.length-1) {
                    if(deck[deck.length - currentIndex].type == 'monster') {
                        deck[deck.length - currentIndex].currentPower += 1;
                        boosted += 1;
                    }
                    currentIndex += 1;
                }
            }
        });
    }
}

module.exports = Lugneus;