/*
 * Edit list:
 * 0.1.0
 * 9-26-18, Hughes: finished the first version of this file and added comments
 */
package base;

/**
 * Defines a generic Card and all of the things that are common between Cards.<br>
 * Doesn't have flavor text because the server couldn't care less what the flavor text is.
 * @author Hughes
 */
public abstract class Card {
	
	/**
	 * Gives each card a card ID number.
	 * @return  the ID number of this card.
	 */
	public abstract int getID();
	
	/**
	 * Defines the types of tokens that can be used to play cards.<br>
	 * SFLEX is spell flex and MFLEX is monster flex.
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
	 * The title of the card. Doesn't change.
	 */
	public final String name;
	
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
	 * @param name  the String title of the card (e.g. {@code "Potato"})
	 * @param tokenType  the type of tokens required to play the card
	 * @param rarity  the rarity of the card
	 */
	public Card(int cost, String name, TokenType tokenType, Rarity rarity) {
		cardCost = cost;
		playCost = cardCost;
		this.name = name;
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
