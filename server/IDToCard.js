module.exports = function (id) {

    if(id == -1)
        return new require('./cards/test')();
    else if(id == -2) 
        return new require('./cards/test2')();
}
