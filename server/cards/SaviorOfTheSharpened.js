let Monster = require('../Monster');

class SaviorOfTheSharpened extends Monster {

    constructor() {
        super('monster', 16, 'monster', 'secret weapon', 'Savior of the Sharpened', 8, 5, 'cur');

        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Savior Signature',
            func: function(input, game, eventChain) {
                game.currentPlayer.deck.forEach(value => {
                    if(value.type == 'monster') {
                        value.currentPower += 2;
                    }
                });
            }
        });
    }
}

module.exports = SaviorOfTheSharpened;