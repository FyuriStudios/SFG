var Spell = require('../Spell');
let Boost = require('../genericEffects/Boost');

class SupplyCrate extends Spell {

    constructor() {
        super(59, 'spell', 'common', 'Supply Crate', 4, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Supply Crate Effect',
            func: function (input, game, eventChain){
                
                if(game.currentPlayer.board.length > 3){
                let nums = [-1, -2, -3];
                    for(let i = 0; i < 3; i++){
                        let boostIndex = Math.floor(Math.random() * (game.currentPlayer.board.length));
                        while(boostIndex != nums[0] && boostIndex != nums[1] && boostIndex != nums[2]){
                            boostIndex = Math.floor(Math.random() * (game.currentPlayer.board.length));
                        }
                        Boost.func({target: boostIndex, targetSide: game.currentPlayer.id}, game, eventChain, 2);
                        nums[i] = boostIndex
                    }
                }
                else{
                    for(let j = 0; j < game.currentPlayer.board.length; j++){
                        Boost.func({target: game.currentPlayer.board[j], targetSide: game.currentPlayer.id}, game, eventChain, 2);
                    }
                }
            }
        });
    }

}

module.exports = SupplyCrate;