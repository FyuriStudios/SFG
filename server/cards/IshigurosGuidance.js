var Spell = require('../Spell');

class Ishiguro extends Spell {

    constructor() {
        super(38, 'spell', 'uncommon', "Ishiguro's Guidance", 3, false, false, false)
        this.hasCardPlayed = true;
        this.addCardPlayed(function(input, game, eventChain){
            for(let i = game.currentPlayer.deck.length-1; i>=0; i--){
                if (game.currentPlayer.deck[i].type == 'monster'){
                    game.currentPlayer.deck.push(game.currentPlayer.deck.splice(i, 1)[0]);
                    game.drawCard(game.currentPlayer, eventChain);
                    break;
                }
            }
            
            for(let i = game.currentPlayer.deck.length-1; i>=0; i--){
                if (game.currentPlayer.deck[i].type == 'spell'){
                    game.currentPlayer.deck.push(game.currentPlayer.deck.splice(i, 1)[0]);
                    game.drawCard(game.currentPlayer, eventChain);
                    break;
                }
            
            }
            
        });
    }

}

module.exports = Ishiguro;