var Spell = require('../Spell');
let Boost = require('../genericEffects/Boost');

class JiweisDagger extends Spell {

    constructor() {
        super(57, 'spell', 'uncommon', "Jiwei's Dagger", 2, true, false, false);

        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Jiweis',
            func: function(input, game, eventChain) {
                let monster;
                if(input.player == 1) {
                    monster = game.player1.board[input.target];
                }
                else if(input.player == 2) {
                    monster = game.player2.board[input.target];
                }

                monster.hasSelfAttack = true;

                monster.addSelfAttack({
                    name: 'Jiweis Effect',
                    func: function(input, game, eventChain) {
                        let cardLoc;
                        game.currentPlayer.board.forEach((value, index) => value == monster? cardLoc = index: null);

                        if(cardLoc > 0) {
                            Boost.func({
                                targetSide: game.currentPlayer.id,
                                target: cardLoc - 1
                            }, game, eventChain, 1);
                        }
                        if(game.currentPlayer.board.length > cardLoc + 1) {
                            Boost.func({
                                targetSide: game.currentPlayer.id,
                                target: cardLoc + 1
                            }, game, eventChain, 1);
                        }
                    }
                });
            }
        });
    }

}

module.exports = JiweisDagger;