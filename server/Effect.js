class Effect {
    
    selfAttack(input, game, eventChain) {
        return
    }

    get hasSelfAttack() {
        return false
    }

    enemyAttack(game, eventChain) {
        return
    }
    
    get hasEnemyAttack() {
        return false
    }

    selfDeath(input, game, eventChain) {
        return
    }

    get hasSelfDeath() {
        return false
    }

    turnIncrement(input, game, eventChain) {
        return
    }

    get hasTurnIncrement() {
        return false
    }

    cardPlayed(input, game, eventChain) {
        return
    }

    get hasCardPlayed() {
        return false
    }

    questFulfilled(input, game, eventChain) {
        return
    }

    get hasQuestFulfilled() {
        return false
    }

}

module.exports = Effect