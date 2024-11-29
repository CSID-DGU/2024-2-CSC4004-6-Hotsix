// package: com.example.demo.repository

package com.example.demo.repository;

import com.example.demo.domain.PostDomain;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRep extends JpaRepository<PostDomain, Integer> {
    // 제목으로 게시글 찾기
    PostDomain findBySubject(String subject);

    // 제목과 내용으로 게시글 찾기
    PostDomain findBySubjectAndContent(String subject, String content);

    // 제목에 특정 문자열이 포함된 게시글 목록
    Page<PostDomain> findBySubjectContaining(String subject, Pageable pageable);

    // 기타 필요한 메서드 추가
}
