package com.example.demo.repository;

import com.example.demo.domain.PostDomain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

@Repository
public interface    PostRep extends JpaRepository<PostDomain, Long> {
    @Query("SELECT p FROM PostDomain p JOIN FETCH p.author WHERE p.postId = :postId")
    Optional<PostDomain> findWithAuthorById(@Param("postId") Long postId);

    // Find all posts matching the category
    List<PostDomain> findByCategory(String category);

    // Find the latest 4 posts
    List<PostDomain> findTop4ByCategoryOrderByCreateDateDesc(String category);

    List<PostDomain> findByAuthorUserNum(Long id);
}