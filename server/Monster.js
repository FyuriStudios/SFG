var Card = require('./Card');

/**
 * This class contains the basis for a generic Monster. You should never simply extend it, rather, you should override all of the 
 * functions in this class.
 * @author Hughes
 */
class Monster extends Card {

	/**
	 * 
	 * @param {string} type 
	 * @param {Number} id 
	 * @param {string} tokenType 
	 * @param {string} rarity 
	 * @param {string} name 
	 * @param {Number} cost 
	 * @param {Number} power 
	 * @param {boolean} hasDefender 
	 * @param {boolean} relentless
	 */
	constructor(type, id, tokenType, rarity, name, cost, power, monsterClass, hasDefender = false, relentless = false, targeting = false, forseeing = false) {
		super(type, id, tokenType, rarity, name, cost, targeting, forseeing);
		this.power = power;
		this.currentPower = power; //power and current power are different
		this.hasDefender = hasDefender;
		this.monsterClass = monsterClass;
		this.isStatic = false;
		this.relentless = relentless;
		this.turnsBeforeAttack = 0;
	}

	/**
	 * This function should be used when you want to attack something with a monster. You call this function of this monster and
	 * give it a reference to the enemy character and the target. Events need to be passed into the function. This class implements this
	 * function because I realized that there are a bunch of cards that have weird attack behavior so that we'll need to override this
	 * function.
	 * @param {*} enemyCharacter A reference to the target character's object.
	 * @param {*} currentCharacter A reference to the attacking character's object.
	 * @param {*} targetLoc The location of the target
	 * @param {*} eventChain The event chain, so that this function can add to it.
	 * 
	 * @returns whether or not the attack actually happened.
	 */
	attack(game, attackerLoc, targetLoc, eventChain) {

		if (this.turnsBeforeAttack > 0) {
			return false;
		}

		if (this.hasDefender || this.isStatic) //first, we'll check the obvious and make sure that the attacking monster isn't a defender or disabled.
			return false;

		let defenders = [];

		game.otherPlayer.board.forEach((monster, location) => {
			if (monster.hasDefender) {
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

		if (this.relentless)
			this.turnsBeforeAttack = 1;
		else
			this.turnsBeforeAttack = 2;

		return true;
	}

}

module.exports = Monster;