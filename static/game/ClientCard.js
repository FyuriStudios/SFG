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
        constructor(type, id, tokenType, rarity, name, cost, playCost, forseeing) {
            this.type = type;
            this.id = id;
            this.tokenType = tokenType;
            this.rarity = rarity;
            this.name = name;
            this.cost = cost;
            this.currentCost = playCost;//current cost and absolute cost are different
            this.forseeing = forseeing;
        }

        updateText() {
            
            this.sprite.removeChild(this.costText);
            this.costText = new PIXI.Text(this.currentCost, {fontFamily: 'Helvetica', dropShadow: true, dropShadowColor: 0xffffff, fontSize: 100, fill: 0x000000, align: 'center'});
            this.costText.interactive = true;

            this.costText.anchor.x = .5;
            this.costText.anchor.y = .5;
            this.costText.width = this.sprite.width * ((this.currentCost+'').length == 1? .12:.18);
            this.costText.height = this.sprite.height * .15;
            this.costText.x -= this.sprite.width * .37;
            this.costText.y -= this.sprite.height * .4;

            this.sprite.addChild(this.costText);
        }

        displayPopup() { 
            let popup = new PIXI.Container();

            let image = IDToImage.popupFromId(this.id);
            image.width = this.sprite.width * 2;
            image.height = this.sprite.height * 2;

            let cost = new PIXI.Text(this.currentCost, 
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
            cost.width = popup.width * ((this.currentCost+ '').length == 1?.09:.135);
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
            super(backendCard.type, backendCard.id, backendCard.tokenType, backendCard.rarity, backendCard.name, backendCard.cost, backendCard.playCost, backendCard.forseeing);
            this.power = backendCard.power;
            this.currentPower = backendCard.currentPower;
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
            this.powerText.width = this.sprite.width * ((this.currentPower+'').length == 1? .12:.18);
            this.powerText.height = this.sprite.height * .15;
            this.powerText.x += this.sprite.width * .39;
            this.powerText.y -= this.sprite.height * .41;

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
            power.width = this.popup.width * ((this.currentPower+'').length == 1? .11:.165);
            power.height = this.popup.height * .145;

            power.x = this.popup.width * .87;
            power.y = this.popup.height * .089;

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
            monster.width = width * .9;
            monster.height = height * .68;
            this.sprite.addChild(monster);
            
            this.sprite.width = width * .9;
            this.sprite.height = height * .7;
            this.sprite.x = x;
            this.sprite.y = y;

            this.updatePower();
        }

        updatePower() {

            this.sprite.removeChild(this.currentPowerSprite);

            let power = new PIXI.Text(this.currentPower, 
                {
                    fontFamily: 'Helvetica', 
                    dropShadow: true, 
                    dropShadowColor: 0x000000, 
                    fontSize: 100, 
                    fill: 0xffffff, 
                    align: 'center',
                    dropShadowDistance: 10,
            });

            this.currentPowerSprite = power;

            power.anchor.x = power.anchor.y = .5;
            this.sprite.addChild(power);
            power.y = this.sprite.height * .42;
            power.width = this.sprite.width * .3;
            power.height = this.sprite.height * .3;

        }

    }

    /**
     * Defines a generic spell.
     */
    class Spell extends Card {
        constructor(backendCard) {
            super(backendCard.type, backendCard.id, backendCard.tokenType, backendCard.rarity, backendCard.name, backendCard.cost, backendCard.playCost, backendCard.forseeing);
            this.targeting = backendCard.targeting;
            this.field = backendCard.field;
            this.handTargeting = backendCard.handTargeting;
            this.generateImages();
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


