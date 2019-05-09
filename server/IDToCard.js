module.exports = function (id) {
    if(id == -1)
        return new addPath('test');
}

function addPath(name) {
    return require('./cards/' + name);
}