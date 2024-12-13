package com.example.demo.repository;
import com.example.demo.domain.PostDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.domain.PostVoterDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository
public interface PostVoterRep extends JpaRepository<PostVoterDomain, Long> {
    // 按字段名称修改方法
    boolean existsByPostAndVoter(PostDomain post, UserDomain voter);
    void deleteByPostAndVoter(PostDomain post, UserDomain voter);
}