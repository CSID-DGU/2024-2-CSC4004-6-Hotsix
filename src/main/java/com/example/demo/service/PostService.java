// package: com.example.demo.service

package com.example.demo.service;

import com.example.demo.domain.PostDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.exception.DataNotFoundException;
import com.example.demo.repository.PostRep;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRep postRep;

    // 게시글 생성
    public PostDomain create(String subject, String content, UserDomain author) {
        PostDomain post = new PostDomain();
        post.setSubject(subject);
        post.setContent(content);
        post.setCreateDate(LocalDateTime.now());
        post.setAuthor(author);
        return postRep.save(post);
    }

    // 게시글 목록 조회 (페이징)
    public Page<PostDomain> getList(int page) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by("createDate").descending());
        return postRep.findAll(pageable);
    }

    // 게시글 상세 조회
    public PostDomain getPost(Integer id) {
        Optional<PostDomain> post = postRep.findById(id);
        if (post.isPresent()) {
            return post.get();
        } else {
            throw new DataNotFoundException("post not found");
        }
    }

    // 게시글 수정
    public void modify(PostDomain post, String subject, String content) {
        post.setSubject(subject);
        post.setContent(content);
        post.setModifyDate(LocalDateTime.now());
        postRep.save(post);
    }

    // 게시글 삭제
    public void delete(PostDomain post) {
        postRep.delete(post);
    }

    // 게시글 좋아요
    public void vote(PostDomain post, UserDomain user) {
        post.getVoter().add(user);
        postRep.save(post);
    }
}
