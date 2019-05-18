module.exports = {
    name: 'damage', 
    func: function(input, game, eventChain, damage) {

        let event = {
            view: 1,
            type: 'damage',
            player: game.currentPlayer.id,
            targetSide: input.targetSide,
            target: input.target,
        };

        let player = input.targetSide == 1? game.player1: game.player2;

        if(input.target >= player.board.length || input.target < -1) {
            console.log('Invalid damage target');
            return;
        }

        if(input.target == -1) {
            player.health -= damage;
        }
        else {
            let card = player.board[input.target];
            let tempPower = card.currentPower;

            card.currentPower = (card.currentPower - damage);
            event.damage = tempPower - card.currentPower; //using this because of Mantra
        }

        eventChain.push(event);

        game.killDead(eventChain);
    }
}