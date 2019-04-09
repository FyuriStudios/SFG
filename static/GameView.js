/*
This is the driving file for drawing the game and dealing with the user interacting with the cards and such. Most of the important
logic is still here (I'm too lazy to move it to another file), so this code is starting to get really long and complicated.

In essence, this "GameView" module simply provides an interface via the "processEvent" function that allows an external piece of code
to manipulate the view without actually having to deal with logic. There's also a "setupOutput" function that allows an external piece
of code to define what happens to the input that goes through this file.

If you're confused about this function syntax, it's actually pretty simple. All I'm doing is creating a variable of name "GameView" and
setting it equal to the value of calling an anonymous function, meaning that referencing GameView simply means that I can call the
functions that are returned by it. This allows me to define private functions inside the big function that can deal with all the logic
but can't be accessed outside of the function. JavaScript doesn't have modules, so I had to do this instead. Fuck you, JS.
See here for more details if you're still confused: 
https://stackoverflow.com/questions/22734188/javascript-module-pattern-with-anonymous-functions

Look below for a more detailed explanation of everything that's going on.
*/

/**
 * This is a list of the globally loaded textures that might be useful to just kind of have loaded, like the card backs and the
 * background. This makes it so that we can reuse commonly used textures instead of having to reload the textures every time we
 * want to use them.
 */
 let textures = {};


