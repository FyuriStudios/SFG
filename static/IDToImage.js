IDToImage = (function () {
    
    return {
        from: function(path) {
            return PIXI.Sprite.from(path);
        },

        fromID: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/cards/Hickory-Test.png');
            }
            return PIXI.Sprite.from('/static/assets/cards/Hickory-Test.png');
        },

        popupFromId: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/cards/test_hover.png');
            }
            return PIXI.Sprite.from('/static/assets/cards/test_hover.png');
        }
    }


})();