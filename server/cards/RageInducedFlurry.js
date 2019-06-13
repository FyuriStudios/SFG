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
                            Damage.func({targetSide: game.currentPlayer.id, target: -1}, game, eventChain, 5);
                        }
                    }
                    else{
                        let dead = false;
                        eventChain.forEach(value =>(value.type == 'kill dead' && value.targetSide == input.targetSide && value.target == input.target)?dead = true:null);
                        if(!dead){
                            Damage.func({targetSide: game.currentPlayer.id, target: -1}, game, eventChain, 5);
                        }
                    }
                }
                else{
                    if(input.target == -1){
                        if(game.player2.health > 0){
                            Damage.func({targetSide: game.currentPlayer.id, target: -1}, game, eventChain, 5);
                        }
                    }
                    else{
                        let dead = false;
                        eventChain.forEach(value => (value.type == 'kill dead' && value.targetSide == input.targetSide && value.target == input.target)?dead = true:null);
                        if(!dead){
                            Damage.func({targetSide: game.currentPlayer.id, target: -1}, game, eventChain, 5);
                        }
                    }
                }
            }
        });
    }

}

module.exports = RageInducedFlurry;