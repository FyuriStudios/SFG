var Spell = require('../Spell');
var Damage = require('../genericEffects/Damage');

class RageInducedFlurry extends Spell {

    constructor() {
        super(29, 'spell', 'common', 'Rage-Induced Flurry', 2, true, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Rage-Induced Flurry',
            func: function(input, game, eventChain){
                Damage.func(input, game, eventChain, 5);

                if(input.targetSide == 1){
                    if(input.target == -1){
                        if(game.player1.health > 0){
                            Damage.func({targetSide: gameCurrentplayer.id, target: -1}, game, eventChain, 5);
                        }
                    }
                    else{
                        if(game.player1.board[input.target].currentPower > 0){
                            Damage.func({targetSide: gameCurrentplayer.id, target: -1}, game, eventChain, 5);
                        }
                    }
                }
                else{
                    if(input.target == -1){
                        if(game.player2.health > 0){
                            Damage.func({targetSide: gameCurrentplayer.id, target: -1}, game, eventChain, 5);
                        }
                    }
                    else{
                        if(game.player2.board[input.target].currentPower > 0){
                            Damage.func({targetSide: gameCurrentplayer.id, target: -1}, game, eventChain, 5);
                        }
                    }
                }
            }
        });
    }

}

module.exports = RageInducedFlurry;