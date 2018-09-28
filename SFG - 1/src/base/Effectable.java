/*
 * Edit List:
 * 0.1.0
 * 9-27-2018, Hughes: Created the file, pretended to add comments
 */
package base;

/**
 * This interface was created to make it easier to call long ass lists of effects.<br>
 * Any type of effect in the game is on this list: add it here, and then the IDE will force you to add it to Monster and Effect.<br>
 * I'm not gonna bother commenting here; the relevant comments can be found elsewhere. Dill with it.
 * @author Hughes
 */
public interface Effectable {
	
	public void signature(Game g);

	public boolean hasSignature();

	public void entersBoard(Game g);

	public boolean hasEntersBoard();

	public void onSelfAttack(Game g, Targetable c);

	public boolean hasOnSelfAttack();

	public void onEnemyAttack(Game g, Targetable c);

	public boolean hasOnEnemyAttack();

	public void deathrattle(Game g);

	public boolean hasDeathrattle();

	public void spellCast(Game g);

	public boolean hasSpellCast();
	
	public void turnIncrement(Game g);

	public boolean hasTurnIncrement();
}
