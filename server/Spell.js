let Card = require('./Card');

class Spell extends Card {

    constructor(id, tokenType, rarity, name, cost, targeting) {
        super('spell', id, tokenType, rarity, name, cost, targeting);
    }

}

module.exports = Spell;