package base;

import java.io.IOException;
import java.util.ArrayList;

public class Game {

	public static final int PLAY_CARD = 1, ATTACK = 2, ACTIVATE_ABILITY = 3, HERO_POWER = 4, END_TURN = 5;

	private boolean gameRunning;

	private Player player1, player2;

	private int turnCounter;

	public Game(Host h1, Host h2) {
		turnCounter = -1;
		player1 = new Player(h1, true);
		player2 = new Player(h2, false);
		gameRunning = true;
	}

	public Player getPlayer1() {
		return player1;
	}

	public Player getPlayer2() {
		return player2;
	}

	public void endTurn() {
		turnCounter++;
	}

	public void startTurn() {
		turnCounter++;
	}

	public int getTurnCounter() {
		return turnCounter;
	}

	public boolean whoseTurn() {
		return (turnCounter/2)%2 == 0 ? true:false;
	}

	public Player getCurrentPlayer() {
		return whoseTurn() ? getPlayer1():getPlayer2();
	}

	public Player getOtherPlayer() {
		return whoseTurn() ? getPlayer2():getPlayer1();
	}

	public void runGame() {
		while(gameRunning) {



		}
	}

	public void killDead() {
		ArrayList<Monster> deathList = new ArrayList<Monster>();

		for(int i = getCurrentPlayer().getBoard().size()-1; i>=0; i--) {
			if(getCurrentPlayer().getBoard().get(i).getCurrentPower()<=0)
				deathList.add(getCurrentPlayer().getBoard().remove(i));
		}

		for(int i = getOtherPlayer().getBoard().size()-1; i>=0; i--) {
			if(getOtherPlayer().getBoard().get(i).getCurrentPower()<=0)
				deathList.add(getOtherPlayer().getBoard().remove(i));
		}

		for(Monster m: deathList)
			if(m.hasDeathrattle()) {
				m.deathrattle(this);
				killDead();
			}
	}

	public void runTurn(Player current, Player other) throws IOException{

		startTurn();
		for(Monster card:current.getBoard()) {//starts the turn, draws a card
			if(card.hasTurnIncrement()) {
				card.turnIncrement(this);
				killDead();
			}
		}

		Card temp = current.drawCard();
		if(temp != null)
			current.getOutput().writeInt(temp.getID());//writes the ID of the card to the client

		int playerInput;//the player's input. Gets repeatedly written to.
		boolean turnRunning = true;
		do {
			playerInput = current.getInput().readInt();

			if(playerInput == PLAY_CARD) {
				temp = current.playCard(this, current.getInput().readInt());
				if(temp != null) {
					if(temp instanceof Monster) {
						if(((Monster)temp).hasSignature()) {
							((Monster)temp).signature(this);
							killDead();
						}
					}
					if(temp != null) {
						other.getOutput().writeInt(PLAY_CARD);
						other.getOutput().writeInt(temp.getID());
					}
				}
			}

			else if(playerInput == ATTACK) {
				int selectIndex = current.getInput().readInt();
				int attackIndex = current.getInput().readInt();

				if(current.getBoard().get(selectIndex).validAttack(this, attackIndex)) {
					current.getBoard().get(selectIndex).attack(this, attackIndex);
					killDead();
					if(current.getBoard().get(selectIndex).hasOnSelfAttack()) {
						current.getBoard().get(selectIndex).onSelfAttack(this, other.getBoard().get(attackIndex));
						killDead();
					}
					for(Monster m:other.getBoard())
						if(m.hasOnEnemyAttack()) {
							m.onEnemyAttack(this, current.getBoard().get(selectIndex));
							killDead();
						}
					for(Effect e:other.getEffects())
						if(e.hasOnEnemyAttack()) {
							e.onEnemyAttack(this, current.getBoard().get(selectIndex));
							killDead();
						}
				}
			}

			else if(playerInput == ACTIVATE_ABILITY) {
				int indexToActivate = current.getInput().readInt();
				int abilityActivated = current.getInput().readInt();
				
				try {
					current.getBoard().get(indexToActivate).useActivateableAbility(abilityActivated, this);
					killDead();
				} catch(ArrayIndexOutOfBoundsException e) { current.getOutput().writeInt(-1); }
			}
			else if(playerInput == HERO_POWER) {
				current.getCharacter().heroPower(this);
				killDead();
			}
			else if(playerInput == END_TURN) {
				endTurn();
				turnRunning = false;
			}
		} while(turnRunning);
	}

}
