/**
 * I've also converted AssetGetter to a module. Because modules are good.
 */
let AssetGetter = (function() {

    return {

        /**
         * Input an ID, get the full card format image.
         * @param id the id number of the card, probably passed in from the server
         * @returns the path to the requested image
         */
        getCardAsset: function(id) {
            let path = '/static/assets/cards/';

            //the test card case
            if(id == -1)
            return path + 'Potato.png'; //TODO: this asset doesn't actually exist yet, lol
            if(id == 1)
            return 'we probably should add more assets';
        },

        /**
         * Input an ID, get the monster on board format image.
         * @param id the id number of the card, probably passed in from the server
         * @returns the path to the requested image
         */
        getMonsterAsset: function(id) {

            let path = '../static/monster_pieces/';//maybe this path is broken? I don't know, haven't tried. Something about ../ instead of ./ or something.

            if(id == -1)
            return path + 'Potato.png';
        },

        getQuestAsset: function(id) {
            let path = '../static/quests' //TODO: this folder doesn't exist yet
        }
    }
    
})();

