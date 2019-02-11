var Monster = require('../Monster');

class ChildProdigy extends Monster{

    constructor() {
        super('monster', 1, 'monster', 'uncommon', 'Child Prodigy', 6, 7, true);
    }

    /*
    Here, all I've done is remove the check to see if this card has defender.
    */
    attack(enemyCharacter, currentCharacter, targetLoc, eventChain) {

		if(this.isStatic)//first, we'll check the obvious and make sure that the attacking monster isn't a defender or disabled.
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

module.exports = ChildProdigy;