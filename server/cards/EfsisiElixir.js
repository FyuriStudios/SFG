var Spell = require('../Spell');

class EfsisiElixir extends Spell {

    constructor() {
        super(42, 'spell', 'secret weapon', 'The Efsisi Elixir', 4, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Efsisi Elixir Play',
            func: function(input, game, eventChain) {
                let choices = Array.from(Array(game.currentPlayer.hand.length).keys()); //This line creates a drop array that basically just says "drop all the cards in the hand".

                let temp = game.currentPlayer.hand;

                game.currentPlayer.hand = [];

                game.currentPlayer.deck.unshift(...temp);

                eventChain.push({
                    type: 'drop cards',
                    choices: choices,
                    player: game.currentPlayer.id 
                });

                _.times(temp.length, () => {
                    eventChain.push({
                        type: 'add deck card',
                        player: game.currentPlayer.id
                    });
                });

                _.times(7, () => {
                    game.drawCard(game.currentPlayer, eventChain);
                });
            } 
        });
    }

}

module.exports = EfsisiElixir;