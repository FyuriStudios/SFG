/**
 * This file sets up the entire project. You should run this file from your server, it will make everything work like magic.
 */

//Import all needed components
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var Game = require('./Game.js');
//Create the server and instances of all the packages we'll need.
var app = express();
var server = http.Server(app);
var io = socketIO(server);

//The port will remain set to 6001 for now; that's the port that I've reserved on my router.
const port = 6001;

app.set('port', port);

/*
This line of code sets the "Static" directory for the webapp: That is, the outward-facing chunk of this project. When I launch this app and someone connects to it,
they'll be able to access the directory named 'static' as specified below.
__dirname is a global variable that is just the current directory that this file is living in.
'/static' is appended to it to point to the [current]/static directory.
*/
app.use('/static', express.static(path.join(__dirname, '../static')));

/*
This runs while the server is running and gives the root file every time that someone connects to the server. By default, when connecting to a server your computer will ask for the
root directory of the server ('/'). This will respond by giving back the path to the index.html file, which is the file that gets loaded by default on connection from
the user.
*/
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../static/index.html')); //I'm leaving it like this for now. But we can totally change it.
})

//Set the server to listen on port 6001 for a webapp running. When the webapp is running, it calls the function below that simply outputs to the console that the application is working.
server.listen(port, function () {
    console.log('Server is running on port ' + port);
})

/*
This variable is sitting here so that I can hold one extra socket reference inside it.
Since we need two players to play the game, I'll keep a second reference while I'm waiting for two players.
This will get overwritten when I have both players and I can place them into a game.
*/
//FIXME: We should probably find a better way to do this.
var playerStorage = null;
var games = []; //so we can reference the games if we care
var freePlayers = [];

/*
This sets the in-out library to listen for a person connecting to the server. This function gives a reference to the socket that they're connecting through,
and we'll use that to create an instance of our Game.
*/
io.on('connection', function (playerSocket) {
    console.log('New connection from: ' + playerSocket.handshake.address);

    freePlayers.push(playerSocket);

    playerSocket.once('disconnect', function () {
        console.log('Disconnection from: ' + playerSocket.handshake.address);
        let i = freePlayers.indexOf(playerSocket);

        //if player that disconnected was a freePlayer remove it from free players. Otherwise end the game it was in
        if (i != -1)
            freePlayers.splice(i, 1);
        else //find which game the player was in and disconnect the player and end the game
            for (i = 0; i < games.length; ++i) {
                if (games[i].player1.socket == playerSocket)
                    disconnect(i, 1);
                else if (games[i].player2.socket == playerSocket)
                    disconnect(i, 2);
            }
    });
});

function disconnect(gameNum, playerID) {
    console.log("Disconnect player: " + playerID + " game: " + gameNum);
    let event = {
        type: 'disconnection'
    };

    //tell the still connected player the other player disconnected
    let otherPlayer = playerID == 1 ? games[gameNum].player2 : games[gameNum].player1;
    if (otherPlayer.socket.connected) {
        otherPlayer.socket.emit('event', event);
        console.log("Player " + (playerID % 2 + 1) + " wins");
    }

    //end the game
    games.splice(gameNum, 1);
    console.log("Ended game: " + gameNum);
}

setInterval(() => {
    if (freePlayers.length >= 2) {
        let player1 = freePlayers.pop();
        let player2 = freePlayers.pop();

        let game = new Game(player1, player2);
        games.push(game);
        game.start();
        console.log('Starting game: ' + games.length + ' Players: ' + player1.handshake.address + " & " + player2.handshake.address);
    }
}, 1000);