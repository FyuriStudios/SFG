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
}
