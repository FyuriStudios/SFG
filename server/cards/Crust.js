let Monster = require('../Monster');
let Damage = require('../genericEffects/Damage');

class Crust extends Monster {

    constructor() {
        super('monster', 4, 'monster', 'legendary', 'Crust the Protector', 6, 4, 'crow');
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'Crust Signature',
            func: function(input,game,eventChain){
                input.targetSide = game.currentPlayer.id;
                input.target = -1;
                Damage.func(input, game, eventChain, 4);
            }
        });

        this.attacksThisTurn = 0;
    }

    attack(enemyCharacter, currentCharacter, attackerLoc, targetLoc, eventChain) {

        if (this.attacksThisTurn == 2) {
            this.attacksThisTurn = 0;
            this.turnsBeforeAttack = 2;
            return false;
        }

		if (this.turnsBeforeAttack > 0) {
			return false;
		}

		if (this.hasDefender || this.isStatic) //first, we'll check the obvious and make sure that the attacking monster isn't a defender or disabled.
			return false;

		let defenders = [];

		enemyCharacter.board.forEach((monster, location) => {
			if (monster.hasDefender) {
				defenders.push(location);
			}
		});

		if (defenders.length > 0 && !defenders.includes(targetLoc))
            return false;

        this.attacksThisTurn++;

        var event = {
            type: 'attack',
            player: currentCharacter.id,
            attacker: attackerLoc,
            target: targetLoc,
        }
            
        if (targetLoc == -1) {
            let currHealth = enemyCharacter.health;
            enemyCharacter.health -= this.currentPower;
            event.damageToDefender = currHealth - enemyCharacter.health;
            event.damageToAttacker = 0;
        }
        else {
            let tempAPower = this.currentPower;
            let tempTPower = enemyCharacter.board[targetLoc].currentPower;

            this.currentPower = (this.currentPower - tempTPower);//in case this fixes Mantra
            enemyCharacter.board[targetLoc].currentPower = (enemyCharacter.board[targetLoc].currentPower - tempAPower);

            event.damageToDefender = tempTPower - enemyCharacter.board[targetLoc].currentPower;
            event.damageToAttacker =  tempAPower - this.currentPower;
        }

		eventChain.push(event);

		return true;
	}
}

module.exports = Crust;