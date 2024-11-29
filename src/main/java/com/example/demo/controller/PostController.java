// package: com.example.demo.controller

package com.example.demo.controller;

import com.example.demo.domain.PostDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.service.PostService;
import com.example.demo.service.UserSer;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    private final UserSer userSer;

    // 게시글 목록 조회 (페이징)
    @GetMapping
    public Page<PostDomain> getList(@RequestParam(defaultValue = "0") int page) {
        return postService.getList(page);
    }

    // 게시글 상세 조회
    @GetMapping("/{id}")
    public PostDomain getPost(@PathVariable Integer id) {
        return postService.getPost(id);
    }

    // 게시글 생성
    @PostMapping
    public PostDomain create(@RequestBody Map<String, String> postForm, HttpSession session) {
        String subject = postForm.get("subject");
        String content = postForm.get("content");
        String userId = (String) session.getAttribute("ID");

        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }

        UserDomain user = userSer.optionalUserDomain(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));

        return postService.create(subject, content, user);
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public PostDomain modify(@PathVariable Integer id, @RequestBody Map<String, String> postForm, HttpSession session) {
        PostDomain post = postService.getPost(id);
        String userId = (String) session.getAttribute("ID");

        if (userId == null || !post.getAuthor().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "수정 권한이 없습니다.");
        }

        String subject = postForm.get("subject");
        String content = postForm.get("content");

        postService.modify(post, subject, content);
        return post;
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id, HttpSession session) {
        PostDomain post = postService.getPost(id);
        String userId = (String) session.getAttribute("ID");

        if (userId == null || !post.getAuthor().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "삭제 권한이 없습니다.");
        }

        postService.delete(post);
    }

    // 게시글 좋아요
    @PostMapping("/{id}/vote")
    public void vote(@PathVariable Integer id, HttpSession session) {
        PostDomain post = postService.getPost(id);
        String userId = (String) session.getAttribute("ID");

        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }

        UserDomain user = userSer.optionalUserDomain(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));

        postService.vote(post, user);
    }
}
