let Monster = require('../Monster');
let Damage = require('../genericEffects/Damage');

class BurrowGator extends Monster {

    constructor() {
        super('monster', 15, 'monster', 'common', 'Burrowgator', 2, 3, 'cur');

        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: "Burrowgator Signature",
            func: function(input, game, eventChain) {
                input.targetSide = game.currentPlayer.id;
                input.target = -1;
                Damage.func(input, game, eventChain, 4);
            }
        });
    }

    attack(game, attackerLoc, targetLoc, eventChain) {

		if (this.turnsBeforeAttack > 0) {
			return false;
		}

		if (this.hasDefender || this.isStatic) //first, we'll check the obvious and make sure that the attacking monster isn't a defender or disabled.
			return false;

        var event = {
            type: 'attack',
            player: game.currentPlayer.id,
            attacker: attackerLoc,
            target: targetLoc,
        }
            
        if (targetLoc == -1) {
            let currHealth = game.otherPlayer.health;
            game.otherPlayer.health -= this.currentPower;
            event.damageToDefender = currHealth - game.otherPlayer.health;
            event.damageToAttacker = 0;
        }
        else {
            let tempAPower = this.currentPower;
            let tempTPower = game.otherPlayer.board[targetLoc].currentPower;

            this.currentPower = (this.currentPower - tempTPower);//in case this fixes Mantra
            game.otherPlayer.board[targetLoc].currentPower = (game.otherPlayer.board[targetLoc].currentPower - tempAPower);

            event.damageToDefender = tempTPower - game.otherPlayer.board[targetLoc].currentPower;
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

module.exports = BurrowGator;