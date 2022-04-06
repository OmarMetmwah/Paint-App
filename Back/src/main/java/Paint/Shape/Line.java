package Paint.Shape;

import java.util.ArrayList;

public class Line extends Shapes {
    static final String type = "Line";
    ArrayList<String> points;

    public Line(String color, String colorStroke, ArrayList<String> points, boolean filled){
        super(color, colorStroke, 0, 0, 0,filled);
        this.points = points;
    }

    public String getType() {
        return type;
    }


}


