let Monster = require('../Monster');

class TheGator extends Monster {

    constructor() {

        super('monster', 41, 'monster', 'common', 'The Gator', 4, 3, 'cur', false, false, false, false, true);

        this.hasSelfAttack = true;

        let temp = this;

        this.addSelfAttack({
            name: 'Gator Attack',
            func: function(input, game, eventChain) {
                temp.currentPower += 1;

                let gatorIndex;
                game.currentPlayer.board.forEach((value, index) => value == temp? gatorIndex = index:null);

                let boostEvent = {
                    type: 'boost',
                    targetSide: game.currentPlayer.id,
                    target: gatorIndex,
                    boost: 1
                };

                eventChain.push(boostEvent);
            }
        });
 
    }


}

module.exports = TheGator;