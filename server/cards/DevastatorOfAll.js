let Monster = require('../Monster');

class DevastatorOfAll extends Monster {

    constructor() {
        super('monster', 37, 'monster', 'common', 'Devastator Of All', 5, 2, 'crow');

        this.hasCardPlayed = true;

        let card = this;

        this.addCardPlayed({
            name: 'Devastator Signature',
            func: function(input, game, eventChain) {
                
                let player = game.currentPlayer;

                eventChain.push({
                    type: 'choose target',
                    player: player.id,
                    view: 3
                });

                player.socket.once('target choice', input => {

                    /*
                    We have to create this because there is no event chain when the choice is triggered. Therefore,
                    we have to emit the event ourselves right here. This is gross, I concede that.
                    */
                    let newEvent = [];
                    let temp;

                    if(input.targetSide == game.currentPlayer.id){
                        temp = game.currentPlayer.board.splice(input.target, 1)[0];
                        temp.currentPower = temp.power;
                        game.currentPlayer.graveyard.push(temp);
                    }else{
                        temp = game.otherPlayer.board.splice(input.target, 1)[0];
                        temp.currentPower = temp.power;
                        game.otherPlayer.graveyard.push(temp);
                    }
                    
                    newEvent.push({
                        type: 'kill dead',
                        target: input.target,
                        targetSide: input.targetSide
                    });
                    
                    

                    game.outputEventChain(newEvent);


                });

            }
        });
    }
}

module.exports = DevastatorOfAll;