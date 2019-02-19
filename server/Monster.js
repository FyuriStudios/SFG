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
  	constructor(type, id, tokenType, rarity, name, cost, power, monsterClass, hasDefender = false) {
	  super(type, id, tokenType, rarity, name, cost);
	  this.power = power;
	  this.currentPower = power;//power and current power are different
	  this.hasDefender = hasDefender;
	  this.monsterClass = monsterClass;
	  this.isStatic = false;
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
	attack(enemyCharacter, currentCharacter, targetLoc, eventChain) {

		if(this.hasDefender || this.isStatic)//first, we'll check the obvious and make sure that the attacking monster isn't a defender or disabled.
			return;

		let defenders = [];

		enemyCharacter.board.forEach((monster, location) => {
			if(monster.hasDefender) {
				defenders.append(location);
			}
		});
		
		if(!defenders.includes(targetLoc))
			return;

		var event = {
			type: 'attack',
			player: currentCharacter.id,
			targetLoc: targetLoc,
			damageToDefender: this.currentPower,
			damageToAttacker: enemyCharacter.board[targetLoc].currentPower
		};

		eventChain.push(event);

		let tempAPower = this.currentPower;
		let tempTPower = enemyCharacter.board[targetLoc].currentPower;

		this.currentPower -= tempAPower;
		enemyCharacter.board[targetLoc].currentPower -= tempAPower;

		return true;
	}

}

module.exports = Monster;
