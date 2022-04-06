package Paint.Shape;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MyShapeJson implements ShapeJson{


    @Override
    public Shapes makeShape(String json) {
        JSONObject obj;
        double x;
        double y;
        ArrayList<String> points = new ArrayList<String>();
        double radius;
        double x2;
        double y2;
        double length;
        double width;
        try {
            obj = new JSONObject(json);
            String type = obj.getString("className");
            obj = obj.getJSONObject("attrs");
            String color ="";
            boolean filled=false;
            if(!type.equals("Line"))
            {
                color = obj.getString("fill");
                filled=true;
            }
            String colorStroke = obj.getString("stroke");
            double lineWidth = obj.getDouble("strokeWidth");
            switch (type){
                case "Circle":
                    x = obj.getDouble("x");
                    y = obj.getDouble("y");
                    radius = obj.getDouble("radius");
                    return  new Circle(color,colorStroke,x,y,radius,lineWidth,filled);
                case "Ellipse":
                    x = obj.getDouble("x");
                    y = obj.getDouble("y");
                    x2 = obj.getDouble("x2");
                    y2 = obj.getDouble("y2");
                    return new Ellipse(color, colorStroke, x, y, x2, y2, lineWidth, filled);
                case "Line":
                    JSONArray jsonArray =  obj.getJSONArray("points");
                    if (jsonArray != null) {
                        int len = jsonArray.length();
                        for (int i=0;i<len;i++){
                            points.add(jsonArray.get(i).toString());
                        }
                    }
                    return new Line(color,colorStroke,points,filled);
                case "Rect":
                    x = obj.getDouble("x");
                    y = obj.getDouble("y");
                    width = obj.getDouble("width");
                    length = obj.getDouble("height");
                    return new Rectangle(color,colorStroke,x,y,width,lineWidth,length,filled);
                case "Square":
                    x = obj.getDouble("x");
                    y = obj.getDouble("y");
                    length = obj.getDouble("height");
                    return new Square(color,colorStroke,x,y,lineWidth,length,filled);
                case "RegularPolygon":
                    x = obj.getDouble("x");
                    y = obj.getDouble("y");
                    radius = obj.getDouble("radius");
                    return new Triangle( color, colorStroke, x, y,3,radius,lineWidth, filled);

            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }
}
