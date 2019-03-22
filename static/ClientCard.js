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
            this.sprite.removeChild(this.costText);
            this.costText = new PIXI.Text(this.cost, {fontFamily: 'Helvetica', dropShadow: true, dropShadowColor: 0xffffff, fontSize: 100, fill: 0x000000, align: 'center'});
            this.costText.interactive = true;

            this.costText.anchor.x = .5;
            this.costText.anchor.y = .5;
            this.costText.width = this.sprite.width * .09;
            this.costText.height = this.sprite.height * .12;
            this.costText.x -= this.sprite.width * .415;
            this.costText.y -= this.sprite.height * .425;

            this.sprite.addChild(this.costText);
        }

        displayPopup(x, y) {
            let popup = new PIXI.Container();
            
            let cardName = new PIXI.Text(this.name, {fontFamily: 'Helvetica', dropShadow: true, dropShadowColor: 0xffffff, fontSize: 100, fill: 0x000000, align: 'center'});

            let text = IDToText(this.id);
            let cardText = new PIXI.Text(text, {fontFamily: 'Helvetica', fontSize: 1500/text.length, fill: 0x000000, wordWrap: true});

            let rect = new PIXI.Graphics();
            rect.beginFill(0xadd8e6, 0.5);
            rect.drawRoundedRect(0, 0, innerWidth * 0.08, innerHeight * 0.2, 6); //TODO: make sure these numbers are a-ok
            rect.endFill();

            cardName.anchor.x = cardText.anchor.x = 0.5;
            cardName.anchor.y = cardText.anchor.y = 0.5;

            cardName.width = rect.width;
            cardName.height = rect.height * 0.1;

            cardText.width = rect.width;

            popup.addChild(rect);
            popup.addChild(cardName);
            popup.addChild(cardText);

            cardName.x = rect.x + cardName.width/2;
            cardName.y = rect.y + cardName.height/2;

            cardText.x = rect.x + cardText.width/2;
            cardText.y = cardName.y + cardName.height/2 + cardText.height/2;

            popup.x = x;
            popup.y = y;

            return popup;
        }

    }
    /**
     * Defines a generic monster.
     */
    class Monster extends Card {
        constructor(backendCard) {
            super(backendCard.type, backendCard.id, backendCard.tokenType, backendCard.rarity, backendCard.name, backendCard.cost);
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


