function textToDeck(text) { //TODO check if the deck is valid
    if (text != "random") {
        let deckString = text.split(',\n');
        for (let i = 0; i < deckString.length; ++i) {
            if (isNaN(deckString[i]))
                return "bad";
        }
        if (deckString.length != 20)
            return "bad";
    }
    localStorage.setItem("deckStored", text);
    music.stop();
    window.location.replace('/static/game/game.html');
}