let Monster = require('../Monster');
let Damage = require('../genericEffects/Damage');

class TwistedSimian extends Monster {

    constructor() {
        super('monster', 24, 'monster', 'common', 'Twisted Simian', 8, 7, 'cur');
    }

    attack(game, attackerLoc, targetLoc, eventChain) {

		if (this.turnsBeforeAttack > 0) {
			return false;
		}

		if (this.hasDefender || this.isStatic) //first, we'll check the obvious and make sure that the attacking monster isn't a defender or disabled.
			return false;

		let defenders = [];

		game.otherPlayer.board.forEach((monster, location) => {
			if (monster.hasDefender || monster.vanguard) {
				defenders.push(location);
			}
		});

		if (defenders.length > 0 && !defenders.includes(targetLoc))
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

        if(targetLoc != -1) {
            let target = game.otherPlayer.board[targetLoc];
            if(target.currentPower <= 0) {
                Damage.func({targetSide: 1, target: -1}, game, eventChain, 4);
                Damage.func({targetSide: 2, target: -1}, game, eventChain, 4);
            }
        }

		if (this.relentless)
			this.turnsBeforeAttack = 1;
		else
			this.turnsBeforeAttack = 2;

		return true;
	}
}

module.exports = TwistedSimian;