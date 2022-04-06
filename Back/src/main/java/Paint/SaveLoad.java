package Paint;

import org.json.JSONException;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;





public class SaveLoad {

    public boolean saveJSON(File file, String shapes) throws IOException {
//        JSONArray arr = new JSONArray(shapes);
        FileWriter f = new FileWriter(file);
        f.write(shapes);
        f.flush();
        f.close();
        return true;
    }



    public String loadJSON(File file) throws IOException, JSONException {
        String contents = new String((Files.readAllBytes(Paths.get(file.getAbsolutePath()))));
        return contents;

    }

    public boolean saveXML(File file, String shapes) throws IOException {
        FileOutputStream f = new FileOutputStream(file);
        XMLEncoder encoder = new XMLEncoder(f);
        encoder.writeObject(shapes);
        encoder.close();
        f.close();
        return true;
    }

    public String loadXML(File file) throws IOException{
        String list = "";
        FileInputStream f = new FileInputStream(file);
        XMLDecoder decoder = new XMLDecoder(f);
        list = (String) decoder.readObject();
        decoder.close();
        f.close();
        return list;


    }







    }

