var Spell = require('../Spell');

class GrassShoes extends Spell {

    constructor() {
        super(35, 'spell', 'common', 'Grass Shoes', 1, true, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
           name: 'Grass Shoe',
           func: function(input, game, eventChain) {
                let target;

                if(input.targetSide == 1)
                    target = game.player1.board[input.target];
                else
                    target = game.player2.board[input.target];

                if(!target.relentless && (target.turnsBeforeAttack == 1 || target.turnsBeforeAttack == 2)) {
                    target.turnsBeforeAttack -= 1;
                }                

                target.relentless = true;

                //This doesn't even have an event for the time being.
            
           } 
        });
    }

}

module.exports = GrassShoes;