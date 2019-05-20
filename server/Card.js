var Effect = require('./Effect')
/**
 * This class contains the basis for a generic Card. You should never simply extend it, rather, you should override all of the functions in this class.
 * Errors will be thrown unless you extend all of these functions.
 * @author Hughes
 */
class Card extends Effect{

    constructor(type, id, tokenType, rarity, name, cost, targeting = false, forseeing = false) {
		super();
    	this.type = type;
    	this.id = id;
    	this.tokenType = tokenType;
    	this.rarity = rarity;
    	this.name = name;
    	this.cost = cost;
        this.currentCost = cost;//current cost and absolute cost are different
        this.targeting = targeting;
        this.forseeing = forseeing;
    }

}

module.exports = Card;
