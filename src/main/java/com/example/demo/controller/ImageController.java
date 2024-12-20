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
            String path="/home/ubuntu/hotsix/images/postImage/";
            Path filePath = Paths.get(path, filename);
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
                    "/home/ubuntu/hotsix/images/userProfile/";
            Path filePath = Paths.get(path, filename);
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
            String path ="/home/ubuntu/hotsix/images/altImage/";
            Path filePath = Paths.get(path, filename);
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
            String path ="/home/ubuntu/hotsix/images/logo/";
            Path filePath = Paths.get(path, filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {

                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}