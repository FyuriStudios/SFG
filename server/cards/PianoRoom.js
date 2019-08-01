var Spell = require('../Spell');

class PianoRoom extends Spell {

    constructor() {
        super(54, 'spell', 'uncommon', 'The Piano Room', 4, false, false, true);

        let temp = this;

        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'untitled',
            func: function(input, game, eventChain) {
                temp.player = game.currentPlayer.id;
            }
        });

        this.hasMonsterPlayed = true;
        this.addMonsterPlayed({
            name: 'untitled',
            func: function(input, game, eventChain) {
                if(game.currentPlayer.id == temp.player) {
                    let monsterLoc = eventChain[eventChain.length - 2].playLoc;

                    if(game.currentPlayer.board[monsterLoc].hasDefender) {
                        game.currentPlayer.board[monsterLoc].currentPower += 3;

                        eventChain.push({
                            type: 'boost',
                            player: game.currentPlayer.id,
                            target: monsterLoc,
                            boost: 3
                        });
                    }
                }
            }
        });
    }

}

module.exports = PianoRoom;