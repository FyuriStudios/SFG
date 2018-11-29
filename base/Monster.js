var Card = require('./Card')

/**
 * This class contains the basis for a generic Monster. You should never simply extend it, rather, you should override all of the functions in this class.
 * Errors should be thrown unless you extend all of these functions.
 */
class Monster extends Card {

  constructor() {
    super()
    this.currentPower = power
  }
  
  get type() {
    return 'monster'
  }

  get id() {
    throw 'ID needs to be implemented'
  }

  get tokenType() {
    throw 'monster tokens' //this should be overridden if you ever want to change token type for a monster.
  }

  get rarity() {
    throw 'rarity needs to be implemented'
  }

  get name() {
    throw 'name needs to be implemented'
  }

  get cost() {
    throw 'cost needs to be implemented'
  }
  
  get power() {
    throw 'power needs to be implemented'
  }

}

module.exports = Card
