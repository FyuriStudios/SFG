let Monster = require('../Monster');

class Melody extends Monster {

    constructor() {

        super('monster', 1, 'monster', 'legendary', 'Melody', 6, 2, 'mercenary', false, true);
        this.hasCardPlayed = true;
        this.hasSelfAttack = true;

        this.addCardPlayed({
            name: 'Melody Signature',
            func: function(input, game, eventChain) {

                let mantraIndex = -1;
                game.currentPlayer.deck.forEach((value, index) => {
                    if(value.name == 'Mantra') {
                        mantraIndex = index;
                    }
                });

                if(mantraIndex != -1) {
                    let mantra = game.currentPlayer.deck.splice(mantraIndex, 1)[0];
                    game.currentPlayer.board.unshift(mantra);

                    let event = {
                        type: 'deck invoke',
                        player: game.currentPlayer.id,
                        card: mantra,
                    };

                    eventChain.push(event);
                }
                else {
                    game.currentPlayer.hand.forEach((value, index) => {
                        if(value.name == 'Mantra') {
                            mantraIndex = index;
                        }
                    });

                    if(mantraIndex != -1) {
                        let mantra = game.currentPlayer.hand.splice(mantraIndex, 1)[0];
                        game.currentPlayer.board.unshift(mantra);
    
                        let event = {
                            type: 'hand invoke',
                            player: game.currentPlayer.id,
                            handLoc: mantraIndex,
                            card: mantra,
                        };
    
                        eventChain.push(event);
                    }

                }
            }
        });
 
    }

    attack(enemyCharacter, currentCharacter, attackerLoc, targetLoc, eventChain) {

        if (this.turnsBeforeAttack > 0) {
			return false;
		}

		if (this.hasDefender || this.isStatic) //first, we'll check the obvious and make sure that the attacking monster isn't a defender or disabled.
			return false;

		let defenders = [];

		enemyCharacter.board.forEach((monster, location) => {
			if (monster.hasDefender) {
				defenders.append(location);
			}
		});

		if (defenders.length > 0 && !defenders.includes(targetLoc))
            return false;

        let melodyIndex;
        game.currentPlayer.board.forEach((value, index) => {
            if(value == this) {
                melodyIndex = index;
            }
        });

        this.currentPower += 2;

        let boostEvent = {
            type: 'boost',
            targetSide: game.currentPlayer.id,
            target: melodyIndex,
            boost: 2
        };

        eventChain.push(boostEvent);

        var event = {
            type: 'attack',
            player: currentCharacter.id,
            attacker: attackerLoc,
            target: targetLoc,
        }
            
        if (targetLoc == -1) {
            let currHealth = enemyCharacter.health;
            enemyCharacter.health -= this.currentPower;
            event.damageToDefender = enemyCharacter.currHealth - enemyCharacter.health;
            event.damageToAttacker = 0;
        }
        else {
            let tempAPower = this.currentPower;
            let tempTPower = enemyCharacter.board[targetLoc].currentPower;

            this.currentPower -= tempTPower;
            enemyCharacter.board[targetLoc].currentPower -= tempAPower;

            event.damageToDefender = tempTPower - enemyCharacter.board[targetLoc].currentPower;
            event.damageToAttacker =  tempAPower - this.currentPower;
        }

		eventChain.push(event);

		if (this.relentless)
			this.turnsBeforeAttack = 1;
		else
			this.turnsBeforeAttack = 2;

		return true;
        
    }

}

module.exports = Melody;