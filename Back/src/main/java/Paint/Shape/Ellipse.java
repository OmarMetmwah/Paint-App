package Paint.Shape;

public class Ellipse extends Shapes{
    static final String type = "Ellipse";
    double x2,y2;

    public Ellipse(String color,String colorStroke,double x,double y,double x2,double y2,double lineWidth,boolean filled){
        super(color, colorStroke, x, y, lineWidth, filled);
        this.x2 = x2;
        this.y2 = y2;

    }

    public double getX2() {
        return x2;
    }

    public void setX2(double x2) {
        this.x2 = x2;
    }

    public double getY2() {
        return y2;
    }

    public void setY2(double y2) {
        this.y2 = y2;
    }

    public String getType() {
        return type;
    }
}

