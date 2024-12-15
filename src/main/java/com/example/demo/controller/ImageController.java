package com.example.demo.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/uploads")
public class ImageController {

    @GetMapping("/postImage/{filename}")
    public ResponseEntity<Resource> getPostImage(@PathVariable String filename) {
        try {
            String path =
                    //윈도우 용 경로
//                    "src\\main\\resources\\static\\asset\\Images\\postImage\\"
                    //mac 용 경로
                    "src/main/resources/static/asset/Images/postImage/"
                    ;
            // 指定路径为 src/main/resources/static/asset/Images/postImage
            Path filePath = Paths.get(System.getProperty("user.dir"))
                    .resolve(path)
                    .resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {

                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // 如果是 PNG 或其他类型可以修改
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/userProfile/{filename}")
    public ResponseEntity<Resource> getProfileImage(@PathVariable String filename) {
        try {
            String path =
                    //윈도우 용 경로
//                    "src\\main\\resources\\static\\asset\\Images\\userProfile\\"
                    //mac 용 경로
                    "src/main/resources/static/asset/Images/userProfile/"
                    ;
            // 指定路径为 src/main/resources/static/asset/Images/postImage
            Path filePath = Paths.get(System.getProperty("user.dir"))
                    .resolve(path)
                    .resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {

                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // 如果是 PNG 或其他类型可以修改
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/altImage/{filename}")
    public ResponseEntity<Resource> getAltImage(@PathVariable String filename) {
        try {
            String path =
                    //윈도우 용 경로
//                    "src\\main\\resources\\static\\asset\\Images\\altImage\\"
                    //mac 용 경로
                    "src/main/resources/static/asset/Images/altImage/"
                    ;
            // 指定路径为 src/main/resources/static/asset/Images/postImage
            Path filePath = Paths.get(System.getProperty("user.dir"))
                    .resolve(path)
                    .resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {

                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // 如果是 PNG 或其他类型可以修改
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/logo/{filename}")
    public ResponseEntity<Resource> getLogoImage(@PathVariable String filename) {
        try {
            String path =
                    //윈도우 용 경로
//                    "src\\main\\resources\\static\\asset\\Images\\logo\\"
                    //mac 용 경로
                    "src/main/resources/static/asset/Images/logo/"
                    ;
            // 指定路径为 src/main/resources/static/asset/Images/postImage
            Path filePath = Paths.get(System.getProperty("user.dir"))
                    .resolve(path)
                    .resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {

                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // 如果是 PNG 或其他类型可以修改
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}