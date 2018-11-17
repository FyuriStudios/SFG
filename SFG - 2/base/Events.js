class MonsterPlayedEvent {
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
  
}
  
class TargetedSpellPlayedEvent {
    constructor(game, target, damage) {
  
    }
}
  
class MonsterDiedEvent {
  
}
  
class MonsterAttacksEvent {
  
}
  
class MonsterRevivedEvent {
  
}
  
class CharacterTraitEvent {
  
}
  
class CardEffectEvent {
  
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
    CardEffectEvent,
    TurnBeginsEvent,
    QuestFulfilledEvent,
    TargetedSpellPlayedEvent,
    UntargetedSpellPlayedEvent,
    TurnEndsEvent}
