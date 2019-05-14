module.exports = function (id) {
    let card;

    if(id == -1) 
        card = require('./cards/test');
    else if(id == -2) 
        card = require('./cards/test2');

    return new card();
}
