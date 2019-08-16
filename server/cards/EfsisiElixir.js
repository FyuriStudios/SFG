var Spell = require('../Spell');
let _ = require('lodash');

class EfsisiElixir extends Spell {

    constructor() {
        super(42, 'spell', 'secret weapon', 'The Efsisi Elixir', 4, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Efsisi Elixir Play',
            func: function(input, game, eventChain) {

                let temp = game.currentPlayer.hand;

                game.currentPlayer.hand = [];

                game.currentPlayer.deck.unshift(...temp);

                eventChain.push({
                    type: 'mulligan hand',
                    player: game.currentPlayer.id
                });

                _.times(7, () => {
                    game.drawCard(game.currentPlayer, eventChain);
                });
            } 
        });
    }

}

module.exports = EfsisiElixir;