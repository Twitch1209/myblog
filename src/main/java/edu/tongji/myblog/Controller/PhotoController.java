package edu.tongji.myblog.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
@RequestMapping(value = "/photo")
public class PhotoController {
    private final ResourceLoader resourceLoader;

    @Autowired
    public PhotoController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    //Save the uploaded file to this folder
    private static String UPLOADED_FOLDER = "D://githublocal//myblog//src//main//resources//uploadFile//";

    @PostMapping("/upload")
    public String singleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {
        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return "redirect:uploadStatus";
        }

        try {
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "'");
            System.out.println("You successfully uploaded '" + path + "'");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "redirect:/show";
    }

    /**
     * 上传图片
     * @author twitch
     */
    @RequestMapping(value = "/testUpdate", method = RequestMethod.POST)
    @ResponseBody
    public String testUpdate(@RequestParam("file") MultipartFile file){
        if (file.isEmpty()) {
            System.out.println("file is empty!");
            return "empty file";
        }

        try {
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            System.out.println("You successfully uploaded '" + path + "'");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Success";
    }
    /**
     * 显示单张图片
     * @return
     */
    @RequestMapping(value = "/show", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity showPhotos(@RequestParam("fileName") String fileName){
        try {
            // 由于是读取本机的文件，file是一定要加上的， path是在application配置文件中的路径
            return ResponseEntity.ok(resourceLoader.getResource("file:" + UPLOADED_FOLDER + fileName));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
