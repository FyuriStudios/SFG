let Monster = require('../Monster');

class Domino extends Monster {

    constructor() {
        super('monster', 5, 'monster', 'Secret Weapon', 'Domino Jackson', 9, 13, 'mercenary', false, true);
    }
}

module.exports = Domino;