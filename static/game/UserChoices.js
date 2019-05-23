let UserChoices = (function() {
    return {
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