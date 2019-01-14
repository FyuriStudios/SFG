var Card = require('./Card');

/**
 * This class contains the basis for a generic Monster. You should never simply extend it, rather, you should override all of the functions in this class.
 * Errors should be thrown unless you extend all of these functions.
 */
class Monster extends Card {

  constructor(type, id, tokenType, rarity, name, cost, power) {
	  super(type, id, tokenType, rarity, name, cost);
	  this.power = power;
	  this.currentPower = power;//power and current power are different
  }

}

module.exports = Monster;
