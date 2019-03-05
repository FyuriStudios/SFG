IDToImage = (function () {
    
    return {
        from: function(path) {
            return PIXI.Sprite.from(path);
        },

        fromID: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/cards/Darfler.png');
            }
            return PIXI.Sprite.from('/static/assets/cards/Darfler.png');
        }
    }


})();