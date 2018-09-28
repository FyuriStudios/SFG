/*
 * Edit list:
 * 0.1.0
 * 9-26-18, Hughes: finished the first version of this file and added comments
 */
package base;

/**
 * This class is the base for all characters (heros).<br>
 * When you're making a new hero you should extend this class.<br>
 * Take special note of the {@code heroPower} attribute. That needs to be extended in the particular way of that particular hero.
 * @author Hughes
 */
public abstract class Character implements Targetable{//Targetable so that it can be attacked

	/**
	 * The current hero health cap. Change this if we decide to.
	 */
	public static final int MAX_HEALTH = 50;
	
	/**
	 * The current health of the hero. Actually changes.
	 */
	private int currentHealth;
	
	public final String name;
	
	public Character(String name) {
		this.currentHealth = MAX_HEALTH;
		this.name = name;
	}
	
	/**
	 * This should be overridden the way one might override the {@code signature} method from the Monster class.<br>
	 * For example, if the hero power summons a dude then implement that here.
	 * @param g  a reference to the game
	 */
	abstract void heroPower(Game g);
	
	@Override
	public void takeDamage(int damage) {
		this.currentHealth-=damage;
	}
	
	public int getCurrentHealth() {
		return currentHealth;
	}
	
	public void setCurrentHealth(int currentHealth) {
		this.currentHealth = currentHealth;
	}

}
