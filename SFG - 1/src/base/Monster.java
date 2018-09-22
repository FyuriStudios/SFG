package base;

import java.util.ArrayList;

public class Monster extends Card implements Character{
	
	/**
	 * The power of the monster as defined by the card text. Doesn't change.
	 */
	public final int power;
	
	/**
	 * The actual power of the monster. Doesn't get a value until the monster is played.
	 */
	private int currentPower;
	
	private int enteredBoardOn;
	
	private ArrayList<ActivateableAbility> activAbilities;

	public Monster(int cost, Card.TokenType tokenType, Card.Rarity rarity, int power, int enteredOn) {
		super(cost, tokenType, rarity);
		this.power = power;
		this.enteredBoardOn = enteredOn;
	}

	@Override
	public boolean takeDamage(int damage) {
		this.currentPower -= damage;
		return power<=0;
	}
	
	public void useActivateableAbility(int index, Game g, Character c) {
		activAbilities.get(index).run(g, c);
	}
	
	public void addActivateableAbility(ActivateableAbility a) {
		activAbilities.add(a);
	}
	
	public void playCard() {
		
	}
	
	public boolean hasDefender() {
		return false;
	}
	
	public boolean validAttack(int enemyIndex) {
		//TODO add stuff here
	}
	
	public void attack() {
		//TODO add stuff here
	}
	
	public void signature(Game g) {
		return;
	}
	
	public void entersBoard(Game g) {
		return;
	}
	
	public void onSelfAttack(Game g, Character c) {
		return;
	}
	
	public void onEnemyAttack(Game g, Character c) {
		return;
	}
	
	public void deathrattle(Game g) {
		return;
	}
	
	public void spellCast(Game g) {
		return;
	}
	
	
	
	
	
	
}
