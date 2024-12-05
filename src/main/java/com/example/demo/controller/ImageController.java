package com.example.demo.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/uploads")
public class ImageController {

    @GetMapping("/postImage/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            // 指定路径为 src/main/resources/static/asset/Images/postImage
            Path filePath = Paths.get(System.getProperty("user.dir"))
                                 .resolve("src/main/resources/static/asset/Images/postImage/")
                                 .resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                // 返回图片作为响应
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
