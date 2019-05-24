let constants = require('../../constants/constants');
let Damage = require('./Damage');

module.exports = {
    name: 'character heal',
    func: function(input, game, eventChain, amount) {
        
        if(constants.STARTING_HEALTH - game.currentPlayer.health < amount) {
            amount = constants.STARTING_HEALTH - game.currentPlayer.health;
        }
        input.target = -1;
        Damage.func(input, game, eventChain, -amount);
    }
}