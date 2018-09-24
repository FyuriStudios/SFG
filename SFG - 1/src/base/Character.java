package base;

/**
 * Everything that can be targeted by attacks and spells should implement this interface.
 */
public interface Character {
	
	public boolean takeDamage(int damage);
	
}
