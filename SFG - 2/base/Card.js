/**
 * This class contains the basis for a generic Card. You should never simply extend it, rather, you should override all of the functions in this class.
 * In theory, errors will be thrown unless you extend all of these functions.
 */
class Card {

  constructor() {
    this.playCost = this.cost
  }

  get id() {
    throw 'ID needs to be implemented'
  }

  get tokenType() {
    throw 'Token Type needs to be implemented'
  }

  get rarity() {
    throw 'Rarity needs to be implemented'
  }

  get name() {
    throw 'name needs to be implemented'
  }

  get cost() {
    throw 'cost needs to be implemented'
  }

}

module.exports = Card
