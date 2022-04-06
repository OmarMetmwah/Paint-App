package Paint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class Paint {
    public static String uploadFolder = "uploads/";
    public static String savedFolder = "saved/";
    public static void main(String[] args) {
        //Checking the folder exists or not
        File file = new File(uploadFolder);
        if(!file.exists())
            file.mkdir();
        file =  new File(savedFolder);
        if(!file.exists())
            file.mkdir();
        SpringApplication.run(Paint.class, args);
    }

}
