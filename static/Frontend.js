import ClientGame from "./ClientGame";

/**
 * This file should be the controlling code for the entire frontend. This is because of the
 * event-driven nature of node.js: Events should take precedent over anything else that happens in this game.
 * Output to the server should be driven back through this file, the details of which are specified below.
 * Here's how this file (at some point) works:
 * 
 *  1. Call the init function of this class. It will set up all of the objects required to run the game properly, including
 *      a game object and graphics.
 * 
 *  2. Whenever you want to send output to the backend, whatever class is handling output (presumably the graphics handling class?)
 *      should accept a function as a variable in their constructor, with the appropriate variables. This file will define that function 
 *      (TODO: define that function) and will pass that function in to the output handling class. The class should just call that function
 *      with the appropriate parameters and then this file will deal with sending it in the proper format to the frontend. 
 *      TODO: document how backend -> frontend communication will work
 * 
 *  3. This file will contain both a graphics and game object (perhaps the graphics is part of the game object?) and whenever something
 *      happens with the backend updating the frontend, this file will call the appropriate methods of the game class. 
 *      TODO: document those methods more
 * 
 *  4. This file allows for multiple different graphics handling objects, which is handy since we might want to have a "menu" 
 *      graphics handler or a "deck builder" graphics handler. We can talk about those more later once we've got just the game working.
 */
let socket = io();
let game;
var id;
let hand;


function init() {
    socket.on('player id', function(idNum) {
        id = idNum;
    });
}

function windowResize() {

}