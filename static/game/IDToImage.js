IDToImage = (function () {
    
    return {

        fromID: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/in_hand/Hickory-Test.png');
            } else if(id == -2) {
                return PIXI.Sprite.from('/static/assets/in_hand/test2.png');
            } else if(id == 1) {
                return PIXI.Sprite.from('/static/assets/in_hand/Melody_Hand.png');
            } else if(id == 2) {
                return PIXI.Sprite.from('/static/assets/in_hand/Mantra_Hand.png');
            }
        },

        popupFromId: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/popup/test_popup.png');
            } else if(id == -2) {
                return PIXI.Sprite.from('/static/assets/popup/test2_popup.png');
            } else if(id == 1) {
                return PIXI.Sprite.from('/static/assets/popup/Melody_Hover.png');
            } else if(id == 2) {
                return PIXI.Sprite.from('/static/assets/popup/Mantra_Hover.png');
            }
        },

        monsterFromID: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Hickory_Board_Piece.png');
            } else if(id == 1) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Melody_Board_Piece.png');
            } else if(id == 2) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Mantra_Board_Piece.png');
            }
        }
    }

})();