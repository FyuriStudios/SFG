var constants = require('../../sharedConstants/constants.js');

module.exports = {
    name: 'humiliate', 
    func: function(input, game, eventChain) {

        let event = {
            type: 'humiliate',
            player: game.currentPlayer,
            targetSide: input.targetSide,
            target: input.target
        };

        let player = input.targetSide == 1? game.player1: game.player2;
        let card = player.board.splice(input.target, 1)[0];

        if(player.hand.length >= constants.MAX_HAND_SIZE) {
            player.graveyard.push(card);
        } else {
            player.hand.push(card);
        }

        eventChain.push(event);
    }
}