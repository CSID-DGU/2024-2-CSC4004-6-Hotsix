// package: com.example.demo.service

package com.example.demo.service;

import com.example.demo.domain.PostDomain;
import com.example.demo.domain.ReplyDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.repository.ReplyRep;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReplyService {
    private final ReplyRep replyRep;

    // 댓글 생성
    public ReplyDomain create(PostDomain post, String content, UserDomain author) {
        ReplyDomain reply = new ReplyDomain();
        reply.setContent(content);
        reply.setCreateDate(LocalDateTime.now());
        reply.setAuthor(author);
        reply.setPost(post);
        return replyRep.save(reply);
    }

    // 댓글 삭제, 수정 등의 메서드 추가 가능
}
