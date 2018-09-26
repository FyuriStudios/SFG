package base;

public abstract class Character implements Targetable{

	public static final int MAX_HEALTH = 50;
	
	private int currentHealth;
	
	public final String name;
	
	public Character(String name) {
		this.currentHealth = MAX_HEALTH;
		this.name = name;
	}
	
	abstract void heroPower(Game g);
	
	@Override
	public void takeDamage(int damage) {
		
	}

}
