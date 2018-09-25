package testCards;

import base.Card;
import base.Game;
import base.Spell;
import base.Targetable;

public class CarrotRain extends Spell{
	
	private static final int ID = 2;
	
	public static final int CARROT_DAMAGE = 4;

	private static final int COST = 3;
	
	private static final String TITLE = "Carrot Rain";
	
	private static final Card.TokenType TOKEN_TYPE = Card.TokenType.SPELL;
	
	private static final Card.Rarity RARITY = Card.Rarity.COMMON;
	
	private static final Spell.Type TYPE = Spell.Type.OFFENSIVE;
	
	public int getID() {
		return ID;
	}
	
	public CarrotRain() {
		super(COST, TITLE, TOKEN_TYPE, RARITY, TYPE);
	}
	
	@Override
	public void play(Game g, Targetable target) {
		target.takeDamage(CARROT_DAMAGE);
	}

}
