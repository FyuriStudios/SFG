function textToDeck(text) { //TODO check if the deck is valid
    if (text != "random") {
        
        let deckString = text.split(', ');
        
        if (deckString.length != 30)
            return "bad";

        deckString.forEach(value => { if(isNaN(value)) return 'bad'; });
        
        if (!checkDeck(deckString.map(Number)))
            return "bad";
    }
    localStorage.setItem("deckStored", text);
    music.stop();
    remove();
    window.location.replace('/static/game/game.html');
}

function checkDeck(deckToCheck) {
    return true;
}