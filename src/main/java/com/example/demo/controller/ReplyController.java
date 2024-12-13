package com.example.demo.controller;

import com.example.demo.DTO.ReplyDTO;
import com.example.demo.domain.ReplyDomain;
import com.example.demo.service.ReplySer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/replies")
@RequiredArgsConstructor
public class ReplyController {
    private final ReplySer replySer;

    @GetMapping("/post/{postId}")
    public List<ReplyDTO> getRepliesByPostId(@PathVariable Long postId) {
        return replySer.getRepliesByPostId(postId);
    }

    @PostMapping
    public ReplyDTO createReply(@RequestParam Long postId, @RequestBody ReplyDomain reply) {
        ReplyDomain savedReply = replySer.createReply(postId, reply);
        return replySer.convertToDto(savedReply);
    }

    @PutMapping("/{replyId}")
    public ReplyDTO updateReply(@PathVariable Long replyId, @RequestBody ReplyDomain reply) {
        ReplyDomain updatedReply = replySer.updateReply(replyId, reply);
        return replySer.convertToDto(updatedReply);
    }

    @DeleteMapping("/{replyId}")
    public void deleteReply(@PathVariable Long replyId) {
        replySer.deleteReply(replyId);
    }

    @PostMapping("/{replyId}/like")
    public ResponseEntity<String> likeReply(@PathVariable Long replyId) {
        int likes = replySer.likeReply(replyId);
        return ResponseEntity.ok("Reply liked successfully. Current likes: " + likes);
    }

    @PostMapping("/{replyId}/unlike")
    public ResponseEntity<String> unlikeReply(@PathVariable Long replyId) {
        int likes = replySer.unlikeReply(replyId);
        return ResponseEntity.ok("Reply unliked successfully. Current likes: " + likes);
    }


}