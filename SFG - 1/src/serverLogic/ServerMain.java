package serverLogic;

import java.io.IOException;
import java.util.ArrayList;

import base.Game;
import base.Host;

public class ServerMain implements Runnable{

	public Host h1;
	public Host h2;

	public ServerMain(Host h1, Host h2) {
		this.h1 = h1;
		this.h1 = h2;
	}

	public static void main(String[] args) throws IOException {
		int currentPort = 5001;
		Host h = new Host(5000);
		boolean running = true;
		ArrayList<Host> hosts = new ArrayList<Host>();

		while(running) {
			if(h.getInput().readInt() == 1) {
				h.getOutput().writeInt(currentPort);
				Host a = new Host(currentPort);
				hosts.add(a);
				currentPort++;
			}
			else {
				System.exit(0);
			}
			if(hosts.size() == 2) {
				Thread t = new Thread(new ServerMain(hosts.get(0), hosts.get(1)));
				t.start();
			}
		}
	}

	@Override
	public void run() {
		Game g = new Game(h1, h2);
		g.runGame();
	}

}
