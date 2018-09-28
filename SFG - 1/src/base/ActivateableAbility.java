/*
 * Edit list:
 * 0.1.0
 * 9-26-18, Hughes: finished the first version of this file and added comments
 */
package base;

/**
 * This interface was created so that monsters could have a bunch of activateable abilities.<br>
 * The whole point of this class is to be extended when you want to create a new activateable ability for a monster.<br>
 * Then you should add it to the monster's ability list using Monster.addActivateableAbility(ActivateableAbility e)
 * @author Hughes
 */
public interface ActivateableAbility {

	/**
	 * This method needs to be implemented to have a useful activateable ability.
	 * @param g  a reference to the game
	 */
	public void run(Game g);
}
