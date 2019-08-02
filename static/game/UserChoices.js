let UserChoices = (function() {

    let mouseOverSprite = function() {
        this.alpha = 0.6;
    }

    let mouseOutSprite = function() {
        this.alpha = 1;
    }

    return {

        target: function(game, socket, completion) {

            game.ownCharacterSprite.interactive = true;
            game.enemyCharacterSprite.interactive = true;

            let event = {
            };

            let chooseOwnBoardEvent = function() {

                let ind;
                game.ownBoard.forEach((value, index) => value.sprite == this? ind = index:null);

                unsetAll();
                this.alpha = 1;

                event.targetSide = game.id;
                event.target = ind;
                socket.emit('target choice', event);
                completion();
            }

            let chooseEnemyBoardEvent = function() {
                let ind;
                game.enemyBoard.forEach((value, index) => value.sprite == this? ind = index:null);

                unsetAll();
                this.alpha = 1;

                event.targetSide = game.id == 1?2:1;
                event.target = ind;
                socket.emit('target choice', event);
                completion();
            }

            let chooseEnemyHeroEvent = function() {
                unsetAll();
                this.alpha = 1;

                event.targetSide = game.id == 1?2:1;
                event.target = -1;
                socket.emit('target choice', event);

                completion();
            }

            let chooseOwnHeroEvent = function() {
                unsetAll();
                this.alpha = 1;

                event.targetSide = game.id == 1?2:1;
                event.target = -1;
                socket.emit('target choice', event);
                
                completion();
            }

            game.ownBoard.forEach(value => value.sprite.on('mouseup', chooseOwnBoardEvent));
            game.enemyBoard.forEach(value => value.sprite.on('mouseup', chooseEnemyBoardEvent));

            game.ownCharacterSprite.on('mouseup', chooseOwnHeroEvent);
            game.enemyCharacterSprite.on('mouseup', chooseEnemyHeroEvent);

            /*
            This block from here to the "END" comment is just setting it so that sprites get transparent when you hover them.
            */

            game.ownBoard.forEach(value => value.sprite.on('mouseover', mouseOverSprite));
            game.enemyBoard.forEach(value => value.sprite.on('mouseover', mouseOverSprite));

            game.ownBoard.forEach(value => value.sprite.on('mouseout', mouseOutSprite));
            game.enemyBoard.forEach(value => value.sprite.on('mouseout', mouseOutSprite));

            game.ownCharacterSprite.on('mouseover', mouseOverSprite);
            game.enemyCharacterSprite.on('mouseover', mouseOverSprite);

            game.ownCharacterSprite.on('mouseout', mouseOutSprite);
            game.enemyCharacterSprite.on('mouseout', mouseOutSprite);

            /*
            END
            */

            /**
             * This is used to remove all of the event listeners once one of them fires. This is seriously gross but it was easier to code than doing it the hard way.
             */
            function unsetAll() {
                game.ownBoard.forEach(value => value.sprite.off('mouseup', chooseOwnBoardEvent));
                game.enemyBoard.forEach(value => value.sprite.off('mouseup', chooseEnemyBoardEvent));

                game.ownCharacterSprite.off('mouseup', chooseOwnHeroEvent);
                game.enemyCharacterSprite.off('mouseup', chooseEnemyHeroEvent);

                game.ownBoard.forEach(value => value.sprite.off('mouseover', mouseOverSprite));
                game.enemyBoard.forEach(value => value.sprite.off('mouseover', mouseOverSprite));

                game.ownBoard.forEach(value => value.sprite.off('mouseout', mouseOutSprite));
                game.enemyBoard.forEach(value => value.sprite.off('mouseout', mouseOutSprite));

                game.ownCharacterSprite.off('mouseover', mouseOverSprite);
                game.enemyCharacterSprite.off('mouseover', mouseOverSprite);

                game.ownCharacterSprite.off('mouseout', mouseOutSprite);
                game.enemyCharacterSprite.off('mouseout', mouseOutSprite);
            }

        },

        /**
         * This event is used for monster effects - Specifically, I wrote this code for Shade of Pain.
         * @param {*} game 
         * @param {*} socket 
         * @param {*} completion 
         */
        chooseCard: function(game, socket, completion) {

            let chooseEvent = function() {
                    
                let ind;
                game.hand.forEach((value, index) => value.sprite == this? ind = index:null);
                
                game.hand.forEach(value => value.sprite.off('mouseup', chooseEvent));
                game.ownBoard.forEach(value => value.sprite.interactive = true);

                socket.emit('card choice', ind);
                completion();
            }

            game.hand.forEach(value => value.sprite.on('mouseup', chooseEvent));
            game.ownBoard.forEach(value => value.sprite.interactive = false);

        },

        /**
         * This is used for spell effects.
         * @param {*} game 
         * @param {*} socket 
         * @param {*} completion 
         */
        chooseHandCard: function(game, completion) {
            let chooseEvent = function() {
                    
                let ind;
                game.hand.forEach((value, index) => value.sprite == this? ind = index:null);
                
                game.hand.forEach(value => value.sprite.off('mouseup', chooseEvent));
                game.ownBoard.forEach(value => value.sprite.interactive = true);

                completion(ind);
            }

            game.hand.forEach(value => value.sprite.on('mouseup', chooseEvent));
            game.ownBoard.forEach(value => value.sprite.interactive = false);
        }

        mulligan: function(app, socket, completion) {

            let mulligan = new PIXI.Sprite(textures.mulligan);
            let noMulligan = new PIXI.Sprite(textures.noMulligan);

            mulligan.anchor.x = mulligan.anchor.y = noMulligan.anchor.x = noMulligan.anchor.y = .5;

            mulligan.width = noMulligan.width = app.stage.width * .23;
            mulligan.height = noMulligan.height = app.stage.height * .25;

            mulligan.y = noMulligan.y = app.stage.height * .5;
            mulligan.x = app.stage.width * .4;
            noMulligan.x = app.stage.width * .6;

            app.stage.addChild(mulligan);
            app.stage.addChild(noMulligan);

            mulligan.interactive = noMulligan.interactive = true;

            function mulliganMouseUp() {
                unsetListeners();
                socket.emit('mulligan', 'yes');
                completion();
            }

            function noMulliganMouseUp() {
                unsetListeners();
                socket.emit('mulligan', 'no');
                completion();
            }

            function mouseOver() {
                this.alpha = 0.6;
            }

            function mouseOut() {
                this.alpha = 1;
            }

            function unsetListeners() {
                mulligan.off('mouseup', mulliganMouseUp);
                noMulligan.off('mouseup', noMulliganMouseUp);
                mulligan.off('mouseover', mouseOver);
                mulligan.off('mouseout', mouseOut);
                noMulligan.off('mouseover', mouseOver);
                noMulligan.off('mouseout', mouseOut);

                app.stage.removeChild(mulligan);
                app.stage.removeChild(noMulligan);
            }

            mulligan.on('mouseup', mulliganMouseUp);
            noMulligan.on('mouseup', noMulliganMouseUp);
            mulligan.on('mouseover', mouseOver);
            mulligan.on('mouseout', mouseOut);
            noMulligan.on('mouseover', mouseOver);
            noMulligan.on('mouseout', mouseOut);

        },

        yakovMulligan: function(app, game, socket, completion, mouseDownFunction) {
            let hand = game.hand;

            hand.forEach(value => {
                value.selected = false;
                let filter = new PIXI.filters.AlphaFilter(1);
                value.sprite.filters = [filter];
            });

            let doneButton = new PIXI.Sprite(textures.mulligan);

            doneButton.interactive = true;

            doneButton.width = app.stage.width * .23;
            doneButton.height = app.stage.height * .25;
            doneButton.anchor.x = doneButton.anchor.y = .5;

            doneButton.x = app.stage.width * .5;
            doneButton.y = app.stage.height * .5;

            app.stage.addChild(doneButton);

            let mouseUpCard = function() {
                let temp;
                hand.forEach(value => value.sprite == this?temp = value:null);

                if(temp.selected) {
                    this.filters[0].alpha = 1;
                    //temp.popup.alpha = 1;
                    temp.selected = false;
                   
                }
                else {
                    this.filters[0].alpha = 0.6;
                    //temp.popup.alpha = 0.6;
                    temp.selected = true;
                }
            }

            let mouseUpDoneButton = function() {
                let choices = [];
                hand.forEach((value, index) => {
                    if(value.selected)
                        choices.push(index);
                });
                hand.forEach(value => value.sprite.off('mouseup', mouseUpCard));

                doneButton.off('mouseup', mouseUpDoneButton);
                app.stage.removeChild(doneButton);

                socket.emit('yakov mulligan', {choices: choices});

                hand.forEach(value => value.sprite.on('mousedown', mouseDownFunction));

                completion();
            }

            doneButton.on('mouseup', mouseUpDoneButton);
            
            hand.forEach(value => {
                value.sprite.on('mouseup', mouseUpCard);
                value.sprite.off('mousedown', mouseDownFunction);
            });

            doneButton.on('mouseover', mouseOverSprite);
            doneButton.on('mouseout', mouseOutSprite);
        },
        
    }
})();