class Effect {

    constructor() {
        this.hasSelfAttack = false;
        this.hasEnemyAttack = false;
        this.hasSelfDeath = false;
        this.hasTurnIncrement = false;
        this.hasCardPlayed = false;
        this.hasQuestFulfilled = false;
        this.hasEntersBoard = false;
        this.hasCreation = false;
        this.hasCardDraw = false;
        this.hasMonsterPlayed = false;

        this.selfAttackList = [];
        this.enemyAttackList = [];
        this.selfDeathList = [];
        this.turnIncrementList = [];
        this.cardPlayedList = [];
        this.questFulfilledList = [];
        this.entersBoardList = [];
        this.creationList = [];
        this.cardDrawList = [];
        this.monsterPlayedList = [];
    }
    
    selfAttack(input, game, eventChain) {
        this.selfAttackList.forEach(function(i) {
            i.func(input, game, eventChain);
        });
    }

    addSelfAttack(func) {
        this.selfAttackList.push(func);
    }

    enemyAttack(input, game, eventChain) {
        this.selfAttackList.forEach(function(i) {
            i.func(input, game, eventChain);
        });
    }

    addEnemyAttack(func) {
        this.enemyAttackList.push(func);
    }

    selfDeath(input, game, eventChain) {
        this.selfDeathList.forEach(function(i) {
            i.func(input, game, eventChain);
        });
    }

    addSelfDeath(func) {
        this.selfDeathList.push(func);
    }

    turnIncrement(input, game, eventChain) {
        this.turnIncrementList.forEach(function(i) {
            i.func(input, game, eventChain);
        });
    }

    addTurnIncrement(func) {
        this.turnIncrementList.push(func);
    }

    cardPlayed(input, game, eventChain) {
        this.cardPlayedList.forEach(function(i) {
            i.func(input, game, eventChain);
        });
    }

    addCardPlayed(func) {
        this.cardPlayedList.push(func);
    }

    entersBoard(input, game, eventChain) {
        this.entersBoardList.forEach(function(i) {
            i.func(input, game, eventChain);
        });
    }

    addEntersBoard(func) {
        this.entersBoardList.push(func);
    }

    creation(input, game, eventChain) {
        this.creationList.forEach(function(i) {
            i.func(input, game, eventChain);
        });
    }

    addCreation(func) {
        this.creationList.push(func);
    }

    cardDraw(input, game, eventChain) {
        this.cardDrawList.forEach(function(i) {
            i.func(input, game, eventChain);
        });
    }

    addCardDraw(func) {
        this.cardDrawList.push(func);
    }

    addMonsterPlayed(func) {
        this.monsterPlayedList.push(func);
    }

    monsterPlayed(input, game, eventChain) {
        this.monsterPlayedList.forEach(i => i.func(input, game, eventChain));
    }

}

module.exports = Effect;