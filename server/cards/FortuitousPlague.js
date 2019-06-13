var Spell = require('../Spell');
let Damage = require('../genericEffects/Damage');

class FortuitousPlague extends Spell {

    constructor() {
        super(33, 'spell', 'common', 'Fortuitous Plague', 5, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Fortuitous Plague',
            func: function(input, game, eventChain) {

                let damage = 3;

                Damage.func({targetSide: game.otherPlayer.id, target: -1}, game, eventChain, damage);
                game.otherPlayer.board.forEach((value, index) => Damage.func({targetSide: game.otherPlayer.id, target: index}, game, eventChain, damage));

                Damage.func({targetSide: game.currentPlayer.id, target: -1}, game, eventChain, damage);
                game.currentPlayer.board.forEach((value, index) => Damage.func({targetSide: game.currentPlayer.id, target: index}, game, eventChain, damage));

            }
        });
    }

}

module.exports = FortuitousPlague;