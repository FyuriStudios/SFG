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


let GameView = (function () {

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

    let endTurnButton = {
        button: null, //This is gross. Fix it if I have the time.
        filter: new PIXI.filters.ColorMatrixFilter()
    }

    let arrow = null;

    let arrowDragging = false;

    let ownGraveyardHover = false;

    let enemyGraveyardHover = false;

    let graveyardDisplay = new PIXI.Container();

    let eventQueue = [];

    let processingEvent = false;

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
    let mouseOverCardInHand = function (eventObj) {

        if (this.inMoveQueue || this.dragging || arrowDragging)
            return;

        let temp;
        game.hand.forEach((val) => (val.sprite.x == this.x && val.sprite.y == this.y) ? temp = val : null);

        if (temp != undefined) {
            temp.displayPopup();
            app.stage.addChild(temp.popup);
        }

    }

    /**
     * This is the opposite of the above function: It gets called when the mouse comes off of the card.
     * It pretty much just does literally the opposite of the above function, everything back to the size and position of
     * where it was previously. Seriously, just look above if you want to figure out what this does.
     * @param {any} eventObj 
     */
    let mouseOutCardInHand = function (eventObj) {

        let temp = this;
        game.hand.forEach((val) => val.sprite == temp ? temp = val : null);
        app.stage.removeChild(temp.popup);
        temp.popup = undefined;

    }

    /**
     * This gets called when a card in your hand gets clicked on and the mouse is held. It starts the process of figuring out how to drag
     * the card to where the mouse is.
     * @param {any} eventObj 
     */
    let onDragFromHandStart = function (eventObj) {

        let temp = this;
        game.hand.forEach((val) => val.sprite == temp ? temp = val : null); //turn off the popup
        app.stage.removeChild(temp.popup);
        temp.popup = undefined;

        /*
        If you try to drag a card while it's animating somewhere, literally everything breaks so we just disallow dragging during animation.
        */
        if (this.inMoveQueue || arrowDragging)
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

        if(temp.type == 'spell' && temp.targeting) {
            temp.arrow = new PIXI.Sprite(textures.arrowHead);

            temp.arrow.width = .07 * app.stage.width;
            temp.arrow.height = .105 * app.stage.height;

            temp.arrow.anchor.x = arrow.anchor.y = .5;
        }

    }

    /**
     * This gets called when the mouse moves while the card in your hand is being dragged.
     */
    let onDragFromHandMove = function () {

        /*
        We have to make sure that the card is actually being dragged so that we don't drag cards that haven't been selected for dragging
        already.
        */
        if (this.dragging) {
            /*
            We update the position of the card to the position of the cursor.
            */
            let pos = this.dragData.getLocalPosition(this.parent);
            this.x = pos.x;
            this.y = pos.y;

            let fieldBounds = {
                x: .147 * app.stage.width,
                y: .306 * app.stage.height,
                width: .706 * app.stage.width,
                height: .355 * app.stage.height
            };

            let temp;
            game.hand.forEach((val) => val.sprite == this ? temp = val : null);

            if(temp.type == 'spell') {
                arrowDragging = true;
                this.alpha = 0;
                app.stage.addChild(temp.arrow);
                temp.arrow.x = this.x;
                temp.arrow.y = this.y;

                let angle = Math.atan2(pos.x - app.stage.width/2, pos.y - app.stage.height * .75);

                temp.arrow.rotation = 3.14 - angle;
            }

            /*
            This if statement checks to see if the card is intersecting with the field rectangle. Look up "check for rectangle intersection"
            on StackOverflow if you're curious about what this does.
            */
            else if (!(this.x > fieldBounds.x + fieldBounds.width ||
                    this.x + this.width < fieldBounds.x ||
                    this.y > fieldBounds.y + fieldBounds.height ||
                    this.y + this.height < fieldBounds.y)) {
                this.alpha = 0;

                temp.monsterContainer.x = this.x - this.width / 2;
                temp.monsterContainer.y = this.y - this.height / 2;
                temp.monsterContainer.width = this.width * 1.1;
                temp.monsterContainer.height = this.height * .9;
                app.stage.addChild(temp.monsterContainer); //this works because PIXI knows when a guy is already on the board.

                if (game.ownBoard.length < game.MAX_CARDS) {

                    let spotForCard;
                    game.ownBoard.forEach((card, index) => {

                        if (index == 0 && temp.monsterContainer.x < (card.sprite.xLoc - card.sprite.width / 2)) {
                            spotForCard = index;
                        } else if (index > 0 && temp.monsterContainer.x < (card.sprite.xLoc - card.sprite.width / 2) && temp.monsterContainer.x > (game.ownBoard[index - 1].sprite.xLoc - game.ownBoard[index - 1].sprite.width / 2)) {
                            spotForCard = index;
                        }

                    });

                    if (spotForCard == undefined) {
                        spotForCard = game.ownBoard.length;
                    }

                    this.spotForCard = spotForCard; //store it as a property of this object just so that it's easier to deal with, gross

                    slideCards(spotForCard);

                }

            } else if (temp.type != 'spell') {
                let temp;
                game.hand.forEach((val) => val.sprite == this ? temp = val : null);

                app.stage.removeChild(temp.monsterContainer);
                this.alpha = 1;

                slideCards();
            }

        }
    }

    /**
     * This is called when dragging on a card in your hand ends. If a card is dragged into the play area and then released, we'll emit
     * an event detailing that this card just got played.
     * @param {any} eventObj 
     */
    let onDragFromHandEnd = function (eventObj) {

        this.dragging = false;
        

        let temp = this;
        game.hand.forEach((val) => val.sprite == temp ? temp = val : null);

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
        handLoc will be the location of the card that was played in the player's hand because we need to give the card location as
        part of the card played event.
        */
        let handLoc;

        /*
        Loop through every element of own hand array to find the location of the card that was played.
        */
        game.hand.forEach((element, index) => element.sprite == this ? handLoc = index : null);

        if (temp.type == 'monster') {

            slideCards();

            app.stage.removeChild(temp.monsterContainer);
            this.alpha = 1;

            /*
            This if statement checks to see if the card is intersecting with the field rectangle. Look up "check for rectangle intersection"
            on StackOverflow if you're curious about what this does.
            */
            if (!(this.x > fieldBounds.x + fieldBounds.width ||
                    this.x + this.width < fieldBounds.x ||
                    this.y > fieldBounds.y + fieldBounds.height ||
                    this.y + this.height < fieldBounds.y)) {


                /*
                Call outputFunc with an event. Events from the backend to the frontend are similar to events going in the other direction,
                although I haven't documented frontend -> backend events yet.
                */
                outputFunc({
                    type: 'play card',
                    handLoc: handLoc,
                    playLoc: this.spotForCard
                });

                this.spotForCard = undefined;
            }
        } 

        else {
            
            if(temp.targeting) {

                let pos = this.dragData.getLocalPosition(this.parent);

                this.alpha = 1;
                
                app.stage.removeChild(arrow);

                game.enemyBoard.forEach((value, index) => {
                    if (value.sprite.x - value.sprite.width / 2 <= pos.x && value.sprite.x + value.sprite.width / 2 >= pos.x &&
                        value.sprite.y - value.sprite.height / 2 <= pos.y && value.sprite.y + value.sprite.height / 2 >= pos.y) {
                        outputFunc({
                            type: 'play card',
                            handLoc: handLoc,
                            target: index,
                            targetSide: game.id == 1?2:1,
                        });
                    }
                });

                game.ownBoard.forEach((value, index) => {
                    if (value.sprite.x - value.sprite.width / 2 <= pos.x && value.sprite.x + value.sprite.width / 2 >= pos.x &&
                        value.sprite.y - value.sprite.height / 2 <= pos.y && value.sprite.y + value.sprite.height / 2 >= pos.y) {
                        outputFunc({
                            type: 'play card',
                            handLoc: handLoc,
                            target: index,
                            targetSide: game.id,
                        });
                    }
                });

                if (app.stage.width * .435 <= pos.x && app.stage.width * .548 >= pos.x && app.stage.height * .0121 <= pos.y && app.stage.height * .189 >= pos.y) {
                    outputFunc({
                        type: 'attack',
                        player: game.id,
                        target: -1,
                        targetSide: game.id == 1?2:1,
                    });
                }

                else if (app.stage.width * .435 <= pos.x && app.stage.width * .548 >= pos.x && app.stage.height * .75 <= pos.y && app.stage.height * .95 >= pos.y) {
                    outputFunc({
                        type: 'attack',
                        player: game.id,
                        target: -1,
                        targetSide: game.id,
                    });
                }

            }
            else if (!(this.x > fieldBounds.x + fieldBounds.width ||
                this.x + this.width < fieldBounds.x ||
                this.y > fieldBounds.y + fieldBounds.height ||
                this.y + this.height < fieldBounds.y)) {
                outputFunc({
                    type: 'play card',
                    handLoc: handLoc,
                });
            }

            arrowDragging = false;
        }

        /**
         * Here I'm just resetting the position of the card.
         */

        if (this.originalPos != undefined) {
            this.x = this.originalPos.x;
            this.y = this.originalPos.y;
        }

        this.dragging = false;
        this.dragData = undefined;
    }

    /**
     * Resizes a card for its normal size (not being hovered over).
     * @param {Card} card
     */
    function smallSizeCardInHandSprite(card) {
        card.width = app.stage.width * .086;
        card.height = app.stage.height * .21;
    }

    function pointIntersectsWithSprite(point, sprite) {
        console.log('checking intersection');
        if(sprite.x - sprite.width / 2 <= point.x && sprite.x + sprite.width / 2 >= point.x &&
            sprite.y - value.sprite.height / 2 <= point.y && sprite.y + sprite.height / 2 >= point.y)
            return true;
        return false;
    }

    /**
     * This function finds all of the sprites that are in the player's hand array and animates them to the "correct" location in their 
     * hand. For example, when a player draws a card you can add it to their hand array and then call this function.
     * It might be useful to parameterize this a bit more than it is at the moment, but for now I think that this is totally fine.
     */
    function fixOwnHandSpacing(completion = null) {
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
        cards.forEach(function (card, index) {
            let x = leftBound + cardSpacingDivisor * (index + 1);
            let y = upperBound;

            if (index == 0 && completion != null) {
                AnimationQueue.addMoveRequest(card.sprite, {
                    x: x,
                    y: y
                }, 6, completion);
            } else {
                AnimationQueue.addMoveRequest(card.sprite, {
                    x: x,
                    y: y
                }, 6);
            }
        });

    }

    function fixEnemyHandSpacing(completion = null) {
        let leftBound = .1135 * app.stage.width;
        let rightBound = .4385 * app.stage.width;

        let upperBound = .1 * app.stage.height; //TODO: figure out what this number actually is

        let cardSpacingDivisor = (rightBound - leftBound) / (enemyCardsInHand.length + 1);

        enemyCardsInHand.forEach(function (card, index) {
            let x = leftBound + cardSpacingDivisor * (index + 1);
            let y = upperBound;

            if (index == 0 && completion != null)
                AnimationQueue.addMoveRequest(card, {
                    x: x,
                    y: y
                }, 6, () => completion());
            else
                AnimationQueue.addMoveRequest(card, {
                    x: x,
                    y: y
                }, 6);
        });
    }

    function fixHealths() {
        if (!(game.ownHealthText != undefined && game.ownHealth + '' == game.ownHealthText.text)) {
            app.stage.removeChild(game.ownHealthText);
            game.ownHealthText = new PIXI.Text(game.ownHealth, {
                fontFamily: 'Helvetica',
                fill: 0xffffff,
                fontSize: 100,
                stroke: 'red',
                strokeThickness: 8,
                align: 'center'
            });
            game.ownHealthText.anchor.x = game.ownHealthText.anchor.y = .5;
            game.ownHealthText.x = app.stage.width / 2;
            game.ownHealthText.y = app.stage.height * .75;
            game.ownHealthText.width = app.stage.width * (game.ownHealthText.text.length == 1 ? .03 : .045);
            game.ownHealthText.height = app.stage.height * .09;
            app.stage.addChild(game.ownHealthText);
        }
        if (!(game.enemyHealthText != undefined && game.enemyHealth + '' == game.enemyHealthText.text)) {
            app.stage.removeChild(game.enemyHealthText);
            game.enemyHealthText = new PIXI.Text(game.enemyHealth, {
                fontFamily: 'Helvetica',
                fill: 0xffffff,
                fontSize: 100,
                stroke: 'red',
                strokeThickness: 8,
                align: 'center'
            });
            game.enemyHealthText.anchor.x = game.ownHealthText.anchor.y = .5;
            game.enemyHealthText.x = app.stage.width / 2 - app.stage.width * .01;
            game.enemyHealthText.y = app.stage.height * .2;
            game.enemyHealthText.width = app.stage.width * (game.enemyHealthText.text.length == 1 ? .03 : .045);
            game.enemyHealthText.height = app.stage.height * .09;
            app.stage.addChild(game.enemyHealthText);
        }
    }

    /*
    TODO: make this less gross :(
    */
    function fixTokens() {

        if (!(game.ownMonsterTokenText != undefined && game.ownMonsterTokens + '' == game.ownMonsterTokenText.text)) {
            app.stage.removeChild(game.ownMonsterTokenText);
            game.ownMonsterTokenText = new PIXI.Text(game.ownMonsterTokens, {
                fontFamily: 'Helvetica',
                fill: 0xffffff,
                fontSize: 100,
                stroke: 'black',
                strokeThickness: 8,
                align: 'center'
            });
            game.ownMonsterTokenText.anchor.x = game.ownMonsterTokenText.y = .5;
            game.ownMonsterTokenText.x = app.stage.width * .6255;
            game.ownMonsterTokenText.y = app.stage.height * .839;
            game.ownMonsterTokenText.width = app.stage.width * (game.ownMonsterTokenText.text.length == 1 ? .04 : .06);
            game.ownMonsterTokenText.height = app.stage.height * .12;
            app.stage.addChild(game.ownMonsterTokenText);
        }

        if (!(game.ownSpellTokenText != undefined && game.ownSpellTokens + '' == game.ownSpellTokenText.text)) {
            app.stage.removeChild(game.ownSpellTokenText);
            game.ownSpellTokenText = new PIXI.Text(game.ownSpellTokens, {
                fontFamily: 'Helvetica',
                fill: 0xffffff,
                fontSize: 100,
                stroke: 'black',
                strokeThickness: 8,
                align: 'center'
            });
            game.ownSpellTokenText.anchor.x = game.ownSpellTokenText.y = .5;
            game.ownSpellTokenText.x = app.stage.width * .776;
            game.ownSpellTokenText.y = app.stage.height * .839;
            game.ownSpellTokenText.width = app.stage.width * (game.ownSpellTokenText.text.length == 1 ? .04 : .06);
            game.ownSpellTokenText.height = app.stage.height * .12;
            app.stage.addChild(game.ownSpellTokenText);
        }

        if (!(game.enemyMonsterTokenText != undefined && game.enemyMonsterTokens + '' == game.enemyMonsterTokenText.text)) {
            app.stage.removeChild(game.enemyMonsterTokenText);
            game.enemyMonsterTokenText = new PIXI.Text(game.enemyMonsterTokens, {
                fontFamily: 'Helvetica',
                fill: 0xffffff,
                fontSize: 100,
                stroke: 'black',
                strokeThickness: 8,
                align: 'center'
            });
            game.enemyMonsterTokenText.anchor.x = game.enemyMonsterTokenText.y = .5;
            game.enemyMonsterTokenText.x = app.stage.width * .6255;
            game.enemyMonsterTokenText.y = app.stage.height * .031;
            game.enemyMonsterTokenText.width = app.stage.width * (game.enemyMonsterTokenText.text.length == 1 ? .04 : .06);
            game.enemyMonsterTokenText.height = app.stage.height * .12;
            app.stage.addChild(game.enemyMonsterTokenText);
        }

        if (!(game.enemySpellTokenText != undefined && game.enemySpellTokens + '' == game.enemySpellTokenText.text)) {
            app.stage.removeChild(game.enemySpellTokenText);
            game.enemySpellTokenText = new PIXI.Text(game.enemySpellTokens, {
                fontFamily: 'Helvetica',
                fill: 0xffffff,
                fontSize: 100,
                stroke: 'black',
                strokeThickness: 8,
                align: 'center'
            });
            game.enemySpellTokenText.anchor.x = game.enemySpellTokenText.y = .5;
            game.enemySpellTokenText.x = app.stage.width * .776;
            game.enemySpellTokenText.y = app.stage.height * .031;
            game.enemySpellTokenText.width = app.stage.width * (game.enemySpellTokenText.text.length == 1 ? .04 : .06);
            game.enemySpellTokenText.height = app.stage.height * .12;
            app.stage.addChild(game.enemySpellTokenText);
        }

    }

    function fixOwnBoardSpacing(farLoc = undefined, completion = undefined) {
        let space = .1 * app.stage.width;
        let leftBound = app.stage.width / 2 - (space * game.ownBoard.length / 2);

        game.ownBoard.forEach((value, index) => {

            let xDestination = leftBound + (space * (index + 0.5));

            let yDestination = app.stage.height * 0.6;

            if (farLoc != undefined && index == farLoc && completion != undefined)
                AnimationQueue.addMoveRequest(value.sprite, {
                    x: xDestination,
                    y: yDestination
                }, 10, () => completion());
            else
                AnimationQueue.addMoveRequest(value.sprite, {
                    x: xDestination,
                    y: yDestination
                }, 10);
            value.sprite.xLoc = xDestination;
        });
    }

    function fixEnemyBoardSpacing(farLoc = undefined, completion = undefined) {
        let space = .1 * app.stage.width;
        let leftBound = app.stage.width / 2 - (space * game.enemyBoard.length / 2);

        game.enemyBoard.forEach((value, index) => {

            let xDestination = leftBound + (space * (index + 0.5));

            let yDestination = app.stage.height * 0.37;

            if (farLoc != undefined && index == farLoc && completion != undefined)
                AnimationQueue.addMoveRequest(value.sprite, {
                    x: xDestination,
                    y: yDestination
                }, 10, () => completion());
            else
                AnimationQueue.addMoveRequest(value.sprite, {
                    x: xDestination,
                    y: yDestination
                }, 10);
        });
    }

    function slideCards(loc = -1) {
        game.ownBoard.forEach((value, index) => {
            if (loc == -1) {
                AnimationQueue.addMoveRequest(value.sprite, {
                    x: value.sprite.xLoc,
                    y: value.sprite.y
                }, 10);
            } else if (loc <= index) {
                AnimationQueue.addMoveRequest(value.sprite, {
                    x: value.sprite.xLoc + app.stage.width * .05,
                    y: value.sprite.y
                }, 10);
            } else {
                AnimationQueue.addMoveRequest(value.sprite, {
                    x: value.sprite.xLoc - app.stage.width * .05,
                    y: value.sprite.y
                }, 10);
            }
        });
    }

    function mouseOverCardOnBoard(boardArray, sprite) {

        if (sprite.inMoveQueue || sprite.dragging || arrowDragging) {
            return;
        }

        let index;
        boardArray.forEach((value, ind) => {
            value.sprite == sprite ? index = ind : null;
        });

        if (index == undefined)
            return;

        boardArray[index].displayPopup();
        app.stage.addChild(boardArray[index].popup);
        boardArray[index].popup.height *= 1.1;
        boardArray[index].popup.x = app.stage.width * .834;
        boardArray[index].popup.y = app.stage.height / 2 - boardArray[index].popup.height / 2;
    }

    function mouseOutCardOnBoard(boardArray, sprite) {
        if (sprite.inMoveQueue)
            return;
        let temp;
        boardArray.forEach(value => value.sprite == sprite ? temp = value : null);

        if (temp != undefined && temp.popup != undefined)
            app.stage.removeChild(temp.popup);
    }

    let mouseOverOwnCardOnBoard = function () {
        mouseOverCardOnBoard(game.ownBoard, this);
    }
    let mouseOverEnemyCardOnBoard = function () {
        mouseOverCardOnBoard(game.enemyBoard, this);
    }
    let mouseOutOwnCardOnBoard = function () {
        mouseOutCardOnBoard(game.ownBoard, this);
    }
    let mouseOutEnemyCardOnBoard = function () {
        mouseOutCardOnBoard(game.enemyBoard, this);
    }

    function onMouseDragCardOnBoardStart(eventObj) {
        this.originalPos = {
            x: this.x,
            y: this.y
        };
        this.dragging = true;
        arrowDragging = true;
        this.alpha = 0.6;
        this.dragData = eventObj.data;

    }

    function onMouseDragCardOnBoardMove(eventObj) {

        if (this.dragging && arrowDragging) {
            let pos = this.dragData.getLocalPosition(this.parent);
            let angle = Math.atan2(pos.x - this.originalPos.x, pos.y - this.originalPos.y);

            arrow.width = .07 * app.stage.width;
            arrow.height = .105 * app.stage.height;

            arrow.anchor.x = arrow.anchor.y = .5;
            arrow.x = pos.x;
            arrow.y = pos.y;

            arrow.rotation = 3.14 - angle;

            app.stage.addChild(arrow);
        }

    }

    function onMouseDragCardOnBoardEnd() {

        let pos = this.dragData.getLocalPosition(this.parent);

        this.alpha = 1;
        this.originalPos = undefined;
        this.dragging = false;
        this.dragData = undefined;
        arrowDragging = false;
        app.stage.removeChild(arrow);

        let attackerLoc;
        game.ownBoard.forEach((value, index) => value.sprite == this ? attackerLoc = index : null);

        game.enemyBoard.forEach((value, index) => {
            if (value.sprite.x - value.sprite.width / 2 <= pos.x && value.sprite.x + value.sprite.width / 2 >= pos.x &&
                value.sprite.y - value.sprite.height / 2 <= pos.y && value.sprite.y + value.sprite.height / 2 >= pos.y) {
                outputFunc({
                    type: 'attack',
                    player: game.id,
                    target: index,
                    attacker: attackerLoc,
                });
            }
        });

        if (app.stage.width * .435 <= pos.x && app.stage.width * .548 >= pos.x && app.stage.height * .0121 <= pos.y && app.stage.height * .189 >= pos.y) {
            outputFunc({
                type: 'attack',
                player: game.id,
                target: -1,
                attacker: attackerLoc, //targeting the enemy hero
            });
        }
    }

    function onMouseOverOwnGraveyard() {
        if (!arrowDragging) {
            this.alpha = 0.5;
            ownGraveyardHover = true;
            app.stage.addChild(graveyardDisplay);
            graveyardDisplay.scrollCount = 0;
            game.ownGraveyard.forEach((value, index) => {
                value.displayPopup();
                value.popup.width = value.popup.width * .6;
                value.popup.height = value.popup.height * .6;
                value.popup.x = app.stage.width * .1;
                value.popup.y = index * app.stage.height * .22 + app.stage.height * .01;
                if (value.popup.y > 0 && value.popup.y + value.popup.height < app.stage.height)
                    graveyardDisplay.addChild(value.popup);
            });
        }
    }

    function onMouseOverEnemyGraveyard() {
        if (!arrowDragging) {
            this.alpha = 0.5;
            enemyGraveyardHover = true;
            app.stage.addChild(graveyardDisplay);
            graveyardDisplay.scrollCount = 0;
            game.enemyGraveyard.forEach((value, index) => {
                value.displayPopup();
                value.popup.width = value.popup.width * .6;
                value.popup.height = value.popup.height * .6;
                value.popup.x = app.stage.width * .1;
                value.popup.y = index * app.stage.height * .22 + app.stage.height * .01;
                if (value.popup.y > 0 && value.popup.y + value.popup.height < app.stage.height)
                    graveyardDisplay.addChild(value.popup);
            });
        }
    }

    function onMouseOffOwnGraveyard() {
        this.alpha = 1;
        ownGraveyardHover = false;
        app.stage.removeChild(graveyardDisplay);
        graveyardDisplay.scrollCount = 0;
        graveyardDisplay.removeChildren();
    }

    function onMouseOffEnemyGraveyard() {
        this.alpha = 1;
        enemyGraveyardHover = false;
        app.stage.removeChild(graveyardDisplay);
        graveyardDisplay.scrollCount = 0;
        graveyardDisplay.removeChildren();
    }

    function onGraveyardScroll(event) {
        let graveyard;

        if (ownGraveyardHover)
            graveyard = game.ownGraveyard;
        else if (enemyGraveyardHover)
            graveyard = game.enemyGraveyard;
        else
            return;

        graveyard.forEach(value => {
            value.popup.y += event.deltaY * app.stage.height * 0.0465;
            if (value.popup.y < 0 || value.popup.y + value.popup.height > app.stage.height)
                graveyardDisplay.removeChild(value.popup);
            else
                graveyardDisplay.addChild(value.popup);
        });
    }


    function nextInEventQueue() {

        if (eventQueue.length == 0) {
            processingEvent = false;
            return;
        } else {
            processingEvent = true;
        }

        let event = eventQueue.shift();

        if (event.type == 'draw card') {

            if (event.player == game.id) {

                game.ownDeckSize -= 1;

                /*
                Generate a new card and put it into the player's hand.
                */
                let card = ClientCard.from(event.card);

                smallSizeCardInHandSprite(card.sprite);

                card.sprite.x = app.stage.width * 0.0565;
                card.sprite.y = app.stage.height * 0.885;

                card.sprite.on('mouseover', mouseOverCardInHand);
                card.sprite.on('mouseout', mouseOutCardInHand);
                card.sprite.on('pointerdown', onDragFromHandStart);
                card.sprite.on('pointerup', onDragFromHandEnd);
                card.sprite.on('pointerupoutside', onDragFromHandEnd);
                card.sprite.on('pointermove', onDragFromHandMove);

                app.stage.addChild(card.sprite);

                game.hand.unshift(card);

                /*
                Animate the card into the player's hand.
                */
                fixOwnHandSpacing(() => nextInEventQueue());

            } else {

                game.enemyDeckSize -= 1;

                let card = new PIXI.Sprite(textures.cardBack);

                card.anchor.x = .5;
                card.anchor.y = .5;

                card.x = app.stage.width * .0146;
                card.y = app.stage.height * .1;

                enemyCardsInHand.unshift(card);

                smallSizeCardInHandSprite(card);

                app.stage.addChild(card);

                fixEnemyHandSpacing(() => nextInEventQueue());

            }
        } else if (event.type == 'play card') {

            if (event.player == game.id) { //TODO: account for spells later.

                if (game.hand[event.handLoc].type == 'monster')
                    game.ownMonsterTokens -= game.hand[event.handLoc].currentCost;
                else
                    game.ownSpellTokens -= game.hand[event.handLoc].currentCost;
                fixTokens();

                let card = game.hand.splice(event.handLoc, 1)[0]; //remove the card at the relevant location in the player's hand

                if (card.type == 'monster') {
                    game.ownBoard.splice(event.playLoc, 0, card); //insert the card at the correct location in the player's board
                    card.boardForm();

                    card.sprite.off('mouseover', mouseOverCardInHand);

                    card.sprite.off('mouseout', mouseOutCardInHand);

                    card.sprite.off('pointerdown', onDragFromHandStart);

                    card.sprite.off('pointerup', onDragFromHandEnd);

                    card.sprite.off('pointerupoutside', onDragFromHandEnd); //removing mouse events. Then we'll re-add custom events.

                    card.sprite.off('pointermove', onDragFromHandMove);

                    card.sprite.on('mouseover', mouseOverOwnCardOnBoard);
                    card.sprite.on('mouseout', mouseOutOwnCardOnBoard);
                    card.sprite.on('pointerdown', onMouseDragCardOnBoardStart);
                    card.sprite.on('pointerup', onMouseDragCardOnBoardEnd);
                    card.sprite.on('pointerupoutside', onMouseDragCardOnBoardEnd);
                    card.sprite.on('pointermove', onMouseDragCardOnBoardMove);

                    fixOwnHandSpacing();

                    fixOwnBoardSpacing(event.playLoc, () => nextInEventQueue());
                } else {
                    AnimationQueue.addMoveRequest(card.sprite, {
                        x: app.stage.width * .02,
                        y: app.stage.height * .55
                    });
                    game.ownGraveyard.push(card);
                }

            } else {

                let enemyCard = ClientCard.from(event.card);

                if (enemyCard.type == 'monster')
                    game.enemyMonsterTokens -= enemyCard.currentCost;
                else
                    game.enemySpellTokens -= enemyCard.currentCost;
                fixTokens();

                let targetPlay = enemyCardsInHand.splice(event.handLoc, 1)[0];

                app.stage.removeChild(targetPlay);

                game.enemyBoard.splice(event.playLoc, 0, enemyCard);
                smallSizeCardInHandSprite(enemyCard.sprite);

                app.stage.addChild(enemyCard.sprite);

                enemyCard.sprite.x = targetPlay.x + enemyCard.sprite.width / 2;
                enemyCard.sprite.y = targetPlay.y;

                if (enemyCard.type == 'monster') {
                    enemyCard.boardForm();

                    fixEnemyHandSpacing();

                    fixEnemyBoardSpacing(event.playLoc, () => nextInEventQueue());

                    enemyCard.sprite.on('mouseover', mouseOverEnemyCardOnBoard);
                    enemyCard.sprite.on('mouseout', mouseOutEnemyCardOnBoard);
                } else {
                    AnimationQueue.addMoveRequest(enemyCard.sprite, {
                        x: app.stage.width * .02,
                        y: app.stage.height * .39
                    });
                    game.enemyGraveyard.push(enemyCard);
                }

            }

        } else if (event.type == 'end turn') {

            if (event.player == game.id) {
                endTurnButton.filter.desaturate();
            }

            nextInEventQueue();
        } else if (event.type == 'start turn') {

            if (event.player == game.id) {
                endTurnButton.filter.saturate(1); //TODO: play an animation here.
                game.ownMonsterTokens += event.monsterTokensGained;
                game.ownSpellTokens += event.spellTokensGained;
            } else {
                endTurnButton.filter.desaturate();
                game.enemyMonsterTokens += event.monsterTokensGained;
                game.enemySpellTokens += event.spellTokensGained;
            }
            fixTokens();

            nextInEventQueue();
        } else if (event.type == 'attack') {

            if (event.target == -1) {

                if (event.player == game.id) {
                    let xDestination = .492 * app.stage.width;
                    let yDestination = .189 * app.stage.height;
                    let attacker = game.ownBoard[event.attacker];

                    AnimationQueue.addMoveRequest(attacker.sprite, {
                        x: xDestination,
                        y: yDestination
                    }, 13, () => {
                        game.enemyHealth -= attacker.currentPower;
                        fixHealths();
                        fixOwnBoardSpacing(event.attacker, () => {
                            nextInEventQueue()
                        });
                    });

                    fixHealths();
                    return;
                } else {
                    let xDestination = .5 * app.stage.width;
                    let yDestination = .834 * app.stage.height;
                    let attacker = game.enemyBoard[event.attacker];

                    AnimationQueue.addMoveRequest(attacker.sprite, {
                        x: xDestination,
                        y: yDestination
                    }, 13, () => {
                        game.ownHealth -= attacker.currentPower;
                        fixHealths();
                        fixEnemyBoardSpacing(event.attacker, () => {
                            nextInEventQueue();
                        });
                    });


                    return;
                }

            }

            let attacker, target;

            if (event.player == game.id) {
                attacker = game.ownBoard[event.attacker];
                target = game.enemyBoard[event.target];
            } else {
                attacker = game.enemyBoard[event.attacker];
                target = game.ownBoard[event.target];
            }

            let dx = target.sprite.x - attacker.sprite.x;
            let dy = attacker.sprite.y - target.sprite.y;

            let dist = Math.sqrt(dx * dx + dy * dy);

            dx = dx / dist;
            dy = dy / dist;

            AnimationQueue.addMoveRequest(attacker.sprite, {
                x: target.sprite.x,
                y: target.sprite.y
            }, 13, () => {
                let tempAPower = attacker.currentPower;
                let tempTPower = target.currentPower;
                attacker.currentPower -= tempTPower;
                target.currentPower -= tempAPower;

                if (attacker.currentPower < 0)
                    attacker.currentPower = 0;
                if (target.currentPower < 0)
                    target.currentPower = 0;

                attacker.updatePower();
                target.updatePower();

                AnimationQueue.addMoveRequest(attacker.sprite, {
                    x: attacker.sprite.x - (dx * tempTPower * app.stage.width * .01),
                    y: attacker.sprite.y + (dy * tempTPower * app.stage.width * .01)
                }, 15);

                AnimationQueue.addMoveRequest(target.sprite, {
                    x: target.sprite.x + (dx * tempAPower * app.stage.width * .01),
                    y: target.sprite.y - (dy * tempAPower * app.stage.width * .01)
                }, 15, () => {
                    setTimeout(() => {
                        fixOwnBoardSpacing();
                        fixEnemyBoardSpacing(event.player == game.id ? event.target : event.attacker, () => nextInEventQueue());
                    }, 200);
                });

            });
        } else if (event.type == 'kill dead') {
            if (event.player == game.id) {
                let dead = game.ownBoard.splice(event.target, 1)[0];

                fixOwnBoardSpacing();

                if (dead == undefined)
                    return;

                game.ownGraveyard.unshift(dead);

                if (dead.popup != undefined)
                    app.stage.removeChild(dead.popup);
                app.stage.removeChild(dead.sprite);
                nextInEventQueue();
            } else {
                let dead = game.enemyBoard.splice(event.target, 1)[0];

                fixEnemyBoardSpacing();

                if (dead == undefined)
                    return;

                game.enemyGraveyard.unshift(dead);

                if (dead.popup != undefined)
                    app.stage.removeChild(dead.popup);
                app.stage.removeChild(dead.sprite); //TODO: add dust animation.
                nextInEventQueue();
            }

        } else if (event.type == 'disconnection') {
            gameOver(game.id);
        } else if (event.type == 'game over') {
            gameOver(event.player);
        }
        else if(event.type == 'damage') {
            console.log('Damage event not implemented!');
        }

    }

    function gameOver(playerID) {
        if (playerID == game.id)
            window.location.replace('/static/win.html');
        else
            window.location.replace('/static/lose.html');
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
        setupDisplay: function (id, ownStartingDeckSize, enemyStartingDeckSize) {

            /*
            This is just a test initialization of the game data. It will get better initialized later but for now this is here just
            so that the data can be used in testing.
            */
            game.init(id, ownStartingDeckSize, enemyStartingDeckSize);

            /*

            This is also a testing construct. Every time the pointer is pressed, this prints the pointer location. I've been using this
            to figure out exact decimal values for locations on the board and such.
            */

            document.body.addEventListener('mousedown', function (event) {
                console.log('x: ' + event.clientX / app.stage.width);
                console.log('y: ' + event.clientY / app.stage.height);
            });

            /*
            Don't touch this. Everything breaks if you do.
            */
            setTimeout(() => {
                if(txt != undefined)
                    txt.remove(); //remove the waiting text if the little bugger tries to come back
                else
                    setTimeout(() => {if(txt!= undefined) txt.remove()}, 4000); //if he's still not around, we'll try one more time.

                app.stage.width = innerWidth;
                app.stage.height = innerHeight;

                app.renderer.resize(innerWidth, innerHeight);

                document.body.appendChild(app.view);
            }, 50);

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
            loader.add('background', '/static/assets/full_board.png')
                .add('cardBack', '/static/assets/cardback.png')
                .add('deck', '/static/assets/deck.png')
                .add('endButton', '/static/assets/End_Turn_Button.png')
                .add('endButtonHover', '/static/assets/End_Turn_Button_Hover.png')
                .add('tokenFrame', '/static/assets/tokenFrame.png')
                .add('arrowHead', '/static/assets/arrow_head.png')
                .add('arrowBody', '/static/assets/arrow_body.png')
                .add('graveyardIcon', '/static/assets/graveyardIcon.png');

            /*
            Remember the textures object from way up by, like, line 20? This is where we add stuff to it. This closure gets called when
            the textures have loaded.
            */
            loader.load((loader, resources) => {
                textures.background = resources.background.texture;
                textures.deck = resources.deck.texture;
                textures.cardBack = resources.cardBack.texture;
                textures.endButton = resources.endButton.texture;
                textures.endButtonHover = resources.endButtonHover.texture;
                textures.tokenFrame = resources.tokenFrame.texture;
                textures.arrowHead = resources.arrowHead.texture;
                textures.arrowBody = resources.arrowBody.texture;
                textures.graveyardIcon = resources.graveyardIcon.texture;
            });
            loader.onProgress.add(() => {}); // called once per loaded/errored file //TODO: move this loading stuff into a new file
            loader.onError.add(() => {}); // called once per errored file
            loader.onLoad.add(() => {
                console.log('Loaded.')
            }); // called once per loaded file

            /*
            This onComplete function runs once the textures have loaded. It would probably be useful to move this function out
            somewhere else to make this setupDisplay function smaller.

            All it does pretty much is add images that are guaranteed to be there at the beginning of the game (e.g. background) to the
            stage. It may do more in the future but that's it for the time being.

            TODO: reduce the size of this function. Maybe we should be loading textures elsewhere and this should just run when setupView is called?
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

                endTurnButton.button = new PIXI.Sprite(textures.endButton);
                endTurnButton.button.interactive = true;
                endTurnButton.button.filters = [endTurnButton.filter];
                endTurnButton.filter.desaturate();

                endTurnButton.button.x = app.stage.width * .005;
                endTurnButton.button.y = app.stage.height * .455;
                endTurnButton.button.width = app.stage.width * .103;
                endTurnButton.button.height = app.stage.height * .09;

                app.stage.addChild(endTurnButton.button);

                endTurnButton.button.on('mouseover', () => {
                    endTurnButton.button.texture = textures.endButtonHover;
                });

                endTurnButton.button.on('mouseout', () => {
                    endTurnButton.button.texture = textures.endButton;
                })

                endTurnButton.button.on('mousedown', () => {
                    endTurnButton.button.alpha = 0.7;
                });

                endTurnButton.button.on('mouseup', () => {
                    outputFunc({
                        type: 'end turn'
                    });
                    endTurnButton.button.alpha = 1;
                });

                /*
                Add the enemy's deck image to the stage. We add the sprite at the very end because if we add the sprite before resizing
                it, the deck image will be enormous and actually change the size of the stage.
                The weird decimal x y and height locations etc were calculated by hand, there's no particular rhyme or reason to what
                they are numerically.
                */
                let enemyDeck = new PIXI.Sprite(textures.deck);
                enemyDeck.x = .0146 * app.stage.width;
                enemyDeck.y = .01 * app.stage.height;
                enemyDeck.height = .212 * app.stage.height;
                enemyDeck.width = .0850 * app.stage.width;
                app.stage.addChild(enemyDeck);

                /*
                Add the player's deck image to the stage. Pretty much same as above.
                */
                let ownDeck = new PIXI.Sprite(textures.deck);
                ownDeck.x = .0146 * app.stage.width;
                ownDeck.y = .775 * app.stage.height;
                ownDeck.height = .212 * app.stage.height;
                ownDeck.width = .0850 * app.stage.width;
                app.stage.addChild(ownDeck);

                let friendlyTokenFrame = new PIXI.Sprite(textures.tokenFrame);
                friendlyTokenFrame.x = .585 * app.stage.width;
                friendlyTokenFrame.y = .83 * app.stage.height;
                friendlyTokenFrame.width = .23 * app.stage.width;
                friendlyTokenFrame.height = .15 * app.stage.height;
                app.stage.addChild(friendlyTokenFrame);

                let enemyTokenFrame = new PIXI.Sprite(textures.tokenFrame);
                enemyTokenFrame.x = .585 * app.stage.width;
                enemyTokenFrame.y = .02 * app.stage.height;
                enemyTokenFrame.width = .23 * app.stage.width;
                enemyTokenFrame.height = .15 * app.stage.height;
                app.stage.addChild(enemyTokenFrame);

                fixHealths();


                /*
                The below code adds deck size popups. It probably needs to be tweaked a little bit, but it works for now so I'm not
                going to bother commenting it because I don't really want to even worry about this for a while.
                */
                enemyDeck.interactive = true;
                enemyDeck.on('mouseover', () => {

                    let popup = new PIXI.Container();
                    popup.x = enemyDeck.x + enemyDeck.width + app.stage.width * .03;
                    popup.y = enemyDeck.y + enemyDeck.height / 2;

                    let text = new PIXI.Text(game.enemyDeckSize + ' cards in deck', {
                        fontFamily: 'Helvetica',
                        fontSize: 100,
                        fill: 0x000fff,
                        align: 'center'
                    });
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
                    popup.y = ownDeck.y + ownDeck.height / 2;

                    let text = new PIXI.Text(game.ownDeckSize + ' cards in deck', {
                        fontFamily: 'Helvetica',
                        fontSize: 100,
                        fill: 0x000fff,
                        align: 'center'
                    });
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
                fixTokens();

                arrow = new PIXI.Sprite(textures.arrowHead);

                let ownGraveyardIcon = new PIXI.Sprite(textures.graveyardIcon);
                ownGraveyardIcon.width = app.stage.width * .07;
                ownGraveyardIcon.height = app.stage.height * .11;
                ownGraveyardIcon.x = app.stage.width * .02;
                ownGraveyardIcon.y = app.stage.height * .55;
                app.stage.addChild(ownGraveyardIcon);

                let enemyGraveyardIcon = new PIXI.Sprite(textures.graveyardIcon);
                enemyGraveyardIcon.width = app.stage.width * .07;
                enemyGraveyardIcon.height = app.stage.height * .11;
                enemyGraveyardIcon.x = app.stage.width * .02 + enemyGraveyardIcon.width / 2;
                enemyGraveyardIcon.y = app.stage.height * .39;
                enemyGraveyardIcon.anchor.x = enemyGraveyardIcon.anchor.y = 0.5;
                enemyGraveyardIcon.rotation = 3.142;
                app.stage.addChild(enemyGraveyardIcon);

                document.body.addEventListener('wheel', onGraveyardScroll);

                ownGraveyardIcon.interactive = true;
                ownGraveyardIcon.on('mouseover', onMouseOverOwnGraveyard);
                ownGraveyardIcon.on('mouseout', onMouseOffOwnGraveyard);

                enemyGraveyardIcon.interactive = true;
                enemyGraveyardIcon.on('mouseover', onMouseOverEnemyGraveyard);
                enemyGraveyardIcon.on('mouseout', onMouseOffEnemyGraveyard);

                nextInEventQueue();

            });

            AnimationQueue.startAnimating(app);

        },

        /**
         * Resizes the display because maybe the size of the screen changed. Called from index.html when the page is resized by hand.
         */
        resizeDisplay: function () {

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
        processEvent: function (event) {
            eventQueue.push(event);
            console.log(event);
            if (!processingEvent && app.stage.children.length > 0)
                nextInEventQueue();
        },

        /**
         * This function is called to define what happens to output from the user (playing cards, ending turn, etc.).
         * This pattern barely makes sense to me, so ask me if you're confused because this is pretty confusing imo.
         * @param {*} func the function to be called with output
         */
        setupOutput: function (func) {
            outputFunc = func;
        },

    }

})();