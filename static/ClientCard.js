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
        }

        updateText() {
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

        displayPopup() { 
            let popup = new PIXI.Container();

            let image = PIXI.Sprite.fromImage('/static/assets/cards/test_hover.png');
            image.width = this.sprite.width * 2;
            image.height = this.sprite.height * 2;

            let cost = new PIXI.Text(this.cost, 
                {
                    fontFamily: 'Helvetica', 
                    dropShadow: true, 
                    dropShadowColor: 0xffffff, 
                    fontSize: 100, 
                    fill: 0x000000, 
                    align: 'center'
                });
            
            popup.addChild(image);
            popup.addChild(cost);

            cost.anchor.x = cost.anchor.y = .5;
            cost.width = popup.width * .09;
            cost.height = popup.height * .12;

            cost.x = popup.width * .12;
            cost.y = popup.height * .087;

            popup.width = this.sprite.width * 2;
            popup.height = this.sprite.height * 2;

            popup.x = this.sprite.x - popup.width/2;
            popup.y = this.sprite.y - popup.height/1.5;

            this.popup = popup;

        }

        generateImages() {

            let backgroundImage = IDToImage.fromID(this.id);
            backgroundImage.anchor.x = backgroundImage.anchor.y = .5;

            backgroundImage.width = 10;
            backgroundImage.height = 10;

            let spriteContainer = new PIXI.Container();

            spriteContainer.width = backgroundImage.width;
            spriteContainer.height = backgroundImage.height;
        
            spriteContainer.interactive = true;
            spriteContainer.interactiveChildren = true;
            spriteContainer.sortableChildren = true;

            backgroundImage.interactive = true;

            /*
            Add the card's sprite to this new container.
            */
            spriteContainer.addChild(backgroundImage);

            this.sprite = spriteContainer;
            this.updateText();

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

            this.generateImages();
            this.displayMonster();
        }

        updateText() {
            super.updateText();
            this.sprite.removeChild(this.powerText);

            let powerText = new PIXI.Text(this.currentPower, {fontFamily: 'Helvetica', dropShadow: true, dropShadowColor: 0xffffff, fontSize: 100, fill: 0x000000, align: 'center'});
            this.powerText = powerText;
            this.powerText.interactive = true;

            this.powerText.anchor.x = .5;
            this.powerText.anchor.y = .5;
            this.powerText.width = this.sprite.width * .09;
            this.powerText.height = this.sprite.height * .12;
            this.powerText.x += this.sprite.width * .415;
            this.powerText.y -= this.sprite.height * .425;

            this.sprite.addChild(this.powerText);
        }

        displayPopup() {
            super.displayPopup();

            let power = new PIXI.Text(this.currentPower, 
                {
                    fontFamily: 'Helvetica', 
                    dropShadow: true, 
                    dropShadowColor: 0xffffff, 
                    fontSize: 100, 
                    fill: 0x000000, 
                    align: 'center'
                });

            power.anchor.x = power.anchor.y = .5;
            power.width = this.popup.width * .09;
            power.height = this.popup.height * .12;

            power.x = this.popup.width * .88;
            power.y = this.popup.height * .083;

            this.popup.addChild(power);
        }

        displayMonster() {
            let monsterContainer = new PIXI.Container();
            let sprite = IDToImage.monsterFromID(this.id);

            monsterContainer.addChild(sprite);
            this.monsterContainer = monsterContainer;

        }

        boardForm() {
            let width = this.sprite.width;
            let height = this.sprite.height;
            let x = this.sprite.x;
            let y = this.sprite.y;

            this.sprite.removeChildren();
            let monster = IDToImage.monsterFromID(this.id);
            monster.anchor.x = monster.anchor.y = .5;
            this.sprite.addChild(monster);
            this.sprite.width = width * .9;
            this.sprite.height = height * .68;
            this.sprite.x = x;
            this.sprite.y = y;
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


