var Spell = require('../Spell');

class Makerplane extends Spell {

    constructor() {
        super(48, 'spell', 'legendary', 'The Makerplane', 3, false, false, true);

        let temp = this;

        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'untitled',
            func: function(input, game, eventChain) {

                temp.player = game.currentPlayer.id;
                game.currentPlayer.board.forEach(value => {
                    if(!value.relentless) {
                        value.relentless = true;
                        if(value.turnsBeforeAttack == 2)
                            value.turnsBeforeAttack = 1;
                        else if(value.turnsBeforeAttack == 1)
                            value.turnsBeforeAttack = 0;
                    }
                    else {
                        value.originallyRelentless = true;
                    }
                });
            }
        });

        this.hasMonsterPlayed = true;
        this.addMonsterPlayed({
            name: 'untitled',
            func: function(input, game, eventChain) {
                if(game.currentPlayer.id == temp.player) {
                    game.currentPlayer.board.forEach(value => {
                        if(!value.relentless) {
                            value.relentless = true;
                            if(value.turnsBeforeAttack == 2)
                                value.turnsBeforeAttack = 1;
                            else if(value.turnsBeforeAttack == 1)
                                value.turnsBeforeAttack = 0;
                        }
                        else {
                            value.originallyRelentless = true;
                        }
                    });
                }
            }
        });

        this.hasSelfDeath = true;
        this.addSelfDeath({
            name: 'untitled',
            func: function(input, game, eventChain) {
                let player = temp.player == 1? game.player1:game.player2;
                player.board.forEach(value => {
                    if(!value.originallyRelentless) {
                        value.relentless = false;
                        if(value.turnsBeforeAttack == 1)
                            value.turnsBeforeAttack = 2;
                    }
                });
            }
        });

    }
}

module.exports = Makerplane;