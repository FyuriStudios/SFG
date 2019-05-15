class Effect {

    constructor() {
        this.hasSelfAttack = false;
        this.hasEnemyAttack = false;
        this.hasSelfDeath = false;
        this.hasTurnIncrement = false;
        this.hasCardPlayed = false;
        this.hasQuestFulfilled = false;

        this.selfAttackList = [];
        this.enemyAttackList = [];
        this.selfDeathList = [];
        this.turnIncrementList = [];
        this.cardPlayedList = [];
        this.questFulfilledList = [];
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

    questFulfilled(input, game, eventChain) {
        this.questFulfilledList.forEach(function(i) {
            i.func(input, game, eventChain);
        });
    }

    addQuestFullfilled(func) {
        this.questFulfilled.push(func);
    }

}

module.exports = Effect;