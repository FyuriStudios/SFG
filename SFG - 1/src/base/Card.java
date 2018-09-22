package base;

public class Card {
	
	/**
	 * Defines the types of tokens that can be used to play cards.
	 */
	public static enum TokenType {
		SPELL, MONSTER, SFLEX, MFLEX;
	}
	
	/**
	 * Defines all card rarities.
	 */
	public static enum Rarity {
		COMMON, UNCOMMON, LEGENDARY, SECRET_WEAPON;
	}
	
	/**
	 * The cost of the card, as defined by the card text (might not necessarily be the actual cost of the card.)
	 */
	public final int cardCost;
	
	/**
	 * The cost of playing the card. Might be different from the actual cost of the card so it's worth holding onto some duplicate information.
	 */
	private int playCost;
	
	/**
	 * The type of tokens required to play the card, as a {@link Card.TokenType}.
	 */
	public final TokenType tokenType;
	
	/**
	 * The rarity of the card.
	 */
	public final Rarity rarity;
	
	/**
	 * The base constructor for the {@code Card} class.
	 * @param cost  the (initial) cost of the card
	 * @param tokenType  the type of tokens required to play the card
	 */
	public Card(int cost, TokenType tokenType, Rarity rarity) {
		cardCost = cost;
		playCost = cardCost;
		this.tokenType = tokenType;
		this.rarity = rarity;
	}
	
	/**
	 * Sets the cost of playing the card.
	 * @param playCost  the cost of the card
	 */
	public void setPlayCost(int playCost) {
		if(playCost < 0)
			throw new ArithmeticException("Cost must be > 0");
		this.playCost = playCost;
	}
	
	/**
	 * Gets the current cost of playing the card.
	 * @return  the cost of playing the card
	 */
	public int getPlayCost() {
		return this.playCost;
	}
	
	
}
