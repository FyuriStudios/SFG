IDToImage = (function () {
    
    return {

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
        },

        monsterFromID: function(id) {
            console.log('this function kinda works');
            return PIXI.Sprite.from('/static/assets/monster_pieces/Board-Pierce-Microchip.png');
        }
    }


})();