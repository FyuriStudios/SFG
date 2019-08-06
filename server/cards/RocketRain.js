var Spell = require('../Spell');

class RocketRain extends Spell {

    constructor() {
        super(39, 'spell', 'common', 'Rocket Rain', 5, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Rocket Rain',
            func: function(input, game, eventChain) {
                let damage = require('../genericEffects/Damage');
                damage.func({
                    targetSide: game.otherPlayer.id,
                    target: -1
                }, game, eventChain, 9);

            }
        });
    }

}



module.exports = RocketRain;

