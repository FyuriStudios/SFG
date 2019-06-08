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

        }
    }
})();