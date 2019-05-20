let Card = require('./Card');

class Spell extends Card {

    constructor(id, tokenType, rarity, name, cost, targeting, forseeing) {
        super('spell', id, tokenType, rarity, name, cost, targeting, forseeing);
    }

}

module.exports = Spell;