package com.example.demo.repository;

import com.example.demo.domain.PostDomain;
import com.example.demo.domain.ReplyDomain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRep extends JpaRepository<ReplyDomain, Long> {
    List<ReplyDomain> findByPostPostId(Long postId);
}