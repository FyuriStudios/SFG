let Monster = require('../Monster');

class AncientCur extends Monster { //THIS MONSTER IS BROKEN

    constructor() {
        super('monster', 10, 'monster', 'uncommon', 'Ancient Cur', 2, 2, 'cur');

        let card = this;

        this.hasEntersBoard = true;
        this.addEntersBoard({
            name: 'untitled',
            func: function(input, game, eventChain) {
                console.log('yep');
                card.player = game.currentPlayer;
            }
        });

        this.hasSelfDeath = true;
        this.addSelfDeath({
            name: 'Ancient Cur Death',
            func: function(input, game, eventChain) {
                
                let deck = card.player.deck;

                let deckPos = deck.length - 1;
                while(true) {
                    if(deck[deckPos].rarity == 'common' && deck[deckPos].monsterClass == 'cur') {
                        deck.push(deck.splice(deckPos, 1)[0]); //put the card on top so it can get drawn.
                        game.drawCard(card.player, eventChain);
                        break;
                    }
                    deckPos -= 1;
                }
            }
        });
    }
}

module.exports = AncientCur;