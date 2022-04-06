package Paint.Shape;

public class Circle extends Shapes{
    static final String type = "Circle";
    double radius;

    public Circle(String color,String colorStroke,double x,double y,double raduis,double lineWidth,boolean filled){
        super(color, colorStroke, x, y, lineWidth, filled);
        this.radius = raduis;
    }

    public String getType() {
        return type;
    }
    public double getRaduis(){
        return radius;
    }
    public void setRaduis(double raduis){
        this.radius = raduis;
    }
}

