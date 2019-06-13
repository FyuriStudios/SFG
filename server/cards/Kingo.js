let Monster = require('../Monster');

class Kingo extends Monster {

    constructor() {
        super('monster', 31, 'monster', 'common', 'Kingo', 3, 2, 'Cur', true);

        let card = this;

        this.hasEntersBoard = true;
        this.addEntersBoard({
            name: 'untitled',
            func: function(input, game, eventChain) {
                card.player = game.currentPlayer.id;
            }
        });

        this.hasSelfDeath = true;
        this.addSelfDeath({
            name: 'Kingo Deathrattle',
            func: function(input, game, eventChain) {

                let hand = card.player == 1? game.player1.hand:game.player2.hand;

                let choice;

                do {
                    choice = Math.floor(Math.random()*hand.length);
                } while(hand[choice].type != 'monster');

                let boostAmount = 3;

                let event = {
                    type: 'hand boost',
                    target: choice,
                    boost: boostAmount,
                    view: 3
                };

                eventChain.push(event);

                hand[choice].currentPower += 3;
            }
        });
    }
}

module.exports = Kingo;