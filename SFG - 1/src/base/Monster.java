package base;

import java.util.ArrayList;

/**
 * The base for all monsters. When making a monster card you should extend this class and then reference all of the methods in this class to see which methods to override.<p>
 * Generally, the methods you will care about are the ability methods, like {@code signature()} and {@code entersBoard()}. When you override these methods you should also override the corresponding boolean method, like {@code hasSignature()} and {@code hasEntersBoard()}.
 * @author Hughes 
 */
public abstract class Monster extends Card implements Targetable{

	/**
	 * A list of all of the different types of monsters.
	 */
	public static enum Type {
		GOON, CROW, ADVISOR, MERCENARY, CUR, DUNKLE
	}

	public final Type type;

	/**
	 * The power of the monster as defined by the card text. Doesn't change.
	 */
	public final int power;

	/**
	 * The actual power of the monster. Doesn't get a value until the monster is played.
	 */
	private int currentPower;

	/**
	 * The turn the monster entered the board on (as the Game class's turnCounter variable). It doesn't change.
	 */
	public final int enteredBoardOn;

	/**
	 * The list of activateable abilities that the card has. Private, but it's referenced by a few of other methods in this class.
	 */
	private ArrayList<ActivateableAbility> activAbilities;
	
	private boolean stat;

	/**
	 * The constructor of the Monster class.
	 * @param power  the power of the card
	 * @param cost  the play cost of the card
	 * @param enteredOn  the turn that the card entered the board on
	 * @param title  the name of the card
	 * @param tokenType  the type of tokens required to play the card (generally MONSTER)
	 * @param rarity  the rarity of the card
	 * @param type  the type of the monster (GOON, CROW, etc.)
	 */
	public Monster(int power, int cost, int enteredOn, String title, Card.TokenType tokenType, Card.Rarity rarity, Type type) {
		super(cost, title, tokenType, rarity);
		this.power = power;
		this.enteredBoardOn = enteredOn;
		this.type = type;
		this.stat = false;
	}

	@Override
	public void takeDamage(int damage) {
		this.currentPower -= damage;
	}

	/**
	 * Uses an activateable ability of the card.
	 * @param index  the index of the ability to be used
	 * @param g  a reference to the Game
	 * @param c  the Character target (pass {@code null} if there's no target)
	 */
	public void useActivateableAbility(int index, Game g) {
		activAbilities.get(index).run(g);
	}

	/**
	 * Adds an activateable ability to the card.
	 * @param a  the ability, usually as a lambda
	 */
	public void addActivateableAbility(ActivateableAbility a) {
		activAbilities.add(a);
	}

	public void playCard() {
		//TODO add stuff here
	}

	/**
	 * Informs the reader of whether or not the card possesses defender.
	 * @return  whether or not the card has defender
	 */
	public boolean hasDefender() {
		return false;
	}

	/**
	 * Determines whether or not an attack is valid.
	 * @param g  a reference to the Game
	 * @param enemyIndex  the index to be targeted on the enemy board (-1 is enemy hero, 0-> end of board is their board)
	 * @return  whether or not the attack is valid.
	 */
	public boolean validAttack(Game g, int enemyIndex) {
		if(stat)
			return false;
		else if(enemyIndex != -1 && g.getCurrentPlayer().getBoard().get(enemyIndex).hasDefender())//make sure it's not the hero so an error doesn't get thrown
			return true;
		boolean validAttack = true;
		for(Monster m: g.getCurrentPlayer().getBoard())
			if(m.hasDefender())
				validAttack = false;
		return validAttack;
	}

	public void attack(Game g, int enemyIndex) {
		if(enemyIndex == -1)
			g.getOtherPlayer().getCharacter().takeDamage(currentPower);
		g.getOtherPlayer().getBoard().get(enemyIndex).takeDamage(currentPower);
		this.takeDamage(g.getOtherPlayer().getBoard().get(enemyIndex).getCurrentPower());
	}
	
	/**
	 * Executes the signature method of a monster, if it has one.
	 * @param g  A reference to the game
	 */
	public void signature(Game g) {
		return;
	}

	/**
	 * @return  Whether or not the monster has a signature method
	 */
	public boolean hasSignature() {return false;}

	/**
	 * Executes the board entering ability of a monster, if it has one. NOT Signature, intended to execute whenever a monster enters the board instead of only when it's played from the player's hand.
	 * @param g  A reference to the game
	 */
	public void entersBoard(Game g) {
		return;
	}

	/**
	 * @return Whether or not the monster has an enters board method (NOT SIGNATURE)
	 */
	public boolean hasEntersBoard() {return false;}

	/**
	 * Executes when this monster attacks, if it has this ability.
	 * @param g  a reference to the game
	 * @param c  the target of the attack
	 */
	public void onSelfAttack(Game g, Targetable c) {
		return;
	}

	/**
	 * @return Whether or not the monster has an on own attack ability.
	 */
	public boolean hasOnSelfAttack() {return false;}

	/**
	 * Executes when an enemy attacks, if it has this ability
	 * @param g  a reference to the game
	 * @param c  the monster that is attacking
	 */
	public void onEnemyAttack(Game g, Targetable c) {
		return;
	}

	/**
	 * @return Whether or not the monster has an on enemy attack
	 */
	public boolean hasOnEnemyAttack() {return false;}

	/**
	 * Executes the on death method of the monster, if it exists.
	 * @param g  a reference to the game
	 */
	public void deathrattle(Game g) {
		return;
	}

	/**
	 * @return whether or not the monster has an on death ability.
	 */
	public boolean hasDeathrattle() {return false;}

	/**
	 * Executes the spell casted ability of a monster, if it exists.
	 * @param g  a reference to the game
	 */
	public void spellCast(Game g) {
		return;
	}

	/**
	 * @return whether or not the monster has a spell cast ability
	 */
	public boolean hasSpellCast() {return false;}

	/**
	 * Executes when the turn increments (start and end of turns), if it exists.
	 * @param g  a reference to the game
	 */
	public void turnIncrement(Game g) {
		return;
	}
	
	/**
	 * @return Whether or not the monster has a turn increment ability
	 */
	public boolean hasTurnIncrement() {return false;}
	
	public boolean isStat() {return stat;}
	
	public int getCurrentPower() {return currentPower;}
	
	public void setCurrentPower(int power) {this.currentPower = power;}
}
