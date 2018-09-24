package base;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.ArrayList;

public class Player {

	private ArrayList<Card> hand;
	private ArrayList<Monster> board;
	private ArrayList<Card> deck;
	
	private Host h;
	private DataOutputStream out;
	private DataInputStream in;
	
	/**
	 * instantiates a player.
	 * @param port  the port that this player is going to connect to
	 * @param goesFirst  whether or not the player goes first
	 */
	public Player(int port, boolean goesFirst) {
		try { 
			h = new Host(port);
			
			out = h.getOutput();
			in = h.getInput();
			
			out.writeInt(goesFirst ? 1 : 2);
		} catch(IOException e) { e.printStackTrace(); }
	}

	public ArrayList<Card> getHand() {
		return hand;
	}

	public void setHand(ArrayList<Card> hand) {
		this.hand = hand;
	}

	public ArrayList<Monster> getBoard() {
		return board;
	}

	public void setBoard(ArrayList<Monster> board) {
		this.board = board;
	}

	public ArrayList<Card> getDeck() {
		return deck;
	}

	public void setDeck(ArrayList<Card> deck) {
		this.deck = deck;
	}
	
}
