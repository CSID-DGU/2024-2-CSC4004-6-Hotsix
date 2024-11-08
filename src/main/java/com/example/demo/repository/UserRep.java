package com.example.demo.repository;

import com.example.demo.domain.UserDomain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRep extends JpaRepository<UserDomain,Long> {

}

