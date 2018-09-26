package base;

/**
 * Essentially just a container for effects. Provides multiple types of effects. Can be useful for field spells.
 */
public class Effect {
	
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

}
