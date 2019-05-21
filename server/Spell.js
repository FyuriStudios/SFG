let Card = require('./Card');

class Spell extends Card {

    constructor(id, tokenType, rarity, name, cost, targeting, forseeing, field) {
        super('spell', id, tokenType, rarity, name, cost, targeting, forseeing);
        this.field = field;
    }

}

module.exports = Spell;