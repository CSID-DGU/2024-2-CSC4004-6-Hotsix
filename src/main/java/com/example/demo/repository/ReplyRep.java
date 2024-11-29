package com.example.demo.repository;

import com.example.demo.domain.ReplyDomain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRep extends JpaRepository<ReplyDomain, Long> {
    // 필요한 메서드가 있으면 추가
}
