package com.example.demo.service;

import com.example.demo.domain.ReplyDomain;
import com.example.demo.domain.PostDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.dto.ReplyDTO;
import com.example.demo.repository.ReplyRep;
import com.example.demo.repository.PostRep;
import com.example.demo.repository.UserRep;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class ReplySer {

    private final ReplyRep replyRep;
    private final PostRep postRep;
    private final UserRep userRep;

    public ReplyDomain createReply(ReplyDTO replyDTO) {
        // 检查帖子是否存在
        PostDomain post = postRep.findById(replyDTO.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // 检查作者是否存在
        UserDomain author = userRep.findById(replyDTO.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found"));

        // 创建回复
        ReplyDomain reply = new ReplyDomain();
        reply.setContent(replyDTO.getContent());
        reply.setCreateDate(LocalDateTime.now());
        reply.setModifyDate(LocalDateTime.now());
        reply.setPost(post);
        reply.setAuthor(author);

        return replyRep.save(reply);
    }

    public void updateReply(Long replyId, ReplyDTO replyDTO) {
        ReplyDomain reply = replyRep.findById(replyId)
                .orElseThrow(() -> new RuntimeException("Reply not found"));

        reply.setContent(replyDTO.getContent());
        reply.setModifyDate(LocalDateTime.now());

        replyRep.save(reply);
    }

    public void deleteReply(Long replyId) {
        replyRep.deleteById(replyId);
    }
}
