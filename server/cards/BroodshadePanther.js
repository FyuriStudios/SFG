let Monster = require('../Monster');

class BroodshadePanther extends Monster {

    constructor() {
        super('monster', 34, 'monster', 'common', 'Broodshade Panther', 2, 2, 'cur');
    }
}

module.exports = BroodshadePanther;