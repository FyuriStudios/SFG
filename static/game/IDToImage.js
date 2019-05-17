IDToImage = (function () {
    
    return {

        fromID: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/in_hand/Hickory-Test.png');
            } else if(id == -2) {
                return PIXI.Sprite.from('/static/assets/in_hand/test2.png');
            }
        },

        popupFromId: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/popup/test_popup.png');
            } else if(id == -2) {
                return PIXI.Sprite.from('/static/assets/popup/test2_popup.png');
            }
        },

        monsterFromID: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Hickory_Board_Piece.png');
            }
        }
    }

})();