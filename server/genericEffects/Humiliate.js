var constants = require('../../sharedConstants/constants.js');

module.exports = {
    name: 'humiliate', 
    func: function(input, game, eventChain) {

        let player = input.targetSide == 1? game.player1: game.player2;
        let card = player.board.splice(input.target, 1)[0];

        let event;

        if(player.hand.length >= constants.MAX_HAND_SIZE) {
            event = {
                type: 'kill dead',
                targetSide: input.targetSide,
                target: input.target,
            }
            player.graveyard.push(card);
            card.currentPower = card.power;
        } else {
            event = {
                type: 'humiliate',
                player: game.currentPlayer,
                targetSide: input.targetSide,
                target: input.target
            };
            player.hand.push(card);
        }

        eventChain.push(event);
    }
}