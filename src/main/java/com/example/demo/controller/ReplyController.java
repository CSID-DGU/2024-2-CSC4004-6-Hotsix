// package: com.example.demo.controller

package com.example.demo.controller;

import com.example.demo.domain.PostDomain;
import com.example.demo.domain.ReplyDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.service.PostService;
import com.example.demo.service.ReplyService;
import com.example.demo.service.UserSer;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/replies")
public class ReplyController {
    private final ReplyService replyService;
    private final PostService postService;
    private final UserSer userSer;

    // 댓글 작성
    @PostMapping
    public ReplyDomain create(@RequestBody Map<String, String> replyForm, HttpSession session) {
        String content = replyForm.get("content");
        Integer postId = Integer.valueOf(replyForm.get("postId"));
        String userId = (String) session.getAttribute("ID");

        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }

        UserDomain user = userSer.optionalUserDomain(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));

        PostDomain post = postService.getPost(postId);

        return replyService.create(post, content, user);
    }

    // 댓글 삭제, 수정 등의 메서드 추가 가능
}
