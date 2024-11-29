package com.example.demo.service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.demo.domain.PostDomain;
import com.example.demo.repository.PostRep;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

//import com.mysite.sbb.DataNotFoundException;
import com.example.demo.domain.UserDomain;
import com.example.demo.domain.ReplyDomain;


import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PostSer {

    private final PostRep postRep;

    @SuppressWarnings("unused")
	private Specification<PostDomain> search(String kw) {
		return new Specification<>() {
			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<PostDomain> q, CriteriaQuery<?> query, CriteriaBuilder cb) {
				query.distinct(true); // 중복을 제거
				Join<PostDomain, UserDomain> u1 = q.join("author", JoinType.LEFT);
				Join<PostDomain, ReplyDomain> a = q.join("answerList", JoinType.LEFT);
				Join<ReplyDomain, UserDomain> u2 = a.join("author", JoinType.LEFT);
				return cb.or(cb.like(q.get("subject"), "%" + kw + "%"), // 제목
						cb.like(q.get("content"), "%" + kw + "%"), // 내용
						cb.like(u1.get("username"), "%" + kw + "%"), // 질문 작성자
						cb.like(a.get("content"), "%" + kw + "%"), // 답변 내용
						cb.like(u2.get("username"), "%" + kw + "%")); // 답변 작성자
			}
		};
	}
    public Page<PostDomain> getPosts(int page, int size){
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("createDate"));
        Pageable pageable = PageRequest.of(page,size, Sort.by(sorts));

        return postRep.findAll(pageable);
    }

}
