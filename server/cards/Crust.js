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

        this.hasTurnIncrement = true;

        let fuckCrust = this;

        this.addTurnIncrement({
            name: 'fuck crust',
            func: function(input, game, eventChain) {
                if(game.turnCounter %2 == 0 && fuckCrust.turnCounter == game.turnCounter - 1) {
                    fuckCrust.turnsBeforeAttack = 2;
                }
            }
        });

        this.attacksThisTurn = 0;
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

        if(this.turnCounter == undefined || this.turnCounter != game.turnCounter)  { //if he hasn't attacked yet
            this.turnCounter = game.turnCounter;
            this.attacksThisTurn = 1;
        }
        else if(this.turnCounter == game.turnCounter && this.attacksThisTurn == 1) {
            this.attacksThisTurn = 2;
        }
        else if(this.attacksThisTurn == 2)
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

		return true;
	}
}

module.exports = Crust;