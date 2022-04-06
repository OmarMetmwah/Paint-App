package Paint.Shape;

public class Square extends Shapes {
    static final String type = "Square";
    double length;

    public Square(String color,String colorStroke,double x,double y,double lineWidth,double length,boolean filled){
        super(color, colorStroke, x, y, lineWidth, filled);
        this.length = length;

    }

    public String getType() {
        return type;
    }
    double getLength(){
        return length;
    }
    public void setLength(double length){
        this.length = length;
    }

}