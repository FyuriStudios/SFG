var Card = require('./Card');

/**
 * This class contains the basis for a generic Monster. You should never simply extend it, rather, you should override all of the 
 * functions in this class.
 * @author Hughes
 */
class Monster extends Card {

	/**
	 * 
	 * @param {*} type 
	 * @param {*} id 
	 * @param {*} tokenType 
	 * @param {*} rarity 
	 * @param {*} name 
	 * @param {*} cost 
	 * @param {*} power 
	 * @param {*} hasDefender 
	 */
	constructor(type, id, tokenType, rarity, name, cost, power, monsterClass, hasDefender = false, relentless = false) {
		super(type, id, tokenType, rarity, name, cost);
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

module.exports = Monster;