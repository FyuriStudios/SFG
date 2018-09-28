/*
 * Edit list:
 * 0.1.0
 * 9-26-18, Hughes: finished the first version of this file and added comments
 */
package base;

/**
 * Essentially just a container for effects. Provides multiple types of effects. Can be useful for field spells.<br>
 * I stole most of this code from the {@code Monster} class. <br>
 * If you need a new type of effect that activates in a different fashion, just add it to this class 
 * (and MAKE SURE to add the boolean method that goes along with it. I know this solution is kind of gross but hey, it works.
 * @author Hughes
 */
public class Effect implements Effectable{

	/**
	 * Executes when this monster attacks, if it has this ability.
	 * @param g  a reference to the game
	 * @param c  the target of the attack
	 */
	@Override
	public void onSelfAttack(Game g, Targetable c) {
		return;
	}

	/**
	 * @return Whether or not the monster has an on own attack ability.
	 */
	@Override
	public boolean hasOnSelfAttack() {
		return false;
	}

	/**
	 * Executes when an enemy attacks, if it has this ability
	 * @param g  a reference to the game
	 * @param c  the monster that is attacking
	 */
	@Override
	public void onEnemyAttack(Game g, Targetable c) {
		return;
	}

	/**
	 * @return Whether or not the monster has an on enemy attack
	 */
	@Override
	public boolean hasOnEnemyAttack() {
		return false;
	}

	/**
	 * Executes the on death method of the monster, if it exists.
	 * @param g  a reference to the game
	 */
	@Override
	public void deathrattle(Game g) {
		return;
	}

	/**
	 * @return whether or not the monster has an on death ability.
	 */
	@Override
	public boolean hasDeathrattle() {
		return false;
	}

	/**
	 * Executes the spell casted ability of a monster, if it exists.
	 * @param g  a reference to the game
	 */
	@Override
	public void spellCast(Game g) {
		return;
	}

	/**
	 * @return whether or not the monster has a spell cast ability
	 */
	@Override
	public boolean hasSpellCast() {
		return false;
	}

	/**
	 * Executes when the turn increments (start and end of turns), if it exists.
	 * @param g  a reference to the game
	 */
	@Override
	public void turnIncrement(Game g) {
		return;
	}

	/**
	 * @return Whether or not the monster has a turn increment ability
	 */
	@Override
	public boolean hasTurnIncrement() {
		return false;
	}

	@Override
	public void signature(Game g) {
		return;	
	}

	@Override
	public boolean hasSignature() {
		return false;
	}

	@Override
	public void entersBoard(Game g) {
		return;
	}

	@Override
	public boolean hasEntersBoard() {
		return false;
	}

}
