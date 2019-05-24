module.exports = {
    name: 'discard',
    func: function(input, game, eventChain) {
        let player = (input.player == 1?game.player1:game.player2);

        let card = player.hand.splice(input.index, 1)[0];
        player.graveyard.push(card);

        eventChain.push({
            type: 'discard',
            player: input.player,
            index: input.index,
            card: game.backendCardTranslate(card),
        });
    }
}