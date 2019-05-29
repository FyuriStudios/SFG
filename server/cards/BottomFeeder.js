let Monster = require('../Monster');

class BottomFeeder extends Monster {

    constructor() {
        super('monster', 13, 'monster', 'uncommon', 'Bottom Feeder', 5, 2, 'Cur');

        this.hasCardPlayed = true;

        let card = this;

        this.addCardPlayed({
            name: 'Bottom Feeder Signature',
            func: function(input, game, eventChain) {
                let deck = game.currentPlayer.deck;

                let index = 0;

                let feeded;

                while(true) {
                    if(deck[index].type == 'monster') {
                        feeded = deck.splice(index, 1)[0];
                        break;
                    }
                }

                if(feeded != undefined) {
                    eventChain.push({
                        type: 'burn card',
                        player: game.currentPlayer.id,
                        card: game.backendCardTranslate(feeded)
                    });

                    card.currentPower += feeded.currentPower;

                    let thisIndex;
                    game.currentPlayer.board.forEach((value, index) => value == card? thisIndex = index:null);

                    eventChain.push({
                        type: 'boost',
                        targetSide: game.currentPlayer.id,
                        target: thisIndex,
                        boost: feeded.currentPower, 
                    });
                }
            }
        });
    }
}

module.exports = BottomFeeder;