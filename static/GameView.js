import ClientGame from './ClientGame';
/*
 * Just a few constants that are useful to have around.
 */
const aspectRatio = 9/16;
const moveVelocity = 0.1;

/*
 * Initialize containers and aliases
 */
let Loader = PIXI.loader;
let Sprite = PIXI.Sprite;

let grass = 420;

let clickEventShapes = new PIXI.Container();
let playerCards = new PIXI.Container();
let enemyCards = new PIXI.Container();

/*
 * Initialize the PIXI application as "app"
 */
let app = new PIXI.Application({
    antialias: true,
    transparent: true,
    forceCanvas: false
});

let game = new ClientGame();

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

class ClickInterface {

    constructor() {
        this.clickInformation = null;
        this.isDragging = false;
    }

    onDragStart(clickInformation) {
        this.clickInformation = clickInformation;
    }

    onDragMove(clickInformation) {
        if(isDragging) {
            return clickInformation.getLocalPosition(app);
        }
    }

}

let clickHandler = new ClickInterface();

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

function animateSprite(sprite, to) {
    
}
