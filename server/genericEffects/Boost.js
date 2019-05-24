module.exports = {
    name: 'boost',
    func: function(input, game, eventChain, amount) {
        let player = input.targetSide == 1? game.player1:game.player2;

        player.board[input.target].currentPower += amount;

        eventChain.push({
            type: 'boost',
            targetSide: input.targetSide,
            target: input.target,
            amount: amount,
        });
    }
}