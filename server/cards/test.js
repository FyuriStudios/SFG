let Monster = require('../Monster');

class test extends Monster {

    constructor() {
        super('monster', -1, 'monster', 'common', 'Test Card', 3, 3, 'crow');
    }
}

module.exports = test;