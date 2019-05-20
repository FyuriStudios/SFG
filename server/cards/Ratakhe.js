let Monster = require('../Monster');

class Ratakhe extends Monster {

    constructor() {
        super('monster', 7, 'monster', 'legendary', 'Ratakhe The Failure', 4, 4, 'advisor');

        this.hasCardPlayed = true;

        this.addCardPlayed({
            name: 'Ratakhe Signature',
            func: function(input, game, eventChain){
                let card;
                for(let i = 0; i < 7; i++){
                    card = game.otherPlayer.deck.pop();
                    game.otherPlayer.hand.unshift(card);

                    let event = {
                        type: 'draw card',
                        player: game.otherPlayer.id,
                        card: card,
                        view: 2,
                    }

                    eventChain.push(event);
                }

                
            }
        })
    }
}

module.exports = Ratakhe;