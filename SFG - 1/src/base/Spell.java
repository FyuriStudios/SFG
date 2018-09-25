package base;

/**
 * The basic implementation of a Spell. All spells should extend this.
 */
public abstract class Spell extends Card{
	
	public static enum Type {
		OFFENSIVE, DEFENSIVE, TRICKERY, FIELD_SPELL, SUMMONING;
	}
	
	/**
	 * The type of the Spell (OFFENSIVE, DEFENSIVE, etc.)
	 */
	public final Type type;

	public Spell(int cost, String title, TokenType tokenType, Rarity rarity, Type type) {
		super(cost, title, tokenType, rarity);
		this.type = type;
	}
	
	/**
	 * Does the card's effect.
	 * @param g  takes a reference to the game
	 */
	public abstract void play(Game g);

	
}
