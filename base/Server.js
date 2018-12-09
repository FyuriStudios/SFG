/**
 * This file sets up the entire project. You should run this file from your server, it will make everything work like magic.
 */

//Import all needed components
var express = require('express')
var http = require('http')
var path = require('path')
var socketIO = require('socket.io')
var createjs = require('createjs')
var Game = require('../static/game.js')
//Create the server and instances of all the packages we'll need.
var app = express()
var server = http.Server(app)
var io = socketIO(server)

//The port will remain set to 6001 for now; that's the port that I've reserved on my router.
const port = 6001

app.set('port', port)

/*
This line of code sets the "Static" directory for the webapp: That is, the outward-facing chunk of this project. When I launch this app and someone connects to it,
they'll be able to access the directory named 'static' as specified below.
__dirname is a global variable that is just the current directory that this file is living in.
'/static' is appended to it to point to the [current]/static directory.
*/
app.use('/static', express.static(__dirname + '/static'))

/*
This runs while the server is running and gives the root file every time that someone connects to the server. By default, when connecting to a server your computer will ask for the
root directory of the server ('/'). This will respond by giving back the path to the index.html file, which is the file that gets loaded by default on connection from
the user.
*/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../static/index.html'))//I'm leaving it like this for now. But we can totally change it.
})

//Set the server to listen on port 4000 for a webapp running. When the webapp is running, it calls the function below that simply outputs to the console that the application is working.
server.listen(port, function() {
    console.log('Server is running on port ' + port)
})

/*
This variable is sitting here so that I can hold one extra socket reference inside it.
Since we need two players to play the game, I'll keep a second reference while I'm waiting for two players.
This will get overwritten when I have both players and I can place them into a game.
*/
//FIXME: We should probably find a better way to do this.
var playerStorage = null

/*
This sets the in-out library to listen for a person connecting to the server. This function gives a reference to the socket that they're connecting through,
and we'll use that to create an instance of our Game.
*/
io.on('connection', function(playerSocket) {

    if(playerStorage == null) {
	//Keep a reference to the socket so that it doesn't get dereferenced while we wait for another player.
	playerStorage = playerSocket
    }

    else {
	//Otherwise, we'll create a new game with both players and run it.
	var g = new Game(playerStorage, playerSocket).start()
	playerStorage = null
	//I don't think that this file needs anything else in it; the Game is meant to handle the rest of everything.
    }
})
