/*
Stuff that this file might be missing:
- text for cards, like their effect text and such
- the abilities of cards
*/

/**
 * Turned ClientCard into a module as well.
 */
ClientCard = (function() {

    /**
     * Defines a generic card. This class shouldn't be constructed directly.
     */
    class Card {
        constructor(type, id, tokenType, rarity, name, cost) {
            this.type = type;
            this.id = id;
            this.tokenType = tokenType;
            this.rarity = rarity;
            this.name = name;
            this.cost = cost;
            this.currentCost = cost;//current cost and absolute cost are different
            this.sprite = PIXI.Sprite.from(AssetGetter.getCardAsset(id));
        }

    }
    /**
     * Defines a generic monster.
     */
    class Monster extends Card {
        constructor(backendCard) {
            super(backendCard.type, backendCard.id, backendCard.tokenType, backendCard.rarity, backendCard.cost, backendCard.power, backendCard.hasDefender);
            this.power = backendCard.power;
            this.currentPower = this.power;
            this.hasDefender = backendCard.hasDefender;
            this.isStatic = backendCard.isStatic;
        }
    }

    /**
     * Defines a generic spell.
     */
    class Spell extends Card {
        constructor(backendCard) {
            super(backendCard.type, backendCard.id, backendCard.tokenType, backendCard.rarity, backendCard.cost, backendCard.power, backendCard.hasDefender);
        }
    }

    return {
            /**
         * This is the outward facing function of the file. It takes in a card object from the backend and adds all of its information plus
         * more information that might be useful to have on the frontend into one big Card object, like a Sprite for the card, then returns it.
         * @param {Card} backendCard
         */
        from: function(backendCard) {
            if(backendCard.type == 'monster') {
                return new Monster(backendCard);
            }

            else if(backendCard.type == 'spell') {
                return new Spell(backendCard);
            }

            else {
                throw('invalid monster type');
            }
        }
    };
})();


