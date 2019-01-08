module.exports = function (id) {
    if(id == -1)
	return new addPath('Potato')();
    if(id == -2)
	return new addPath('CarrotRain')();
}

function addPath(name) {
    return require('../cards/' + name);
}