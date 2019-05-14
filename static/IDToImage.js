IDToImage = (function () {
    
    return {

        fromID: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/cards/Hickory-Test.png');
            } else if(id == -2) {
                return PIXI.Sprite.from('/static/assets/cards/test2.png');
            }
            return PIXI.Sprite.from('/static/assets/cards/Hickory-Test.png');
        },

        popupFromId: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/cards/test_hover.png');
            } else if(id == -2) {
                return PIXI.Sprite.from('/static/assets/cards/test2_popup.png');
            }
            return PIXI.Sprite.from('/static/assets/cards/test_hover.png');
        },

        monsterFromID: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/monster_pieces/Board-Piece-HickoryBlueBear.png');
            }
        }
    }


})();