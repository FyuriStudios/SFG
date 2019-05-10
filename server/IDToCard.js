module.exports = function (id) {
    if(id == -1) {
        let card = require('./cards/test');
        return new card();
    }
}
