let Monster = require('../Monster');
let Effect = require('../Effect');

class RahMut extends Monster {

    constructor() {
        super('monster', 18, 'monster', 'secret weapon', "Rah'Mut", 9, 1, 'dunkle');

        this.hasCreation = true;

        let card = this;
        this.totalDamage = 0;

        let effect = new Effect();

        this.addCreation({
            name: 'RahMut Creation',
            func: function(input, game, eventChain) {

                effect.rahMut = card;
                
                effect.hasTurnIncrement = true;

                game.player1.deck.forEach(value => {
                    if(value == card) {
                        effect.creationDate = 1;
                    }
                });
                game.player2.deck.forEach(value => {
                    if(value == card) {
                        effect.creationDate = 3;
                    }
                });

                effect.addTurnIncrement({
                    name: 'untitled',
                    func: function(input, game, eventChain) {
                        if(game.turnCounter%4 == effect.creationDate%4)
                            effect.startingHealth = game.currentPlayer.health;
                        else if(game.turnCounter%4 == (effect.creationDate+1)%4){

                            let damage = effect.startingHealth - game.currentPlayer.health;
                            if(damage <= 0) {
                                return;
                            } else {
                                card.totalDamage += damage;
                            }
                        }
                    }
                });

                if(effect.creationDate == 1) 
                    game.player1.effects.push(effect);
                else
                    game.player2.effects.push(effect);

            }
        });

        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'RahMut Signature',
            func: function(input, game, eventChain) {
                let damageThisTurn = effect.startingHealth - game.currentPlayer.health;
                let totalDamage = card.totalDamage + (damageThisTurn > 0? damageThisTurn: 0);

                let loc;
                game.currentPlayer.board.forEach((value, index) => {
                    if(value == card)
                        loc = index;
                });

                if(loc != undefined) {

                    eventChain.push({
                        type: 'boost',
                        targetSide: game.currentPlayer.id,
                        target: loc,
                        boost: totalDamage
                    });
                }
            }
        });

    }
}

module.exports = RahMut;