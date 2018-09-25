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
	private Character character;
	
	private int mTokens;
	private int sTokens;
	
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
	
	public DataOutputStream getOutput() {
		return this.out;
	}
	
	public DataInputStream getInput() {
		return this.in;
	}
	
	public Card drawCard() {
		Card temp = null;
		if(deck.size()>0)
			temp = deck.remove(deck.size()-1);
		else {
			character.takeDamage(25);
			return null;
		}
		try {
			out.writeInt(temp.getID());
		} catch (IOException e) {e.printStackTrace();}
		if(hand.size()>9)
			return null;
		else
			hand.add(temp);
		return temp;
	}
	
	public Card playCard(Game g, int index) {
		
		if(hand.get(index).tokenType == Card.TokenType.MONSTER) {
			if(mTokens >= hand.get(index).getPlayCost()) {
				mTokens -= hand.get(index).getPlayCost();
			} else {
				try {
					g.getCurrentPlayer().getOutput().writeInt(-1);
					return null;
				} catch (IOException e) {e.printStackTrace();}
			}
		} else if(hand.get(index).tokenType == Card.TokenType.SPELL) {
			if(sTokens >= hand.get(index).getPlayCost()) {
				sTokens -= hand.get(index).getPlayCost();
			} else {
				try {
					g.getCurrentPlayer().getOutput().writeInt(-1);
					return null;
				} catch (IOException e) {e.printStackTrace();}
			}
		} else if(hand.get(index).tokenType == Card.TokenType.MFLEX) {
			if(sTokens + mTokens >= hand.get(index).getPlayCost()) {
				if(mTokens < hand.get(index).getPlayCost())
					mTokens -= hand.get(index).getPlayCost();
				else {
					int temp = hand.get(index).getPlayCost();
					temp -= mTokens;
					mTokens = 0;
					sTokens -= temp;
				}	
			} else {
				try {
					g.getCurrentPlayer().getOutput().writeInt(-1);
					return null;
				} catch (IOException e) {e.printStackTrace();}
			}
		} else if(hand.get(index).tokenType == Card.TokenType.SFLEX) {
			if(sTokens + mTokens >= hand.get(index).getPlayCost()) {
				if(sTokens < hand.get(index).getPlayCost())
					sTokens -= hand.get(index).getPlayCost();
				else {
					int temp = hand.get(index).getPlayCost();
					temp -= sTokens;
					sTokens = 0;
					mTokens -= temp;
				}	
			} else {
				try {
					g.getCurrentPlayer().getOutput().writeInt(-1);
					return null;
				} catch (IOException e) {e.printStackTrace();}
			}
		}
		
		
		Card temp = hand.remove(index);
		if(temp instanceof Monster) {
			try {
				board.add(getInput().readInt(), (Monster)temp);
			} catch (IOException e) {e.printStackTrace();}
			((Monster)temp).playCard();
		} else if(temp instanceof Spell) {
			((Spell)temp).play(g);
		}
		return temp;
	}
	
	
}
