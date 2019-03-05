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

    game.init(1, [], 10, 10);

    var outputFunc;
    let displayElements = {

        app: new PIXI.Application({//"app" is now part of the displayElements object
            antialias: true,
            transparent: true,
            forceCanvas: false
        }),

        clickEventShapes: new PIXI.Container(),
        playerCards: new PIXI.Container(),
        enemyCards: new PIXI.Container()
    };

    displayElements.animator = new AnimationQueue(displayElements.app);

    /**
     * Resizes a card for its normal size (not being hovered over).
     * @param {Card} card 
     */
    function smallSizeCardSprite(card) {
        card.width = displayElements.app.stage.width * .086;
        card.height = displayElements.app.stage.height * .225;
    }

    function hoverSizeCardSprite(card) {
        card.width = displayElements.app.stage.width * .172;
        card.height = displayElements.app.stage.height * .450;
    }

    function generateCard(x, y) {
        
        let card = ClientCard.test();

        smallSizeCardSprite(card.sprite);

        card.sprite.x = x;
        card.sprite.y = y;

        displayElements.app.stage.addChild(card.sprite);

        card.sprite.interactive = true;

        card.sprite.on('mouseover', function(eventObj) {
            if(this.inMoveQueue)
                return;
            
            this.y -= .113*displayElements.app.stage.height;
            
            hoverSizeCardSprite(this);

            let temp = this;

            game.hand.forEach(function(card) {
                if(card.sprite.x > temp.x) {
                    card.sprite.x += displayElements.app.stage.width * .086;
                }
                else if(card.sprite.x < temp.x) {
                    card.sprite.x -= displayElements.app.stage.width * .086;
                }
            })
        });

        card.sprite.on('mouseout', function(eventObj) {
            if(this.inMoveQueue)
                return;

            this.y += .113*displayElements.app.stage.height;

            smallSizeCardSprite(this);

            let temp = this;

            game.hand.forEach(function(card) {
                if(card.sprite.x > temp.x)
                    card.sprite.x -= displayElements.app.stage.width * .086;
                else if(card.sprite.x < temp.x)
                    card.sprite.x += displayElements.app.stage.width * .086;
            });
        });

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
        let animator = displayElements.animator; //aliases so I don't have to write the same lines of code a bunch of times

        let leftBound = .1135 * displayElements.app.stage.width; //the left boundary of the player's hand
        let rightBound = .4385 * displayElements.app.stage.width;

        let upperBound = .8320 * displayElements.app.stage.height;

        let cardSpacingDivisor = (rightBound - leftBound) / (cards.length + 1); //here just figuring out the correct spacing between cards.

        cards.forEach(function(card, index) {
            let x = leftBound + cardSpacingDivisor * (index+1);
            let y = upperBound;

            animator.addMoveRequest(card.sprite, {x: x, y: y}, 5);
        });
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

            document.body.addEventListener('mousedown', function(event) {
                console.log('x: ' + event.clientX);
                console.log('y: ' + event.clientY);
            })

            let app = displayElements.app; //quick alias

            //it takes around 50 milliseconds for innerWidth and innerHeight to update, so I added a SetTimeout to compensate -Sean
            setTimeout(()=>{
                app.stage.width = innerWidth;
                app.stage.height = innerHeight;
        
                app.renderer.resize(innerWidth, innerHeight);
        
                document.body.appendChild(app.view);
            },50);
    
            displayElements.textures = {};
    
            Loader.add('background', '/static/assets/4k-Board.png').add('darfler', '/static/assets/cards/Darfler.png');
    
            Loader.load((loader, resources) => {
                displayElements.textures.background = resources.background.texture;
                displayElements.textures.darfler = resources.darfler.texture;
            });
    
            Loader.onProgress.add(() => {}); // called once per loaded/errored file //TODO: move this loading stuff into a new file
            Loader.onError.add(() => {}); // called once per errored file
            Loader.onLoad.add(() => {console.log('Loaded.')}); // called once per loaded file
            Loader.onComplete.add(() => {
                let background = new PIXI.Sprite(displayElements.textures.background);
                background.width = innerWidth;
                background.height = innerHeight;
            
                background.x = 0;
                background.y = 0;
                app.stage.addChild(background);
            });

            app.stage.addChild(displayElements.clickEventShapes);
            app.stage.addChild(displayElements.playerCards);
            app.stage.addChild(displayElements.enemyCards);


            displayElements.animator.startAnimating();
    
            this.resizeDisplay();
        },
    
        resizeDisplay: function() {
            let app = displayElements.app;
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
            let app = displayElements.app; //quick alias
            if(event.type == 'draw card') {

                let card = generateCard(app.stage.width*0.0565, app.stage.height*0.885);
                game.hand.push(card);

                displayElements.app.stage.addChild(card.sprite);
                displayElements.animator.addMoveRequest(card.sprite, {x: innerWidth/2, y: innerHeight/2}, 5);
                fixOwnHandSpacing();
                //displayElements.animator.addSizeRequest(card, {x:2,y:2}, 60);
            }
            if(event.type == 'throw away card') {
                let temp = game.hand.pop();
                temp.sprite.destroy();
                fixOwnHandSpacing();
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
