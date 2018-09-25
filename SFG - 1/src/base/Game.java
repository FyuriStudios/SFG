package base;

import java.util.ArrayList;

public class Game {
	
	private boolean gameRunning;
	
	private Player player1, player2;
	
	private int turnCounter;
	
	public Game(int port1, int port2) {
		turnCounter = -1;
		player1 = new Player(port1, true);
		player2 = new Player(port2, false);
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
	
	public void runGame() {
		while(gameRunning) {
			
		}
	}
	
	
}
