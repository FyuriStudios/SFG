var Spell = require('../Spell');

class Gamble extends Spell {

    constructor() {
        super(43, 'spell', 'uncommon', 'Gamble', 3, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'gamble effect',
            func: function(input, game, eventChain){
                for(let i = game.currentPlayer.deck.length-1; i>=0; i--){
                    if (game.currentPlayer.deck[i].currentCost == 6 && game.currentPlayer.deck[i].rarety != 'secret weapon' && game.currentPlayer.deck[i].type == 'monster'){
                        game.currentPlayer.deck.push(game.currentPlayer.deck.splice(i, 1)[0]);
                        game.drawCard(game.currentPlayer, eventChain);
                        break;
                    }
                }
            }
        });
    }
}
module.exports = Gamble;
