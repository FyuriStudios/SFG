package deckGeneration;

import base.Card;
import testCards.CarrotRain;
import testCards.Potato;

public class IdToCard {
	public static Card getCard(int id) {
		switch(id) {
		case 1:
			return new Potato();
		case 2:
			return new CarrotRain();
		case 3:
			break;
		case 4:
			break;
		case 5:
			break;
		case 6:
			break;
			
		}
		return null;
	}
}
