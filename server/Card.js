var Effect = require('./Effect')
/**
 * This class contains the basis for a generic Card. You should never simply extend it, rather, you should override all of the functions in this class.
 * Errors will be thrown unless you extend all of these functions.
 * @author Hughes
 */
class Card extends Effect{

    constructor() {
	super()
	this.playCost = this.cost
    }

    get type() {
	throw 'Type needs to be implemented'
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