let GameView = (function() {

    /*
    Don't touch. The last person who touched it got killed brutally.
    */
    let grass = 420;

    /**
     * Creating a ClientGame object. This object will hold all of the game state information, like cards in hand and such.
     * See ClientGame.js for more details.
     */
    let game = new ClientGame();

    /**
     * This is the function that all output will be sent through. For example, when a player plays a card, this file will call this
     * function with the card playing information. That way, this file doesn't have to deal with what happens with the output.
     */
    var outputFunc;

    /**
     * This PIXI.Application object is the backbone of the graphics processing. It provides a stage for us that we can draw things onto,
     * and it deals with Ticker (clock stuff) and all of the other useful things that we will want to use. You'll see a lot of this
     * variable showing up further down in the code.
     */
    let app = new PIXI.Application({
            antialias: true,
            transparent: true,
            forceCanvas: false //these are just some options that we applied in the constructor. See PIXI documentation for more details.
    });

    /**
     * This is the array of enemy card sprites that will be displayed when the game has 
     */
    let enemyCardsInHand = [];

    /**
     * This is a custom animation object that allows us to make things smoothly move around the stage. See AnimationQueue.js for more
     * details.
     */
    let animator = new AnimationQueue(app);

    /*
    Above this is the space for declaring module scope variables (variables that can be accessed by any of the functions below and 
    modified.)

    Fair warning, the more variables we have, the more confusing the code gets. Modifying global state often creates weird bugs that are
    hard to fix because you're changing a variable in so many places that it's hard to figure out what's wrong. Also, this code does a 
    lot of that already so it's probably good to try to avoid that going forwards.

    Below this point are local functions that are just here for reusable code or for moving code around so that we don't have to define
    all of the logic in one place. Many of them are just functions used to define behavior of a card when it's clicked, dragged, etc.
    More on that below.
    */

    /**
     * This is the mouseOverCard event function for when you mouse over one of your own cards. It's supposed to do the following:
     *  - Make the card bigger
     *  - Display the card tooltip
     * 
     * 
     * @param {any} eventObj the object passed in by the mouse event. Look in PIXI documentation for more on what this variable is.
     */
    let mouseOverCardInHand = function(eventObj) {

        if(this.inMoveQueue)
            return;

        let temp;
        game.hand.forEach((val) => (val.sprite.x == this.x && val.sprite.y == this.y)?temp=val:null);

        temp.displayPopup();

        app.stage.addChild(temp.popup);

    }

    /**
     * This is the opposite of the above function: It gets called when the mouse comes off of the card.
     * It pretty much just does literally the opposite of the above function, animating everything back to the size and position of
     * where it was previously. Seriously, just look above if you want to figure out what this does.
     * @param {any} eventObj 
     */
    let mouseOutCardInHand = function(eventObj) {

        let temp = this;
        game.hand.forEach((val) => val.sprite == temp?temp=val:null);
        app.stage.removeChild(temp.popup);
        temp.popup = undefined;

    }

    /**
     * This gets called when a card in your hand gets clicked on and the mouse is held. It starts the process of figuring out how to drag
     * the card to where the mouse is.
     * @param {any} eventObj 
     */
    let onDragFromHandStart = function(eventObj) {

        /*
        If you try to drag a card while it's animating somewhere, literally everything breaks so we just disallow dragging during animation.
        */
        if(this.inMoveQueue)
            return;

        /*
        We'll define a property on this object holding its original position so that we know where to return it to at the end of the
        card's dragging lifetime. There's probably a cleaner way to store this but it's okay for now.
        */
        this.originalPos = {
            x: this.x,
            y: this.y
        };

        /*
        I have absolutely no clue what this line does but it's what they used in the card dragging demo in the PIXI demos section
        (claiming it's needed for touchscreens) so please leave it here.
        */
        this.dragData = eventObj.data;

        /*
        Define another property on this object saying "hey, this is currently being dragged!!1"
        */
        this.dragging = true;
    }

    /**
     * This gets called when the mouse moves while the card in your hand is being dragged.
     */
    let onDragFromHandMove = function() {

        /*
        We have to make sure that the card is actually being dragged so that we don't drag cards that haven't been selected for dragging
        already.
        */
        if(this.dragging) {
            /*
            We update the position of the card to the position of the cursor.
            */
            let pos = this.dragData.getLocalPosition(this.parent);
            this.x = pos.x;
            this.y = pos.y;
        }
    }

    /**
     * This is called when dragging on a card in your hand ends. If a card is dragged into the play area and then released, we'll emit
     * an event detailing that this card just got played.
     * @param {any} eventObj 
     */
    let onDragFromHandEnd = function(eventObj) {

        /*
        Unset the fields from earlier because we aren't using them anymore.
        */
        this.dragging = false;
        this.dragData = undefined;

        /*
        Defining a rectangle to be the boundaries of what is considered to be the "field".
        This is the area that the card is dragged into to play it.
        */
        let fieldBounds = {
            x: .147 * app.stage.width,
            y: .306 * app.stage.height,
            width: .706 * app.stage.width,
            height: .355 * app.stage.height
        };

        /*
        This if statement checks to see if the card is intersecting with the field rectangle. Look up "check for rectangle intersection"
        on StackOverflow if you're curious about what this does.
        */
        if (!(this.x > fieldBounds.x + fieldBounds.width ||
            this.x + this.width < fieldBounds.x ||
            this.y > fieldBounds.y + fieldBounds.height ||
            this.y + this.height < fieldBounds.y))
        {
            /*
            handLoc will be the location of the card that was played in the player's hand because we need to give the card location as
            part of the card played event.
            */
            let handLoc;

            /*
            Loop through every element of own hand array to find the location of the card that was played.
            */
            game.hand.forEach((element, index) => element.sprite == this? handLoc = index: null);

            /*
            Figure out what kind of card was played (monster or event). We should probably change the "play spell" to "play event" but it
            requires some fixing on the backend as well so leave it for now.
            */
            let playType = game.hand[handLoc].type == 'monster'?'play monster':'play spell';

            /*
            Call outputFunc with an event. Events from the backend to the frontend are similar to events going in the other direction,
            although I haven't documented frontend -> backend events yet.
            */
            outputFunc({
                type: playType,
                card: game.hand[handLoc], //this needs cleaning up. The frontend isn't necessarily recieving exactly this.
                handLoc: handLoc
            });

        }

        /**
         * Here I'm just resetting the position of the card.
         */
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

    /**
     * Resizes a card to its hover size (currently 2 times the size of the small card.)
     * @param {Card} card 
     */
    function hoverSizeCardInHandSprite(card) {
        card.width = app.stage.width * .172;
        card.height = app.stage.height * .450;
    }

    /**
     * Generates the sprite container for a card. This function currently only will generate a test card,
     * but the intent is for it to do more in the future.
     * 
     * It's important to remember that whenever you generate a card you should use this instead of the normal ClientCard constructor 
     * because the normal constructor has no way to decide how to make a dynamic text marker for the card. This generates the cost for
     * the card and everything.
     * 
     * This function also adds all of the proper mouse events that make it clickable and draggable and hoverable and whatever. See 
     * above for documentation on those.
     * 
     * IMPORTANT: the intent of this function is for you to be able to pass in a ClientCard object and have this function generate the 
     * graphical card container for it. For now, the object will be generated by this function instead, for testing purposes. This will 
     * have to change in the future because this function is super important and has a lot of important logic in it.
     * 
     * @param {number} x the x location to initialize the sprite at.
     * @param {number} y the y location to initialize the sprite at.
     * 
     * @returns The card that had its container modified.
     */
    function generateCard(x, y) {

        /*
        Just generate a test card. That's all this function does at the moment.
        ClientCard.test (check ClientCard.js for more) generates a card with some default values and art just for testing.
        */
        let card = ClientCard.test();

        /*
        Make the card small.
        */
        smallSizeCardInHandSprite(card.sprite);

        /*
        PIXI.Container acts a lot like a sprite (you can resize it and click on it and everything) except it doesn't display anything
        other than its children. In this case the container is used to hold the graphics of the card but also the cost and power of 
        the card. We actually change the card.sprite property to a container by doing this, so that's worth considering.
        */
        let spriteContainer = new PIXI.Container();

        /*
        We set the size of the container to the size of the original card sprite to avoid breaking anything.
        */
        spriteContainer.width = card.sprite.width;
        spriteContainer.height = card.sprite.height;

        /*
        Set the location of the container to the spot specified in the parameters.
        */
        spriteContainer.x = x;
        spriteContainer.y = y;

        /*
        These two lines make the container sensitive to click events.
        */
        spriteContainer.interactive = true;
        spriteContainer.interactiveChildren = true;

        /*
        This just makes it so that children of this container get sorted so that the ones added later go to the front
        of the container and display over the others.
        */
        spriteContainer.sortableChildren = true;

        /*
        This also makes the card's image interactive. If we don't do this, then only the number will be interactive which means that the
        card will be pretty much impossible to deal with.
        */
        card.sprite.interactive = true;

        /*
        Add the card's sprite to this new container.
        */
        spriteContainer.addChild(card.sprite);

        /*
        This is probably the most disgusting line of code I've ever written but basically I'm just overwriting the card's sprite
        property and replacing it with this new fancy container thing. It totally works tho, and when I tried to fix it to something
        a little cleaner everything broke. So just leave it, and whenever you create a new card you should make sure to change the
        card's sprite to a container.

        -Hughes
        */
        card.sprite = spriteContainer;

        /*
        Calls a property of the ClientCard class that adds a cost to the card. This should also be called when the cost of a card
        is modified because it will actually change the cost graphically to reflect that.
        */
        card.updateCostText();

        /*
        We add this sprite container to the view now that it's been all constructed and everything.
        */
        app.stage.addChild(spriteContainer);

        /*
        Look above for more information on what these functions do, since they're defined above (line 200-ish). Basically just defining
        that these functions get called on mouse over, mouse out, pointer down, etc.
        */
        card.sprite.on('mouseover', mouseOverCardInHand);

        card.sprite.on('mouseout', mouseOutCardInHand);

        card.sprite.on('pointerdown', onDragFromHandStart);

        card.sprite.on('pointerup', onDragFromHandEnd);

        card.sprite.on('pointerupoutside', onDragFromHandEnd);

        card.sprite.on('pointermove', onDragFromHandMove);

        /*
        Then we return a reference to the card so that it can be further manipulated.
        */
        return card;
    }

    /**
     * This function finds all of the sprites that are in the player's hand array and animates them to the "correct" location in their 
     * hand. For example, when a player draws a card you can add it to their hand array and then call this function.
     * It might be useful to parameterize this a bit more than it is at the moment, but for now I think that this is totally fine.
     */
    function fixOwnHandSpacing() {
        /*
        quick alias to game.hand to save the characters bc I don't like typing (jk, I'm here writing this comment)
        */
        let cards = game.hand;

        let leftBound = .1135 * app.stage.width; //the left boundary of the player's hand
        let rightBound = .4385 * app.stage.width; //the right boundary of the player's hand

        let upperBound = .8320 * app.stage.height; //the y location that all of the cards should sit on (we haven't added hand curve yet)

        /*
        This number is the space between every card in the player's hand. It's just a simple ratio, so as the number of cards in the
        player's hand increases, the cards get more squished. When there are only two cards they're held pretty far apart, tho.
        Maybe we should hand-define spacing for cards later on.
        */
        let cardSpacingDivisor = (rightBound - leftBound) / (cards.length + 1);

        /*
        Finds the correct location for every card and adds an animation request to put the card in its correct place.
        */
        cards.forEach(function(card, index) {
            let x = leftBound + cardSpacingDivisor * (index+1);
            let y = upperBound;

            animator.addMoveRequest(card.sprite, {x: x, y: y}, 15);
        });
    }

    function fixEnemyHandSpacing() {
        let leftBound = .1135 * app.stage.width;
        let rightBound = .4385 * app.stage.width;

        let upperBound = .1 * app.stage.height; //TODO: figure out what this number actually is

        let cardSpacingDivisor = (rightBound - leftBound) / (cards.length + 1);

        enemyCardsInHand.forEach(function(card, index) {
            let x = leftBound + cardSpacingDivisor * (index+1);
            let y = upperBound;

            animator.addMoveRequest(card.sprite, {x: x, y: y}, 5);
        });
    }

    /**
     * This function hasn't been defined yet. At some point the idea is to make it add a card to the enemy's hand.
     * There should also be a discardEnemyCard function, but that comes later.
     */
    function drawEnemyHand() {

    }

    /*
    This "return" statement is just one big JSON object. It contains all of the functions that should be able to be called externally.
    These functions generally provide a "safe" way to interact with the data inside this module, so that graphics are only handled here 
    and all that has to happen externally is calling of these functions.
    */
    return {

        /**
         * This function sets up all relevant graphics objects and listeners and data and what have you to make this module all ready
         * to display the game. Call this externally when you're ready to display everything.
         */
        setupDisplay: function() {

            /*
            This is just a test initialization of the game data. It will get better initialized later but for now this is here just
            so that the data can be used in testing.
            */
            game.init(1, [], 10, 10);

            /*
            This is also a testing construct. Every time the pointer is pressed, this prints the pointer location. I've been using this
            to figure out exact decimal values for locations on the board and such.
            */
            document.body.addEventListener('mousedown', function(event) {
                console.log('x: ' + event.clientX);
                console.log('y: ' + event.clientY);
            })

            /*
            Don't touch this. Everything breaks if you do.
            */
            //it takes around 50 milliseconds for innerWidth and innerHeight to update, so I added a SetTimeout to compensate -Sean
            setTimeout(()=>{
                app.stage.width = innerWidth;
                app.stage.height = innerHeight;

                app.renderer.resize(innerWidth, innerHeight);

                document.body.appendChild(app.view);
            },50);

            /*
            An alias to PIXI.loader to make this code more readable
            */
            let loader = PIXI.loader;

            /*
            See PIXI documentation for more on how this loader works. Basically I'm just adding these images to memory as textures so
            that they can be more easily reused later. In this case only the background and the card back image are being added. Feel
            free to add more later on, although you'll have to make sure to add a line to loader.load adding your texture to the textures
            object.
            */
            loader.add('background', '/static/assets/game-board.png').add('cardBack', '/static/assets/cardback.png').add('popup', '/static/assets/Brick_Border.png');

            /*
            Remember the textures object from way up by, like, line 20? This is where we add stuff to it. This closure gets called when
            the textures have loaded.
            */
            loader.load((loader, resources) => {
                textures.background = resources.background.texture;
                textures.cardBack = resources.cardBack.texture;
                textures.popup = resources.popup.texture;
            });
            loader.onProgress.add(() => {}); // called once per loaded/errored file //TODO: move this loading stuff into a new file
            loader.onError.add(() => {}); // called once per errored file
            loader.onLoad.add(() => {console.log('Loaded.')}); // called once per loaded file

            /*
            This onComplete function runs once the textures have loaded. It would probably be useful to move this function out
            somewhere else to make this setupDisplay function smaller.

            All it does pretty much is add images that are guaranteed to be there at the beginning of the game (e.g. background) to the
            stage. It may do more in the future but that's it for the time being.
            */
            loader.onComplete.add(() => {

                /*
                Add the background image to the stage.
                */
                let background = new PIXI.Sprite(textures.background);
                background.width = innerWidth;
                background.height = innerHeight;
                background.x = 0;
                background.y = 0;
                app.stage.addChild(background);

                /*
                Add the enemy's deck image to the stage. We add the sprite at the very end because if we add the sprite before resizing
                it, the deck image will be enormous and actually change the size of the stage.
                The weird decimal x y and height locations etc were calculated by hand, there's no particular rhyme or reason to what
                they are numerically.
                */
                let enemyDeck = new PIXI.Sprite(textures.cardBack);
                enemyDeck.x = .0146 * app.stage.width;
                enemyDeck.y = .01 * app.stage.height;
                enemyDeck.height = .212 * app.stage.height; 
                enemyDeck.width = .0850 * app.stage.width;
                app.stage.addChild(enemyDeck);

                /*
                Add the player's deck image to the stage. Pretty much same as above.
                */
                let ownDeck = new PIXI.Sprite(textures.cardBack);
                ownDeck.x = .0146 * app.stage.width;
                ownDeck.y = .775 * app.stage.height;
                ownDeck.height = .212 * app.stage.height;
                ownDeck.width = .0850 * app.stage.width;
                app.stage.addChild(ownDeck);

                
                /*
                The below code adds deck size popups. It probably needs to be tweaked a little bit, but it works for now so I'm not
                going to bother commenting it because I don't really want to even worry about this for a while.
                */
                enemyDeck.interactive = true;
                enemyDeck.on('mouseover', () => {

                    let popup = new PIXI.Container();
                    popup.x = enemyDeck.x + enemyDeck.width + app.stage.width * .03;
                    popup.y = enemyDeck.y + enemyDeck.height/2;

                    let text = new PIXI.Text(game.enemyDeckSize + ' cards in deck', {fontFamily: 'Helvetica', fontSize: 100, fill: 0x000fff, align: 'center'});
                    text.width = app.stage.height * .1;
                    text.height = app.stage.width * .017;
                    text.anchor.x = .5;
                    text.anchor.y = .5;
                    popup.addChild(text);

                    enemyDeck.popup = popup;

                    app.stage.addChild(popup);
                }); 

                enemyDeck.on('mouseout', () => {
                    app.stage.removeChild(enemyDeck.popup);
                    enemyDeck.popup = undefined;
                }); 

                ownDeck.interactive = true;
                ownDeck.on('mouseover', () => {
                    let popup = new PIXI.Container();
                    popup.x = ownDeck.x + ownDeck.width + app.stage.width * .03;
                    popup.y = ownDeck.y + ownDeck.height/2;

                    let text = new PIXI.Text(game.ownDeckSize + ' cards in deck', {fontFamily: 'Helvetica', fontSize: 100, fill: 0x000fff, align: 'center'});
                    text.width = app.stage.height * .1;
                    text.height = app.stage.width * .017;
                    text.anchor.x = .5;
                    text.anchor.y = .5;
                    popup.addChild(text);

                    ownDeck.popup = popup;

                    app.stage.addChild(popup);
                });

                ownDeck.on('mouseout', () => {
                    app.stage.removeChild(ownDeck.popup);
                    ownDeck.popup = undefined;
                });
                
            });

            /*
            Get the animation object running. See the AnimationQueue object for more details.
            */
            animator.startAnimating();

        },

        /**
         * Resizes the display because maybe the size of the screen changed. Called from index.html when the page is resized by hand.
         */
        resizeDisplay: function() {

            /*
            Changes height and width to the new screen size.
            */
            app.stage.width = innerWidth;
            app.stage.height = innerHeight;

            /*
            Force resizes the screen in the renderer.
            */
            app.renderer.resize(innerWidth, innerHeight);

            /*
            Adds a new view child. This might be unnecessary but I haven't tested it much.
            */
            document.body.appendChild(app.view);
        },

        /**
         * This function should accept an event object from the backend, generally passed through IO.
         * It might be useful to move this off to another file, since it's anticipated that there will
         * be a ton of event types in the future, but for now this is okay.
         * 
         * This is the most important function of the class: it handles input from the backend. This input will be processed here and
         * translated into graphical changes.
         * @param {Event} event the event to be processed
         */
        processEvent: function(event) {

            /*
            Currently, drawing cards is the only event type that's supported. Look at the header of backend/game.js for more information
            about events and their parameters and such (under construction).
            */
            if(event.type == 'draw card') {
                /*
                Check to make sure that it's actually this player that's drawing the card. We haven't handled the enemy player drawing
                card animation or any of that yet.
                */
                if(event.player == game.id) {
                    /*
                    Generate a new card and put it into the player's hand.
                    */

                    let card = generateCard(app.stage.width*0.0565, app.stage.height*0.885);
                    
                    game.hand.push(card);

                    /*
                    Animates the card into the middle of the screen. Probably unnecessary and worth removing. If you even read this deep
                    in the code, I actually challenge you to delete the below line.
                    */
                    animator.addMoveRequest(card.sprite, {x: app.stage.width * .2, y: .8320 * app.stage.height}, 5); //TODO: add card id handling

                    /*
                    Animate the card into the player's hand.
                    */
                    fixOwnHandSpacing();

                } else {
                   
                    let card = new PIXI.Sprite(textures.cardBack);//TODO: do more with this.

                    smallSizeCardInHandSprite(card);

                    app.stage.addChild(card);

                    card.anchor.x = .5;
                    card.anchor.y = .5;
                    
                    card.x = app.stage.width * .0146;
                    card.y = app.stage.height * .1;

                }
            }

            if(event.type == 'play card') {

            }
        },

        /**
         * This function is called to define what happens to output from the user (playing cards, ending turn, etc.).
         * This pattern barely makes sense to me, so ask me if you're confused because this is pretty confusing imo.
         * @param {*} func the function to be called with output
         */
        setupOutput: function (func) {
            if(outputFunc != null) {
                outputFunc = func;
            }
        },

    }

})();
