package Paint.Shape;

public class Rectangle extends Square{
    static final String type = "Rectangle";
    double length,width;

    public Rectangle(String color,String colorStroke,double x,double y,double width,double lineWidth,double length,boolean filled){
        super(color, colorStroke, x, y, lineWidth, length, filled);
        this.width = width;
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
    double getWidth(){
        return width;
    }
    public void setWidth(double width){
        this.width = width;
    }

}

