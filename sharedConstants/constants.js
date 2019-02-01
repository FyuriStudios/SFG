/**
 * This file is here because it allows for easy access to game constants, like token caps, deck size, starting health, etc.
 * It's useful because having it right here allows us to change the constants for balance really easily and have the game reflect
 * those changes as a result of only a small number change.
 */
module.exports = { //ignore that we could update this to an ES6 module because if we did then it wouldn't work with the backend
    MAX_TOKS : 15,
    TOKS_PER_TURN : 3,
    MAX_HAND_SIZE : 10,
    MAX_BOARD_SIZE : 10,
    STARTING_CARDS_DRAWN : 5,
    FATIGUE_DAMAGE : 20,
    STARTING_HEALTH : 50,
    MIN_DECK_SIZE: 30,
    MAX_DECK_SIZE: 50
};