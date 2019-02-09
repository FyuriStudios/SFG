/*
A few useful things to note about this file:
1) This is mostly just my attempt at refactoring Sean's Client.js code to be a little cleaner and more exstensible for when we're
    moving further along with the game.

2) I've moved the onMouseDown and onMouseDrag code, etc. into Dragger.js. There's a function in there that accepts a Sprite and adds
    the appropriate functions to it that make it draggable.

3) I've tried to reduce the number of global variables being used. The use of globals makes debugging wicked hard, which is kind of bad.
    Especially since we're going to be doing a lot of debugging.

4) This file's functions are meant to be called through the IO file. Essentially, the networking doesn't need to be handled here.

5) Ask me (Hughes) for more clarification if you need it, I'm still working on comments for this file as of 2/9/19.
*/

import ClientGame from './ClientGame';
import AnimationQueue from './AnimationQueue'
/*
 * Just a few constants that are useful to have around.
 */
const aspectRatio = 9/16;

/*
 * aliases
 */
let Loader = PIXI.loader;
let Sprite = PIXI.Sprite;

let grass = 420;
let game = new ClientGame();

/*
The fewer high level globabl variables we're throwing around, the better. All of the display elements here have been
merged together into one big object.
*/
let displayElements = {
    clickEventShapes: new PIXI.Container(),
    playerCards: new PIXI.Container,
    enemyCards: new PIXI.Container,
};

/*
 * Initialize the PIXI application as "app"
 */
let app = new PIXI.Application({
    antialias: true,
    transparent: true,
    forceCanvas: false
});

/**
 * Moves a sprite to the front of a container.
 * There's probably a better way to do this but I'm leaving
 * it as is for now.
 * @param {PIXI.Sprite} sprite 
 * @param {PIXI.Container} parent 
 */
function bringToFront(sprite, parent) {
    parent.removeChild(sprite);
    parent.addChild(sprite);
}

function setupDisplay() {
    document.body.appendChild(app.view);

    let background = Sprite.fromImage('/static/assets/4k-Board.png');

    app.stage.addChild();
    app.stage.addChild(clickEventShapes);
    app.stage.addChild(playerCards);
    app.stage.addChild(enemyCards);

    app.stage.width = innerWidth;//p sure this works
    app.stage.height = innerHeight;

    background.width = app.stage.width;
    background.height = app.stage.height;
    background.x = 0;
    background.y = 0;
}

let animator = new AnimationQueue(game);

/**
 * This function should accept an event object from the backend, generally passed through IO.
 * It might be useful to move this off to another file, since it's anticipated that there will
 * be a ton of event types in the future, but for now this is okay.
 * @param {Event} event the event to be processed
 */
function processEvent(event) {
    if(event.type == )
}



