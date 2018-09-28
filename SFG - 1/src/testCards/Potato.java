package testCards;

import base.Card;
import base.Monster;

public class Potato extends Monster {
	
	private static final int ID = 1;
	
	private static final int POWER = 4;
			
	private static final int COST = 3;
	
	private static final Monster.Type TYPE = Monster.Type.CUR;
	
	private static final Card.Rarity RARITY = Card.Rarity.COMMON;
	
	private static final Card.TokenType TOKEN_TYPE = Card.TokenType.MONSTER;
	
	private static final String NAME = "Potato";
	
	public Potato() {
		super(POWER, COST, NAME, TOKEN_TYPE, RARITY, TYPE);
	}
	
	public int getID() {
		return ID;
	}
	
}
