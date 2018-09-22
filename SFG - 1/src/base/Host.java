package base;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * This class is used to connect to another computer and get input and output from the computer.<br>
 * If you're having issues with this class (ie it's not connecting to another server properly), ask Hughes to fix it.
 * @author Hughes
 */
public class Host {

    private ServerSocket server;//don't worry about it
    private DataInputStream in;//the input stream
    private DataOutputStream out;//the output stream
    private Socket socket;//the socket

    /**
     * The constructor of this class. Given a port number, it constructs an input and output stream after another computer has connected to it.<p>
     * </p>
     * This constructor may throw two exceptions: An IOException and a SecurityException. When thrown, the application should crash and print a stacktrace of the error.<br>
     *      If it's a {@link SecurityException}, you probably need to give Java more permissions on your computer.<br>
     *      If it's an {@link IOException}, ask Hughes to fix it bc that's his fault.
     * @param port  the port number of the computer that this socket should wait on
     */
    public Host(int port) throws IOException{

        //all of this stuff could possibly throw exceptions
        server = new ServerSocket(port);
        socket = server.accept();//waits right here until a connection has been made
        in = new DataInputStream(socket.getInputStream());
        out = new DataOutputStream(socket.getOutputStream());

    }

    /**
     * Closes the connection so that the the application can be shut down properly.
     */
    public void shutdown(){
        try {
            in.close();
            out.close();
            socket.close();
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * @return the DataInputStream from the user
     */
    public DataInputStream getInput() {
        return in;
    }

    /**
     * @return the DataOutputStream to the user
     */
    public DataOutputStream getOutput() {
        return out;
    }


}