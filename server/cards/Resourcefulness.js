var Spell = require('../Spell');
let Damage = require('../genericEffects/Damage');

class Resourcefullness extends Spell {

    constructor() {
        super(58, 'spell', 'common', 'Resourcefullness', 6, false, false, false);
        this.hasCardPlayed = true;
        this.addCardPlayed = ({
            name: 'Resourcefullness',
            func: function(input, game, eventChain){
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
                    let ammount;

                    if(input.targetSide == game.currentPlayer.id){
                        temp = game.currentPlayer.board.splice(input.target, 1)[0];
                        ammount = temp.currentPower;
                        temp.currentPower = temp.power;
                        game.currentPlayer.graveyard.push(temp);

                        let damageIndex = Math.floor(Math.random() * (game.otherPlayer.board.length + 1) - 1);
                        Damage.func({
                            targetSide: game.otherPlayer.id,
                            target: damageIndex,
                        }, game, eventChain, ammount);
                        

                        newEvent.push({
                            type: 'kill dead',
                            target: input.target,
                            targetSide: input.targetSide
                        });
                    }
                    game.outputEventChain(newEvent);


                });
            }
        });
    }

}

module.exports = Resourcefullness;