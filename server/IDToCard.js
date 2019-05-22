module.exports = function (id) {

    if(id == -1) {
        let card = require('./cards/test');
        return new card();
    }
    else if(id == -2) {
        let card = require('./cards/test2');
        return new card();
    }
    else if(id == 1) {
        let card = require('./cards/Melody');
        return new card();
    }
    else if(id == 2) {
        let card = require('./cards/Mantra');
        return new card();
    }
    else if(id == 3) {
        let card = require('./cards/JBG');
        return new card();
    }
    else if(id == 4) {
        let card = require('./cards/Crust');
        return new card();
    }
    else if(id == 5) {
        let card = require('./cards/Domino');
        return new card();
    }
    else if(id == 6) {
        let card = require('./cards/SecretGrove');
        return new card();
    }
    else if(id == 7) {
        let card = require('./cards/Ratakhe');
        return new card();
    }
    else if(id == 8) {
        let card = require('./cards/SanguineMire');
        return new card();
    }
    else if(id == 9) {
        let card = require('./cards/Lugneus');
        return new card();
    }
    else if(id == 10) {
        let card = require('./cards/AncientCur');
        return new card();
    }
    else if(id == 11) {
        let card = require('./cards/SyncHorde');
        return new card();
    }
    else if(id == 12) {
        let card = require('./cards/WoundRegen');
        return new card();
    }
}
