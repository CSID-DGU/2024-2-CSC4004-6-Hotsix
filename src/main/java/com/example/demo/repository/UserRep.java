package com.example.demo.repository;

import com.example.demo.domain.UserDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRep extends JpaRepository<UserDomain,Long> {
    //Name으로 유저 찾기
    UserDomain findByUserName(String userName);
    //중복id 확인용
    boolean existsById(String id);
    Optional<UserDomain> findById(String id);
    Optional<UserDomain> findByUserNum(Long num);
}

