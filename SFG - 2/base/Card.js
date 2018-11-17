/**
 *
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
