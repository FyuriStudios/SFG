let Monster = require('../Monster');

class AchtungPanzer extends Monster {

    constructor() {
        super('monster', 4, 'monster', 'common', 'Achtung Panzer', 4, 3, 'crow');

        this.hasCardPlayed = true;

        this.addCardPlayed(require('../genericEffects/Humiliate'));
    }
}