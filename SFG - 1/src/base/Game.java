/*
 * Edit list:
 * 0.1.0
 * 9-26-18, Hughes: finished the first version of this file and added comments
 * 9-27-18, Hughes: fixed the file, added more comments, added Effectable stuff
 */
package base;

import java.io.IOException;
import java.util.ArrayList;

/**
 * The main Game class. possesses everything that a Game might possess, like players and a turn counter.<br>
 * Before constructing a Game, make sure that you already have two Players constructed with a full deck each, since this Game heavily relies on the connection already having been made.<br>
 * DISCLAIMER: This class, along with the Monster and Player classes, are probably where all of the bugs are. Stupid bugs.
 * @author Hughes
 */
public class Game {//TODO: this class probably needs better formatting. Or maybe we should just rewrite it.

	/**
	 * These integers are the expected inputs from the user. They have these constant values associated with them as actions.
	 * If you create a new action, just make sure to add it to this list.
	 */
	public static final int 
	PLAY_CARD = 1, 
	ATTACK = 2, 
	ACTIVATE_ABILITY = 3, 
	HERO_POWER = 4, 
	END_TURN = 5;

	/**
	 * Keeps track of whether or not the game is still in progress.
	 */
	private boolean gameRunning;

	/**
	 * Reference to the Players. The game possesses 2 (obvi).
	 */
	private Player player1, player2;

	/**
	 * Keeps track of the turns in the game.<br>
	 * It increments every time a turn starts and ends so that turn related effects can rely on this variable.
	 */
	private int turnCounter;

	/**
	 * The constructor for the Game. It <i>should</i> start the entire game itself, but it relies on having a reliable frontend that can connect in the prescribed way.
	 * @param h1  the connection to player 1
	 * @param h2  the connection to player 2
	 */
	public Game(Host h1, Host h2) {
		turnCounter = -1;
		player1 = new Player(h1, true);
		player2 = new Player(h2, false);
		gameRunning = true;
	}

	/**
	 * Gets the first player.
	 * @return  the first player
	 */
	public Player getPlayer1() {
		return player1;
	}

	/**
	 * Gets the second player.
	 * @return  the second player
	 */
	public Player getPlayer2() {
		return player2;
	}

	/**
	 * Increments the counter (bc the turn has ended.)
	 */
	public void endTurn() {
		turnCounter++;
	}

	/**
	 * Increments the counter (bc the turn started.)
	 */
	public void startTurn() {
		turnCounter++;
	}

	/**
	 * Gets the actual value of the turn counter.
	 * @return  the turn counter
	 */
	public int getTurnCounter() {
		return turnCounter;
	}

	/**
	 * Returns whose turn it is in the format <br>{@code true: player 1, false: player 2.}
	 * @return  whose turn it is
	 */
	public boolean whoseTurn() {
		return (turnCounter/2)%2 == 0 ? true:false;
	}

	/**
	 * Gets the player whose turn it currently is.
	 * @return  the player whose turn it is.
	 */
	public Player getCurrentPlayer() {
		return whoseTurn() ? getPlayer1():getPlayer2();
	}

	/**
	 * Gets the player whose turn it currently isn't.
	 * @return  the player whose turn it isn't.
	 */
	public Player getOtherPlayer() {
		return whoseTurn() ? getPlayer2():getPlayer1();
	}

	/**
	 * Runs the entire game, start to finish.
	 */
	public void runGame() {
		while(gameRunning) {

			//TODO finish this boiii

		}
	}

	/**
	 * This method checks to see if a hero has died.<br>
	 * Then this method checks to see if any monsters are dead and removes them.<br>
	 * After that, it activates all deathrattle effects that might exist.
	 */
	public void killDead() {

		/*
		 *First, check to make sure that neither player is dead
		 */
		if(player1.getCharacter().getCurrentHealth()<=0 || player2.getCharacter().getCurrentHealth()<=0)
			gameRunning = false;

		/*
		 *This list will contain all of the dead monsters for deathrattle checking
		 */
		ArrayList<Monster> deathList = new ArrayList<Monster>();

		/*
		 * First, loop through the current player's board and remove all dead monsters from the board, placing them in
		 * the deathList.
		 */
		for(int i = getCurrentPlayer().getBoard().size()-1; i>=0; i--) {
			if(getCurrentPlayer().getBoard().get(i).getCurrentPower()<=0)
				deathList.add(getCurrentPlayer().getBoard().remove(i));
		}

		/*
		 * Then, do the same with the other player's board.
		 */
		for(int i = getOtherPlayer().getBoard().size()-1; i>=0; i--) {
			if(getOtherPlayer().getBoard().get(i).getCurrentPower()<=0)
				deathList.add(getOtherPlayer().getBoard().remove(i));
		}

		/*
		 * After that, go through the entire list of dead monsters and activate their deathrattles, if they have them.
		 * If any monsters die as a result of a deathrattle and they have deathrattles, those will be activated first
		 * TODO: Maybe we should fix that? ^
		 */
		for(Monster m: deathList)
			if(m.hasDeathrattle()) {
				m.deathrattle(this);
				killDead();
			}
	}

