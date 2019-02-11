var Monster = require('../Monster');
var constants = require('../../sharedConstants/constants');

class Kenedi extends Monster {
    
    constructor() {
        super('monster', 2, 'monster', 'legendary', 8, 2);
    }

    get hasCardPlayed() {
        return true;
    }

    cardPlayed(noInput, game, eventChain) {
        let event = {
            type: 'heal',
            player: game.currentPlayer.id,
            targetSide: game.currentPlayer.id,
            target: -1,//the hero
        };

        if(game.currentPlayer.health > constants.STARTING_HEALTH-20) {
            event.amount = constants.STARTING_HEALTH-game.currentPlayer.health;
            game.currentPlayer.health = constants.STARTING_HEALTH;
        } else {
            event.amount = 20;
            game.currentPlayer.health += 20;
        }

        eventChain.push(event);
    }

}

module.exports = Kenedi;