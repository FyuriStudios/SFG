function textToDeck(text) { //TODO check if the deck is valid
    let deckString = text.split(',\n');
    for (let i = 0; i < deckString.length; ++i) {
        if (deckString[i].match(/^[0-9]+$/) == null)
            return "bad";
    }
    let passDeck = text.split(',\n').map(Number);
    if (passDeck.length != 20)
        return "bad";
    localStorage.setItem("deckStored", passDeck);
    window.location.replace('/static/game/game.html');
}