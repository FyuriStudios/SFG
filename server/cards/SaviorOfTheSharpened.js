let Monster = require('../Monster');

class SaviorOfTheSharpened extends Monster {

    constructor() {
        super('monster', 16, 'monster', 'secret weapon', 'Savior of the Sharpened', 8, 8, 'cur');

        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Savior Signature',
            func: function(input, game, eventChain) {
                let i = game.currentPlayer.deck.length - 1;
                let cardsBoosted = 0;
                while(cardsBoosted < 3 && i >= 0) {
                    let value = game.currentPlayer.deck[i];
                    if(value.type == 'monster') {
                        cardsBoosted++;
                        value.currentPower += 4;
                    }
                    i -= 1;
                }

            }
        });
    }
}

module.exports = SaviorOfTheSharpened;