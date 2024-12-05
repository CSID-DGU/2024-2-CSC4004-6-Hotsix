package com.example.demo.controller;

import com.example.demo.dto.PostDto;
import com.example.demo.service.PostSer;
import com.example.demo.domain.PostDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.repository.UserRep;
import com.example.demo.exception.ResourceNotFoundException;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.Map; 
import java.util.HashMap; 

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {
	private final PostSer postSer;
    private final UserRep userRep;

    @GetMapping
    public List<PostDto> getAllPosts() {
        return postSer.getAllPosts().stream()
                      .map(postSer::convertToDto)
                      .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PostDto getPostById(@PathVariable Long id) {
        PostDomain post = postSer.getPostById(id);
        return postSer.convertToDto(post);
    }

    @PostMapping
    public PostDto createPost(@RequestBody PostDto postDto) {
        PostDomain savedPost = postSer.createPost(postDto);
        return postSer.convertToDto(savedPost);
    }

    @PutMapping("/{id}")
    public PostDto updatePost(@PathVariable Long id, @RequestBody PostDomain post) {
        PostDomain updatedPost = postSer.updatePost(id, post);
        return postSer.convertToDto(updatedPost);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postSer.deletePost(id);
    }

    @GetMapping("/category/{category}")
    public List<PostDto> getPostsByCategory(@PathVariable String category) {
        List<PostDomain> posts = postSer.findPostsByCategory(category);
        return posts.stream().map(postSer::convertToDto).toList();
    }

    @GetMapping("/category/{category}/latest")
    public List<PostDto> getLatestPostsByCategory(@PathVariable String category) {
        List<PostDomain> posts = postSer.findLatestPostsByCategory(category);
        return posts.stream().map(postSer::convertToDto).toList();
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<String> likePost(@PathVariable Long postId, @RequestParam Long userId) {
        postSer.likePost(postId, userId);
        return ResponseEntity.ok("Post liked successfully.");
    }

    @PostMapping("/{postId}/unlike")
    public ResponseEntity<String> unlikePost(@PathVariable Long postId, @RequestParam Long userId) {
        int likes = postSer.unlikePost(postId, userId);
        return ResponseEntity.ok("Post unliked successfully.");
    }

    @GetMapping("/{postId}/like-status")
    public ResponseEntity<Map<String, Object>> getLikeStatus(@PathVariable Long postId, @RequestParam Long userId) {
        boolean isLiked = postSer.isPostLikedByUser(postId, userId);
        int likeCount = postSer.getPostById(postId).getLikes();

        Map<String, Object> response = new HashMap<>();
        response.put("isLiked", isLiked);
        response.put("likeCount", likeCount);

        return ResponseEntity.ok(response);
    }


    
}