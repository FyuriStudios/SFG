module.exports = {
    name: 'damage', 
    func: function(input, game, eventChain, damage) {

        console.log('made it to the damage block');

        let event = {
            view: 1,
            type: 'damage',
            player: game.currentPlayer,
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
            card.currentPower -= damage;
        }

        eventChain.push(event);

        game.killDead(eventChain);
    }
}