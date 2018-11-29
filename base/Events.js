/*
Written by Hughes, Max
*/

/**
 * MonsterPlayedEvent should be created when a monster is played from a player's
 * hand. This event contains information about what's been played, what side
 * it's been played to, and at what position.
 * @author Max
 */
class MonsterPlayedEvent {
    /**
     * Constructs a new MonsterPlayedEvent.
     * @param game       A reference to the Game object.
     * @param side       A reference to the side of the board that the monster was played on: should be something like game.currentPlayer.board or something like that.
     * @param monsterPos The position on the board where the monster was played: Simply the position in the array
     */
    constructor(game, side, monsterPos) {
      this.playedAt = monsterPos
      this.player = game.currentPlayer
      this.monsterPlayed = side[monsterPos]
    }
}

/**
 * UntargetedSpellPlayedEvent should be called when a spell that doesn't have a 
 * specific target is played, e.g. a field spell. This event contains information about
 * the spell that was played and who played it.
 * @author Hughes
 */
class UntargetedSpellPlayedEvent {
    /**
     * Constructs a new UntargetedSpellPlayedEvent.
     * @param game      A reference to the Game object.
     * @param spell     A reference to the spell that was just played.
     */
    constructor(game, spell) {
      this.player = game.currentPlayer
      this.spellPlayed = spell
    }
}

/**
 * QuestFulfilledEvent should be called when a quest is fulfilled. It contains information about
 * the quest that was completed and who completed it.
 * @author Hughes
 */
class QuestFulfilledEvent {
    /**
     * Constructs a new QuestFulfilledEvent.
     * @param game      A reference to the Game object. 
     * @param quest     A reference to the quest that was completed.
     */
    constructor(game, quest) {
      this.player = game.currentPlayer
      this.quest = quest
    }
}

/**
 * TargetedSpellPlayedEvent should be called when a targeted spell is played e.g. something like Fireball from hearthstone
 * It contains information about the player who played it, the target of the spell, and the damage that was dealt.
 * @author Hughes
 */
class TargetedSpellPlayedEvent {
    /**
     * Constructs a new TargetedSpellPlayedEvent.
     * @param game      A reference to the Game object.
     * @param side      A reference to the side of the board containing the target (should look something like game.getCurrentPlayer.board)
     * @param target    A reference to the target of the spell.
     * @param damage    The amount of damage that the spell dealt (0 if no damage, negative if healing/boosting)
     */
    constructor(game, side, target, damage) {
      this.player = game.currentPlayer
      this.target = side[target]
      this.damage = damage
    }
}

/**
 * MonsterDiedEvent should be called when a monster dies. It contains information about
 * the monster that died.
 * @author Hughes
 */
class MonsterDiedEvent {
    /**
     * Constructs a new MonsterDiedEvent.
     * @param game       A reference to the Game object.
     * @param side       A reference to the side of the board containing the target (should look something like game.getCurrentPlayer.board)
     * @param monsterPos The array position of the monster that died.
     */
    constructor(game, side, monsterPos) {
      this.monster = side[monsterPos]
    }
}

/**
 * MonsterAttacksEvent should be called when a monster attacks another monster (or a hero?)
 * It contains information about the player that ordered the attack, the monsters that attacked and defended, and the damage dealt in both directions.
 * @author Hughes
 */
class MonsterAttacksEvent {
    /**
     * Constructs a new MonsterAttacksEvent.
     * @param game              A reference to the game object.
     * @param monsterPos         The array position of the attacking monster.
     * @param enemyPos          The array position of the defending monster.
     * @param damageDealt       The amount of damage that the attacking monster dealt to the defending monster.
     * @param damageReceived    The amount of damage that the defending monster dealt to the attacking monster.
     */
    constructor(game, monsterPos, enemyPos, damageDealt, damageReceived){
      this.player = game.currentPlayer
      this.attacker = game.currentPlayer.board[monsterPos]
      this.attacked = game.otherPlayer.board[enemyPos]
      this.damageDealt = damageDealt
      this.damageReceived = damageReceived
    }
}

/**
 * MonsterRevivedEvent should be called when a monster is "revived" (see SFG keywords) from a graveyard to the board.
 * It contains information about the monster that was revived.
 */
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
