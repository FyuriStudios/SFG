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
            } else if(id == 11) {
                return PIXI.Sprite.from('/static/assets/in_hand/Sync_Horde_Hand.png');
            } else if(id == 12) {
                return PIXI.Sprite.from('/static/assets/in_hand/Wound_Regen_Hand.png');
            } else if(id == 13) {
                return PIXI.Sprite.from('/static/assets/in_hand/Bottom_Hand.png');
            } else if(id == 14) {
                return PIXI.Sprite.from('/static/assets/in_hand/Shade_Of_Pain_Hand.png');
            } else if(id == 15) {
                return PIXI.Sprite.from('/static/assets/in_hand/Burrowgator_Hand.png');
            } else if(id == 16) {
                return PIXI.Sprite.from('/static/assets/in_hand/Savior_Hand.png');
            } else if(id == 17) {
                return PIXI.Sprite.from('/static/assets/in_hand/Habuero_Hand.png');
            } else if(id == 18) {
                return PIXI.Sprite.from('/static/assets/in_hand/RahMut_Hand.png');
            } else if(id == 19) {
                return PIXI.Sprite.from('/static/assets/in_hand/Cow_Hand.png');
            } else if(id == 20) {
                return PIXI.Sprite.from('/static/assets/in_hand/Twilight_Fog_Hand.png');
            } else if(id == 21) {
                return PIXI.Sprite.from('/static/assets/in_hand/Bestial_Support_Hand.png');
            } else if(id == 22) {
                return PIXI.Sprite.from('/static/assets/in_hand/Sow_Chaos_Hand.png');
            } else if(id == 23) {
                return PIXI.Sprite.from('/static/assets/in_hand/Strenuous_Path_Hand.png');
            } else if(id == 24) {
                return PIXI.Sprite.from('/static/assets/in_hand/Twisted_Simian_Hand.png');
            } else if(id == 25) {
                return PIXI.Sprite.from('/static/assets/in_hand/Corrupted_Eagle_Hand.png');
            } else if(id == 26) {
                return PIXI.Sprite.from('/static/assets/in_hand/Spirit_Bear_Hand.png');
            } else if(id == 27) {
                return PIXI.Sprite.from('/static/assets/in_hand/Zhaori_Hand.png');
            } else if(id == 28) {
                return PIXI.Sprite.from('/static/assets/in_hand/Poke_Hand.png');
            } else if(id == 29) {
                return PIXI.Sprite.from('/static/assets/in_hand/Flurry_Hand.png');
            } else if(id == 30) {
                return PIXI.Sprite.from('/static/assets/in_hand/State_Chimp_Hand.png');
            } else if(id == 31) {
                return PIXI.Sprite.from('/static/assets/in_hand/Kingo_Hand.png');
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
            } else if(id == 11) {
                return PIXI.Sprite.from('/static/assets/popup/Sync_Horde_Hover.png');
            } else if(id == 12) {
                return PIXI.Sprite.from('/static/assets/popup/Wound_Regen_Hover.png');
            } else if(id == 13) {
                return PIXI.Sprite.from('/static/assets/popup/Bottom_Hover.png');
            } else if(id == 14) {
                return PIXI.Sprite.from('/static/assets/popup/Shade_Of_Pain_Hover.png');
            } else if(id == 15) {
                return PIXI.Sprite.from('/static/assets/popup/Burrowgator_Hover.png');
            } else if(id == 16) {
                return PIXI.Sprite.from('/static/assets/popup/Savior_Hover.png');
            } else if(id == 17) {
                return PIXI.Sprite.from('/static/assets/popup/Habuero_Hover.png');
            } else if(id == 18) {
                return PIXI.Sprite.from('/static/assets/popup/RahMut_Hover.png');
            } else if(id == 19) {
                return PIXI.Sprite.from('/static/assets/popup/Cow_Hover.png');
            } else if(id == 20) {
                return PIXI.Sprite.from('/static/assets/popup/Twilight_Fog_Hover.png');
            } else if(id == 21) {
                return PIXI.Sprite.from('/static/assets/popup/Bestial_Support_Hover.png');
            } else if(id == 22) {
                return PIXI.Sprite.from('/static/assets/popup/Sow_Chaos_Hover.png');
            } else if(id == 23) {
                return PIXI.Sprite.from('/static/assets/popup/Strenuous_Path_Hover.png');
            } else if(id == 24) {
                return PIXI.Sprite.from('/static/assets/popup/Twisted_Simian_Hover.png');
            } else if(id == 25) {
                return PIXI.Sprite.from('/static/assets/popup/Corrupted_Eagle_Hover.png');
            } else if(id == 26) {
                return PIXI.Sprite.from('/static/assets/popup/Spirit_Bear_Hover.png');
            } else if(id == 27) {
                return PIXI.Sprite.from('/static/assets/popup/Zhaori_Hover.png');
            } else if(id == 28) {
                return PIXI.Sprite.from('/static/assets/popup/Poke_Hover.png');
            } else if(id == 29) {
                return PIXI.Sprite.from('/static/assets/popup/Flurry_Hover.png');
            } else if(id == 30) {
                return PIXI.Sprite.from('/static/assets/popup/State_Chimp_Hover.png');
            } else if(id == 31) {
                return PIXI.Sprite.from('/static/assets/popup/Kingo_Hover.png');
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
            } else if(id == 10) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Ancient_Cur_Board.png');
            } else if(id == 13) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Bottom_Board.png');
            } else if(id == 14) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Shade_Of_Pain_Board.png');
            } else if(id == 15) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Burrowgator_Board.png');
            } else if(id == 16) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Savior_Board_Piece.png');
            } else if(id == 17) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Habuero_Board_Piece.png');
            } else if(id == 18) {
                return PIXI.Sprite.from('/static/assets/board_pieces/RahMut_Board_Piece.png');
            } else if(id == 19) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Cow_Board_Piece.png');
            } else if(id == 24) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Twisted_Simian_Board.png');
            } else if(id == 25) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Corrupted_Eagle_Board.png')
            } else if(id == 26) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Spirit_Bear_Board.png');
            } else if(id == 27) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Zhaori_Board_Piece.png');
            } else if(id == 28) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Poke_Board_Piece.png');
            } else if(id == 30) {
                return PIXI.Sprite.from('/static/assets/board_pieces/State_Chimp_Board.png');
            } else if(id == 31) {
                return PIXI.Sprite.from('/static/assets/board_pieces/Kingo_Board.png');
            }
        }
    }

})();