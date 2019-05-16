module.exports = {
    name: 'damage', 
    func: function(input, game, eventChain, damage) {

        let event = {
            view: 1,
            type: 'damage',
            player: game.currentPlayer.id,
            targetSide: input.targetSide,
            target: input.target,
            damage: damage,
        };

        let player = input.targetSide == 1? game.player1: game.player2;

        if(input.target == -1) {
            player.health -= damage;
        }
        else {
            let card = player.board[input.target];
            console.log('players board: ' + player.board);
            card.currentPower -= damage;
        }

        eventChain.push(event);

        game.killDead(eventChain);
    }
}