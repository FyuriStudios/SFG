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
            } else if(id == 3) {
                return PIXI.Sprite.from('/static/assets/in_hand/JBG_Hand.png');
            } else if(id == 4) {
                return PIXI.Sprite.from('/static/assets/in_hand/Crust_Hand.png');
            } else if(id == 5) {
                return PIXI.Sprite.from('/static/assets/in_hand/Domino_Hand.png');
            } else if(id == 6) {
                return PIXI.Sprite.from('/static/assets/in_hand/Secret_Grove_Hand.png');
            } else if(id == 7) {
                return PIXI.Sprite.from('/static/assets/in_hand/Ratakhe_Hand.png');
            } else if(id == 8) {
                return PIXI.Sprite.from('/static/assets/in_hand/Sanguine_Mire_Hand.png');
            } else if(id == 9) {
                return PIXI.Sprite.from('/static/assets/in_hand/Lugneus_Hand.png');
            } else if(id == 10) {
                return PIXI.Sprite.from('/static/assets/in_hand/Ancient_Cur_Hand.png');
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
            } else if(id == 3) {
                return PIXI.Sprite.from('/static/assets/popup/JBG_Hover.png');
            } else if(id == 4) {
                return PIXI.Sprite.from('/static/assets/popup/Crust_Hover.png');
            } else if(id == 5) {
                return PIXI.Sprite.from('/static/assets/popup/Domino_Hover.png');
            } else if(id == 6) {
                return PIXI.Sprite.from('/static/assets/popup/Secret_Hover.png');
            } else if(id == 7) {
                return PIXI.Sprite.from('/static/assets/popup/Ratakhe_Hover.png');
            } else if(id == 8) {
                return PIXI.Sprite.from('/static/assets/popup/Sanguine_Mire_Hover.png');
            } else if(id == 9) {
                return PIXI.Sprite.from('/static/assets/popup/Lugneus_Hover.png');
            } else if(id == 10) {
                return PIXI.Sprite.from('/static/assets/popup/Ancient_Cur_Hover.png');
            }
        },

        monsterFromID: function(id) {
            if(id == -1) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Hickory_Board_Piece.png');
            } else if(id == 1) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Melody_Board_Piece.png');
            } else if(id == 2) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Mantra_Board_Piece.png');
            } else if(id == 3) {
                return PIXI.Sprite.from('/static/assets/board_pieces/JBG_Board_Piece.png');
            } else if(id == 4) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Crust_Board_Piece.png');
            } else if(id == 5) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Domino_Board_Piece.png');
            } else if(id == 7) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Ratakhe_Board_Piece.png');
            } else if(id == 9) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Lugneus_Board.png');
            } else if(id == 9) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Ancient_Cur_Board.png');
            }
        }
    }

})();