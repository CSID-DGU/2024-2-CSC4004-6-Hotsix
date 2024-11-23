package com.example.demo.repository;

import com.example.demo.domain.PostDomain;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;

public interface PostRep extends JpaRepository<PostDomain,Long>{
//    PostDomain findBySubject(String subject);
//
//    PostDomain findBySubjectAndContent(String subject, String content);
//
//    List<PostDomain> findBySubjectLike(String subject);
//
//    Page<PostDomain> findAll(Pageable pageable);
//    @Query("select "
//            + "distinct q "
//            + "from PostDomain q "
//            + "left outer join UserDomain u1 on q.author=u1 "
//            + "left outer join ReplyDomain a on a.question=q "
//            + "left outer join UserDomain u2 on a.author=u2 "
//            + "where "
//            + "   q.subject like %:kw% "
//            + "   or q.content like %:kw% "
//            + "   or u1.userName like %:kw% "
//            + "   or a.content like %:kw% "
//            + "   or u2.userName like %:kw% ")
//
//    Page<PostDomain> findAll(Specification<PostDomain> spec, Pageable pageable);
//
//    Page<PostDomain> findAllByKeyword(@Param("kw") String kw, Pageable pageable);

}
