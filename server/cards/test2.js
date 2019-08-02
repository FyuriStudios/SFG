var Spell = require('../Spell');

class test extends Spell {

    constructor() {
        super(-2, 'spell', 'test', 'test', 3, true);
        this.hasCardPlayed = true;
        this.addCardPlayed({
            name: 'put a name here ya dongis',
            func: function(input, game, eventChain) {
                return;
            }
        });
    }

}

module.exports = test;