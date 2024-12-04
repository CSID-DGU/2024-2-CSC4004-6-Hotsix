package com.example.demo.controller;

import com.example.demo.DTO.PostDTO;
import com.example.demo.service.PostSer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.demo.domain.PostDomain;
import com.example.demo.repository.PostRep;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.stream.Collectors;




@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {

    private final PostSer postSer;
    private final PostRep postRep;

    @PostMapping("/add")
    public ResponseEntity<?> addPost(@RequestBody PostDTO postDTO) {


        return ResponseEntity.ok(postSer.createPost(postDTO));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody PostDTO postDTO) {
        postSer.updatePost(id, postDTO);
        return ResponseEntity.ok("Post updated successfully");
    }

    @PostMapping("/like")
    public ResponseEntity<?> likePost(@RequestBody Map<String, Long> request, HttpServletRequest httpServletRequest) {
        Long postId = request.get("postId");
        String userId = (String) httpServletRequest.getSession().getAttribute("ID");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        postSer.toggleLike(postId, userId);
        int likeCount = postSer.getLikeCount(postId);

        // 判断当前用户是否已点赞
        boolean isLiked = postSer.isLikedByUser(postId, userId);

        return ResponseEntity.ok(Map.of("likeCount", likeCount, "isLiked", isLiked));
    }

    @GetMapping("/posts")
    public List<PostDTO> getPostsByBoard(@RequestParam String boardName, HttpServletRequest request) {
        String userId = (String) request.getSession().getAttribute("ID"); // 从 Session 获取用户 ID
        return postSer.getPostsByCategory(boardName, userId); // 将 userId 传递给服务层
    }




    @GetMapping("/detail")
    public ResponseEntity<PostDTO> getPostDetail(@RequestParam Long id, HttpServletRequest request) {
        String userId = (String) request.getSession().getAttribute("ID"); // 获取当前用户 ID
        PostDomain post = postRep.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        PostDTO dto = new PostDTO();
        dto.setId(post.getPostId());
        dto.setSubject(post.getSubject());
        dto.setContent(post.getContent());
        dto.setCategory(post.getCategory());
        dto.setLikes(post.getLikes());
        dto.setCreateDate(post.getCreateDate());
        dto.setIsLiked(userId != null && postSer.isLikedByUser(post.getPostId(), userId));

        if (post.getAuthor() != null) { // 修复映射作者信息
            dto.setAuthorId(post.getAuthor().getUserNum());
            dto.setAuthorName(post.getAuthor().getUserName());
        }
        return ResponseEntity.ok(dto);
    }



}