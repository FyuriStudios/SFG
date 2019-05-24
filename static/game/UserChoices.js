let UserChoices = (function() {
    return {

        target: function(game, completion) {

            let chooseOwnBoardEvent = function() {

                let ind;
                game.ownBoard.forEach((value, index) => value.sprite == this? ind = index:null);

                game.ownBoard.forEach(value => value.sprite.off('mouseup', chooseOwnBoardEvent));
                game.enemyBoard.forEach(value => value.sprite.off('mouseup', chooseEnemyBoardEvent));

                game.ownCharacterSprite.off('mousedown', chooseOwnHeroEvent);
                game.enemyCharacterSprite.off('mousedown', chooseEnemyHeroEvent);

                completion(game.id, ind);
            }

            let chooseEnemyBoardEvent = function() {
                let ind;
                game.enemyBoard.forEach((value, index) => value.sprite == this? ind = index:null);

                game.ownBoard.forEach(value => value.sprite.off('mouseup', chooseOwnBoardEvent));
                game.enemyBoard.forEach(value => value.sprite.off('mouseup', chooseEnemyBoardEvent));

                game.ownCharacterSprite.off('mousedown', chooseOwnHeroEvent);
                game.enemyCharacterSprite.off('mousedown', chooseEnemyHeroEvent);

                completion(game.id == 1?2:1, ind);
            }

            let chooseEnemyHeroEvent = function() {
                game.ownBoard.forEach(value => value.sprite.off('mouseup', chooseOwnBoardEvent));
                game.enemyBoard.forEach(value => value.sprite.off('mouseup', chooseEnemyBoardEvent));

                game.ownCharacterSprite.off('mousedown', chooseOwnHeroEvent);
                game.enemyCharacterSprite.off('mousedown', chooseEnemyHeroEvent);

                completion(game.id == 1?2:1, -1);
            }

            let chooseOwnHeroEvent = function() {
                game.ownBoard.forEach(value => value.sprite.off('mouseup', chooseOwnBoardEvent));
                game.enemyBoard.forEach(value => value.sprite.off('mouseup', chooseEnemyBoardEvent));

                game.ownCharacterSprite.off('mousedown', chooseOwnHeroEvent);
                game.enemyCharacterSprite.off('mousedown', chooseEnemyHeroEvent);

                completion(game.id, -1);
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