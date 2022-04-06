package Paint.Shape;

public class Triangle extends Shapes{
    static final String type = "Triangle";
    double radius;

    public Triangle(String color,String colorStroke,double x,double y,double sides,double radius,double lineWidth,boolean filled){
        super(color, colorStroke, x, y, lineWidth,filled);
        this.radius = radius;
    }
    public String getType() {
        return type;
    }


}

