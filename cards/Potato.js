var Monster = require('../base/Monster');

class Potato extends Monster {
    
    constructor() {
        super('monster', -1, 'monster', 'common', 3, 3);
    }
}

module.exports = Potato;