var Spell = require('../Spell');

class ThickFur extends Spell {

    constructor() {
        super(36, 'spell', 'common', 'Thick Fur', 3, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Thick Fur',
            func: function(input, game, eventChain) {
                game.currentPlayer.board.forEach(value => value.vanguard = true);
                game.otherPlayer.board.forEach(value => value.vanguard = true); //This card emits no events, for now.
            }
        });
    }

}

module.exports = ThickFur;