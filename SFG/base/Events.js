/**
 * MonsterPlayedEvent should be created when a monster is played from a player's
 * hand. This event contains information about what's been played, what side
 * it's been played to, and at what position.
 * Author: Max
 */
class MonsterPlayedEvent {
    /**
     * Constructs a new MonsterPlayedEvent.
     * @param {Game} game       A reference to the Game object.
     * @param {Array} side       A reference to the side of the board that the monster was played on.
     * @param {Number} monsterPos The position on the board where the monster was played
     */
    constructor(game, side, monsterPos) {
      this.playedAt = monsterPos
      this.player = game.currentPlayer
      this.monsterPlayed = side[monsterPos]
    }
}

class UntargetedSpellPlayedEvent {
    constructor(game) {
      this.player = game.currentPlayer
    }
}

class QuestFulfilledEvent {
    constructor(game, quest) {
      this.player = game.currentPlayer
      this.quest = quest
    }
}

class TargetedSpellPlayedEvent {
    constructor(game, side, target, damage) {
      this.player = game.currentPlayer
      this.target = side[target]
      this.damage = damage
    }
}

class MonsterDiedEvent {
    constructor(game, side, monsterPos) {
      this.monster = side[monsterPos]
    }
}

class MonsterAttacksEvent {
    constructor(game, mosterPos, enemyPos, damageDealt, damageReceived){
      this.player = game.currentPlayer
      this.attacker = game.currentPlayer.board[monsterPos]
      this.attacked = game.otherPlayer.board[enemyPos]
      this.damageDealt = damageDealt
      this.damageReceived = damageReceived
    }
}

class MonsterRevivedEvent {
    constructor(game, side, monsterPos){
      this.revived = side[monsterPos]
    }
}

class MonsterInvokedEvent {
    constructor(game, side, monsterPos){
      this.invoked = side[monsterPos]
    }
}

class CharacterTraitEvent {
    constructor(game){
      this.player = game.currentPlayer
    }
}

class EffectEvent {
    constructor(game, side, origin, effect){
      this.origin = origin
      this.effect = effect
    }
}

class TurnBeginsEvent {
    constructor(game) {
      this.player = game.currentPlayer
    }
}

class TurnEndsEvent {
    constructor(game) {
      this.player = game.currentPlayer
    }
}

export default {
    MonsterPlayedEvent,
    MonsterAttacksEvent,
    MonsterDiedEvent,
    MonsterRevivedEvent,
    CharacterTraitEvent,
    EffectEvent,
    TurnBeginsEvent,
    QuestFulfilledEvent,
    TargetedSpellPlayedEvent,
    UntargetedSpellPlayedEvent,
    MonsterInvokedEvent,
    TurnEndsEvent}