	/**
	 * Runs a turn. Call this for every turn that takes place.<br>
	 * This method is way too cluttered, TODO: maybe we should think about decluttering.
	 * @param current  a reference to the current player, just makes everything easier
	 * @param other  a reference to the other player, also just makes everything easier
	 * @throws IOException yup, just catch it
	 */
	public void runTurn(Player current, Player other) throws IOException{

		/*
		 * Start the turn of the player, increment the turn counter
		 */
		startTurn();

		/*
		 * Iterate through all things that might have an effect and play their effects if so
		 */
		for(Effectable e: current.getAllEffectables())
			if(e.hasTurnIncrement()) {
				e.turnIncrement(this);
				killDead();
			}
		for(Effectable e: other.getAllEffectables())
			if(e.hasTurnIncrement()) {
				e.turnIncrement(this);
				killDead();
			}

		/*
		 * Draw a card, if it's a valid card draw then send the ID of the card to the dude who drew the card
		 */
		Card temp = current.drawCard();
		if(temp != null)
			current.getOutput().writeInt(temp.getID());

		/*
		 * Declare a variable that will be used for user input
		 */
		int playerInput;

		/*
		 * Make a do-while loop that keeps running while the turn continues
		 */
		boolean turnRunning = true;
		do {

			/*
			 * Read the player input (errors yay)
			 */
			playerInput = current.getInput().readInt();

			/*
			 * If they choose to play a card: Let the Player deal with the actual logic of paying for the card
			 * TODO: move the spell/monster played logic from the Player over to here
			 */
			if(playerInput == PLAY_CARD) {
				temp = current.playCard(this, current.getInput().readInt());

				/*
				 * If the card was played successfully, play the signature/enters board effects of the card.
				 */
				if(temp != null) {
					if(temp instanceof Monster) {
						if(((Monster)temp).hasSignature()) {
							((Monster)temp).signature(this);
							killDead();
						}
						if(((Monster)temp).hasEntersBoard()) {
							((Monster)temp).entersBoard(this);
							killDead();
						}
					}

					/*
					 * Then write the card what was played to the Player.
					 */
					if(temp != null) {
						other.getOutput().writeInt(PLAY_CARD);
						other.getOutput().writeInt(temp.getID());
					}
				}
			}

			/*
			 * If they choose go attack, read input from the Player and do effects associated with it.
			 */
			else if(playerInput == ATTACK) {

				/*
				 * Here, we're going to read the index of the monster that's attacking and the index of the monster that's being attacked.
				 * "-1" should be read if the enemy character is being attacked.
				 */
				int selectIndex = current.getInput().readInt();
				int attackIndex = current.getInput().readInt();

				/*
				 * We check to see if the attack is valid.
				 * Then, we go through all dudes that might have an effect and do their effects.
				 */
				if(current.getBoard().get(selectIndex).validAttack(this, attackIndex)) {
					current.getBoard().get(selectIndex).attack(this, attackIndex);
					killDead();
					if(current.getBoard().get(selectIndex).hasOnSelfAttack()) {
						current.getBoard().get(selectIndex).onSelfAttack(this, other.getBoard().get(attackIndex));
						killDead();
					}
					for(Effectable e:other.getAllEffectables())
						if(e.hasOnEnemyAttack()) {
							e.onEnemyAttack(this, current.getBoard().get(selectIndex));
							killDead();
						}
				}
			}

			/*
			 * If they choose to activate an ability, do the ability and then do some effects
			 */
			else if(playerInput == ACTIVATE_ABILITY) {

				/*
				 * Get input from the user regarding what monster to activate and input 
				 */
				int indexToActivate = current.getInput().readInt();
				int abilityActivated = current.getInput().readInt();

				/*
				 * Make sure that the selection is valid, and then use the card's activateable ability.
				 * Outputs -1 if the input isn't valid.
				 */
				try {
					current.getBoard().get(indexToActivate).useActivateableAbility(abilityActivated, this);
					killDead();
				} catch(ArrayIndexOutOfBoundsException e) { current.getOutput().writeInt(-1); }
			}

			/*
			 * If the selection is to get the hero power, simply do the hero power.
			 */
			else if(playerInput == HERO_POWER) {
				current.getCharacter().heroPower(this);
				killDead();
			}

			/*
			 * If the selection is to end the turn, this loop ends and all effects related to it are played.
			 */
			else if(playerInput == END_TURN) {
				endTurn();
				for(Effectable e: current.getAllEffectables())
					if(e.hasTurnIncrement()) {
						e.turnIncrement(this);
						killDead();
					}
				for(Effectable e: other.getAllEffectables())
					if(e.hasTurnIncrement()) {
						e.turnIncrement(this);
						killDead();
					}
				//end the turn.
				turnRunning = false;
			}
		} while(turnRunning); //while the turn is running input continues to be asked for
	}

}
