package Paint;


import Paint.Shape.MyShapeJson;
import Paint.Shape.ShapeJson;
import org.json.JSONException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin
@RestController
public class ShapeController {
    private ShapeFunctions fun;
    private SaveLoad saveLoad;
    public static ShapeJson js = new MyShapeJson();

    public ShapeController() {

        this.fun = new ShapeFunctions();
        this.saveLoad = new SaveLoad();
    }

    @PostMapping("/add")
    public void addShape(@RequestBody String state){
        fun.addShape(state);
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IllegalStateException, IOException {
         Path path = Paths.get(Paint.uploadFolder + file.getOriginalFilename());
         file.transferTo(path);
        try {
            //setShapes also clears the redo
            if(file.getOriginalFilename().contains(".json")) {
                return saveLoad.loadJSON(path.toFile());
            }else {
                return saveLoad.loadXML(path.toFile());
            }
        }catch(IOException | JSONException e) {
            e.printStackTrace();
        }
        return fun.getShapes();
    }

    private Path saved = Paths.get("saved");
    public Resource load(String filename) {
        try {
            Path path = saved.resolve(filename);
            Resource resource = new UrlResource(path.toUri());
            return resource;
        }catch (RuntimeException | MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/downloadXML")
    @ResponseBody
    public ResponseEntity<Resource> getXMLFile() {
        try {
            saveLoad.saveXML(new File("saved/file.xml"), fun.getShapes());
            Resource file = load("file.xml");
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + file.getFilename() + "\"").body(file);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    @GetMapping("/downloadJSON")
    public void getJSONFile() {
        try {
            saveLoad.saveJSON(new File("saved/file.json"), fun.getShapes());
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }
    }

    @GetMapping("/undo")
    public String undo(){
        return fun.undo();
    }

    @GetMapping("/redo")
    public String redo(){
        return fun.redo();
    }
    

}
