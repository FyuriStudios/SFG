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

/**
 * GameView has now become effectively a module. This should make the code much more readable and idiomatic.
 */
let GameView = (function() {


    /*
    globals
    */
    let grass = 420;
    let game = new ClientGame();
    let textures = {};

    /*
    This is the function that player output should be sent through. This file isn't going to handle networking.
    */
    var outputFunc;

    let app = new PIXI.Application({
            antialias: true,
            transparent: true,
            forceCanvas: false
    });

    /*
    A list of the enemy's card sprites. This is useful for when I need direct references to them in terms of their location and such.
    */
    let enemyHandSprites = [];

    animator = new AnimationQueue(app);

    /*
    All variables should be put above. Below this are the public and private functions of this module, so enter at your own risk.
    A lot of these aren't commented right now either.
    */

    let mouseOverCardInHand = function(eventObj) {
        if(this.inMoveQueue)
            return;

        //this.y -= .113*app.stage.height;

        animator.addMoveRequest(this, {x: this.x, y: this.y - .113*app.stage.height}, 10);

        hoverSizeCardInHandSprite(this);

        let temp = this;

        game.hand.forEach(function(card) {
            if(card.sprite.x > temp.x)
                animator.addMoveRequest(card.sprite, {x: card.sprite.x + app.stage.width * .086, y: card.sprite.y}, 15);
            else if(card.sprite.x < temp.x)
                animator.addMoveRequest(card.sprite, {x: card.sprite.x - app.stage.width * .086, y: card.sprite.y}, 15);
        });
    }

    let mouseOutCardInHand = function(eventObj) {
        if(this.inMoveQueue)
            return;

        animator.addMoveRequest(this, {x: this.x, y: this.y + .113*app.stage.height}, 10);

        smallSizeCardInHandSprite(this);

        let temp = this;

        game.hand.forEach(function(card) {
            if(card.sprite.x > temp.x)
                animator.addMoveRequest(card.sprite, {x: card.sprite.x - app.stage.width * .086, y: card.sprite.y}, 15);
            else if(card.sprite.x < temp.x)
                animator.addMoveRequest(card.sprite, {x: card.sprite.x + app.stage.width * .086, y: card.sprite.y}, 15);
        });
    }

    /*
    I reused a bunch of the code from the PIXI.JS demo. Sue me.
    */
    let onDragFromHandStart = function(eventObj) {

        if(this.inMoveQueue)
            return;

        this.originalPos = {
            x: this.x,
            y: this.y
        };

        this.dragData = eventObj.data;
        this.dragging = true;
    }

    let onDragFromHandMove = function() {

        if(this.dragging) {
            let pos = this.dragData.getLocalPosition(this.parent);
            this.x = pos.x;
            this.y = pos.y;
        }
    }

    let onDragFromHandEnd = function(eventObj) {

        this.dragging = false;
        this.dragData = null;

        let fieldBounds = {
            x: .147 * app.stage.width,
            y: .306 * app.stage.height,
            width: .706 * app.stage.width,
            height: .355 * app.stage.height
        };

        if (!(this.x > fieldBounds.x + fieldBounds.width ||
            this.x + this.width < fieldBounds.x ||
            this.y > fieldBounds.y + fieldBounds.height ||
            this.y + this.height < fieldBounds.y))
        {
            console.log('intersection');
            let handLoc;
            game.hand.forEach((element, index) => element.sprite == this? handLoc = index: null);
            let playType = game.hand[handLoc].type == 'monster'?'play monster':'play spell';
            outputFunc({
                type: playType,
                card: game.hand[handLoc], //this needs cleaning up. The frontend isn't necessarily recieving exactly this.
                handLoc: handLoc
            });

        }

        this.x = this.originalPos.x;
        this.y = this.originalPos.y;
    }

    /**
     * Resizes a card for its normal size (not being hovered over).
     * @param {Card} card
     */
    function smallSizeCardInHandSprite(card) {
        card.width = app.stage.width * .086;
        card.height = app.stage.height * .225;
    }

    function hoverSizeCardInHandSprite(card) {
        card.width = app.stage.width * .172;
        card.height = app.stage.height * .450;
    }

    /**
     * Generates the sprite container for a card. This function currently only will generate a test card,
     * but the intent is for it to do more in the future.
     * @param {number} x
     * @param {number} y
     */
    function generateCard(x, y) {

        let card = ClientCard.test();

        smallSizeCardInHandSprite(card.sprite);

        let spriteContainer = new PIXI.Container();
        spriteContainer.width = card.sprite.width;
        spriteContainer.height = card.sprite.height;

        spriteContainer.x = x;
        spriteContainer.y = y;

        spriteContainer.interactive = true;
        spriteContainer.interactiveChildren = true;

        spriteContainer.sortableChildren = true;

        card.sprite.interactive = true;

        spriteContainer.addChild(card.sprite);

        card.sprite = spriteContainer;

        card.updateCostText();

        app.stage.addChild(spriteContainer);

        card.sprite.on('mouseover', mouseOverCardInHand);

        card.sprite.on('mouseout', mouseOutCardInHand);

        card.sprite.on('pointerdown', onDragFromHandStart);

        card.sprite.on('pointerup', onDragFromHandEnd);

        card.sprite.on('pointerupoutside', onDragFromHandEnd);

        card.sprite.on('pointermove', onDragFromHandMove);

        return card;
    }

    /**
     * This function moves all cards in your hand over so that another card can be added to their hand.
     * I'm not going to handle a hand limit here just because the backend is expected to handle that.
     *
     * The card should have already been added to the hand array at this point, so it's okay imo for this function to not
     * have a reference to the added card.
     *
     * @returns the position to move the new card to
     */
    function fixOwnHandSpacing() {
        let cards = game.hand;

        let leftBound = .1135 * app.stage.width; //the left boundary of the player's hand
        let rightBound = .4385 * app.stage.width;

        let upperBound = .8320 * app.stage.height;

        let cardSpacingDivisor = (rightBound - leftBound) / (cards.length + 1); //here just figuring out the correct spacing between cards.

        cards.forEach(function(card, index) {
            let x = leftBound + cardSpacingDivisor * (index+1);
            let y = upperBound;

            animator.addMoveRequest(card.sprite, {x: x, y: y}, 5);
        });
    }

    function drawEnemyHand() {

    }

    return {

        /**
        * Moves a sprite to the front of a container.
        * There's probably a better way to do this but I'm leaving
        * it as is for now. (I'm also completely unsure if this works)
        * @param {PIXI.Sprite} sprite
        * @param {PIXI.Container} parent
        */
        bringToFront: function(sprite, parent) {
            parent.removeChild(sprite);
            parent.addChild(sprite);
        },

        /**
         * Sets up the display for the GameView.
         */
        setupDisplay: function() {

            /*
            Test initializing the game. I'll change this later but need this for now just in case.
            */
            game.init(1, [], 10, 10);

            document.body.addEventListener('mousedown', function(event) {
                console.log('x: ' + event.clientX);
                console.log('y: ' + event.clientY);
            })

            //it takes around 50 milliseconds for innerWidth and innerHeight to update, so I added a SetTimeout to compensate -Sean
            setTimeout(()=>{
                app.stage.width = innerWidth;
                app.stage.height = innerHeight;

                app.renderer.resize(innerWidth, innerHeight);

                document.body.appendChild(app.view);
            },50);

            let loader = PIXI.loader;

            loader.add('background', '/static/assets/game-board.png').add('cardBack', '/static/assets/cardback.png');

            loader.load((loader, resources) => {
                textures.background = resources.background.texture;
                textures.cardBack = resources.cardBack.texture;
            });

            loader.onProgress.add(() => {}); // called once per loaded/errored file //TODO: move this loading stuff into a new file
            loader.onError.add(() => {}); // called once per errored file
            loader.onLoad.add(() => {console.log('Loaded.')}); // called once per loaded file
            loader.onComplete.add(() => {
                let background = new PIXI.Sprite(textures.background);
                background.width = innerWidth;
                background.height = innerHeight;

                background.x = 0;
                background.y = 0;
                app.stage.addChild(background);

                // let ownDeck = new PIXI.Sprite(textures.cardBack);//TODO: add on hover card count
                // app.stage.addChild(ownDeck);
                // ownDeck.x = .0146 * app.stage.width;
                // ownDeck.y = .754 * app.stage.height;
                // ownDeck.height = .211 * app.stage.height;
                // ownDeck.width = .0827 * app.stage.width;


                let enemyDeck = new PIXI.Sprite(textures.cardBack);
                app.stage.addChild(enemyDeck);
                enemyDeck.x = .0146 * app.stage.width;
                enemyDeck.y = .005 * app.stage.height;
                enemyDeck.height = .137 * app.stage.height;
                enemyDeck.width = .0850 * app.stage.width;

            });






            animator.startAnimating();

            this.resizeDisplay();
        },

        resizeDisplay: function() {
            app.stage.width = innerWidth;
            app.stage.height = innerHeight;

            app.renderer.resize(innerWidth, innerHeight);

            document.body.appendChild(app.view);
        },

        /**
         * This function should accept an event object from the backend, generally passed through IO.
         * It might be useful to move this off to another file, since it's anticipated that there will
         * be a ton of event types in the future, but for now this is okay.
         * @param {Event} event the event to be processed
         */
        processEvent: function(event) {
            if(event.type == 'draw card') {

                if(event.player == game.id) {
                    let card = generateCard(app.stage.width*0.0565, app.stage.height*0.885);
                    game.hand.push(card);

                    app.stage.addChild(card.sprite);
                    animator.addMoveRequest(card.sprite, {x: innerWidth/2, y: innerHeight/2}, 5); //TODO: add card id handling
                    fixOwnHandSpacing();
                } else {
                    //let card = cardBack
                }


            }
        },

        /**
         * Calling this function allows whatever class calls this to give a function that will be called whenever this class
         * decides that the user has given input that should be sent to the server. This is so that this file doesn't have to deal with networking.
         */
        setupOutput: function (func) {
            outputFunc = func;
        },

        /**
         * Call this function locally with output information whenever you want to send user input to the server.
         * @param {output} output the output to the server
         */
        outputEvent: function (output) {
            if(outputFunc != null) {
                outputFunc(output);
            }
        }

    }

})();
