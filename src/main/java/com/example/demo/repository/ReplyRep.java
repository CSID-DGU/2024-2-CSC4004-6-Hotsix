package com.example.demo.repository;

import com.example.demo.domain.ReplyDomain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRep extends JpaRepository<ReplyDomain,Long> {

}
