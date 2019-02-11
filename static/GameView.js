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

/*
 * Just a few constants that are useful to have around.
 */
const aspectRatio = 9/16;

/*
 * aliases
 */
let Loader = PIXI.loader;
let Sprite = PIXI.Sprite;

/*
globals
*/
let grass = 420;
let game = new ClientGame();
var outputFunc;
let displayElements = {

    app: new PIXI.Application({//"app" is now part of the displayElements object
        antialias: true,
        transparent: true,
        forceCanvas: false
    }),

    clickEventShapes: new PIXI.Container(),
    playerCards: new PIXI.Container,
    enemyCards: new PIXI.Container
};

displayElements.animator = new AnimationQueue(displayElements.app)

/**
 * Moves a sprite to the front of a container.
 * There's probably a better way to do this but I'm leaving
 * it as is for now. (I'm also completely unsure if this works)
 * @param {PIXI.Sprite} sprite
 * @param {PIXI.Container} parent
 */
function bringToFront(sprite, parent) {
    parent.removeChild(sprite);
    parent.addChild(sprite);
}

function setupDisplay() {
    let app = displayElements.app; //quick alias

    document.body.appendChild(app.view);

    let background = Sprite.fromImage('/static/assets/4k-Board.png');

    app.stage.addChild(background);

    app.stage.addChild(displayElements.clickEventShapes);
    app.stage.addChild(displayElements.playerCards);
    app.stage.addChild(displayElements.enemyCards);

    app.stage.width = innerWidth;//p sure this works
    app.stage.height = innerHeight;

    background.width = app.stage.width;
    background.height = app.stage.height;

    background.x = 0;
    background.y = 0;

    bringToFront(background, app.view);

    app.renderer.resize(app.stage.width, app.stage.height);
}

/**
 * This function should accept an event object from the backend, generally passed through IO.
 * It might be useful to move this off to another file, since it's anticipated that there will
 * be a ton of event types in the future, but for now this is okay.
 * @param {Event} event the event to be processed
 */
function processEvent(event) {
    if(event.type == 'draw card') {
    PIXI.Sprite.fromImage('/static/assets/cards/'+cardName+'.png')
        //throw('implement please\n -Hughes')
    }
}

/**
 * Calling this function allows whatever class calls this to give a function that will be called whenever this class
 * decides that the user has given input that should be sent to the server. This is so that this file doesn't have to deal with networking.
 */
function setupOutput(func) {
    outputFunc = func;
}

/**
 * Call this function locally with output information whenever you want to send user input to the server.
 * @param {output} output the output to the server
 */
function outputEvent(output) {
    if(outputFunc != null) {
        outputFunc(output);
    }
}

