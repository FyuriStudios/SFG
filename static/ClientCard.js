import AssetGetter from './AssetGetter';

export default function initializeCard(backendCard) {
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

class Monster extends Card {
    constructor(backendCard) {
        super(backendCard.type, backendCard.id, backendCard.tokenType, backendCard.rarity, backendCard.cost, backendCard.power, backendCard.hasDefender);
        this.power = backendCard.power;
        this.currentPower = this.power;
        this.hasDefender = backendCard.hasDefender;
        this.isStatic = backendCard.isStatic;
    }
}

class Spell extends Card {
    constructor(backendCard) {
        super(backendCard.type, backendCard.id, backendCard.tokenType, backendCard.rarity, backendCard.cost, backendCard.power, backendCard.hasDefender);
    }
}
