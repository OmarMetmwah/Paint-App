package Paint.Shape;

public class Shapes{
    double x,y,lineWidth;
    String color,colorStroke;
    boolean filled;

    public Shapes(String color, String colorStroke, double x, double y, double lineWidth, boolean filled)
    {
        this.color = color;
        this.colorStroke = colorStroke;
        this.x = x;
        this.y = y;
        this.lineWidth = lineWidth;
        this.filled = filled;
    }
    public double getX() {
        return x;
    }
    public void setX(double x) {
        this.x = x;
    }
    public double getY() {
        return y;
    }
    public void setY(double y) {
        this.y = y;
    }
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    public String getColorStroke() {
        return colorStroke;
    }
    public void setColorStroke(String colorStroke) {
        this.colorStroke = colorStroke;
    }
    public boolean getFilled() {
        return filled;
    }
    public void setFilled(boolean filled) {
        this.filled = filled;
    }
    public double getLineWidth() {
        return lineWidth;
    }
    public void setLineWidth(double lineWidth) {
        this.lineWidth = lineWidth;
    }
}
