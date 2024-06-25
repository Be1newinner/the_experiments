
//Second.java  
import java.applet.Applet;
import java.awt.*;

public class Second extends Applet {

    public void paint(Graphics g) {
        g.setColor(Color.green);
        g.drawString("welcome to applet", 150, 150);
    }

}
/*
 * <applet code="Second.class" width="300" height="300">
 * </applet>
 */