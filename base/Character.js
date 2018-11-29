const STARTING_HEALTH = 50

/** (0.0.1)
 * This class represents a character (hero? whatever.) in the game. It contains the character trait and the health of the character.
 * I'm definitely missing something vital but I forget what it is.
 * @author Hughes
 */
class Character {
    
    constructor() {
	this.health = STARTING_HEALTH
	//something else I'm missing here but whatever :/
    }
    
    charTrait(input) {
	throw 'needs to be implemented'
    }
}

module.exports = Character