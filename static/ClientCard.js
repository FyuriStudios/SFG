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
            this.sprite = IDToImage.fromID(id);
            this.sprite.anchor.x = .5;
            this.sprite.anchor.y = .5;
        }

        updateCostText() {
            this.costText = new PIXI.Text(this.cost, {fontFamily: 'Helvetica', fontSize: 100, fill: 0x000000, align: 'center'});
            this.costText.interactive = true;

            this.costText.anchor.x = .5;
            this.costText.anchor.y = .5;
            this.costText.width = this.sprite.width * .1;
            this.costText.height = this.sprite.height * .13;
            this.costText.x += this.sprite.width * .32;
            this.costText.y -= this.sprite.height * .435;

            this.sprite.addChild(this.costText);
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
        },

        test: function() {
            return new Monster(
                {
                    type: 'monster',
                    id: -1,
                    tokenType: 'monster',
                    rarity: 'common',
                    name: 'Test Card',
                    cost: 3,
                    power: 3,
                    hasDefender: false,
                    isStatic: false
                });
        }
    };
})();


