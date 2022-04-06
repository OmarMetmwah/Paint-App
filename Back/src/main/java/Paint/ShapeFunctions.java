package Paint;

import java.util.Stack;

public class ShapeFunctions {

    public String getShapes() {
        return shapes;
    }

    private String shapes = "";
    private Stack<String> undo = new Stack<String>();
    private Stack<String> redo = new Stack<String>();


    public void addShape(String s){
        shapes = s;
        undo.push(shapes);
    }

    public String undo(){
        if(undo.isEmpty()) return  shapes;
        redo.push(shapes);
        shapes = undo.pop();
        return shapes;
    }
    public String redo(){
        if (redo.isEmpty()) return shapes;
        undo.push(shapes);
        shapes = redo.pop();
        return shapes;
    }

}
