//the unfucked server for fontend testing. 

//Import all needed components
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
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
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../static/index.html'));//I'm leaving it like this for now. But we can totally change it.
})

//Set the server to listen on port 6001 for a webapp running. When the webapp is running, it calls the function below that simply outputs to the console that the application is working.
server.listen(port, function() {
    console.log('Server is running on port ' + port);
})
