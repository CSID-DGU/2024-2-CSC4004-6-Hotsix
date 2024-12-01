package com.example.demo.service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Comparator;

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

import com.example.demo.dto.PostDTO;
import com.example.demo.repository.UserRep;

@Service
@RequiredArgsConstructor
public class PostSer {

    private final PostRep postRep;
    private final UserRep userRep;

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

    public PostDomain createPost(PostDTO postDTO) {
        // 检查作者是否存在
        UserDomain author = userRep.findById(postDTO.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found"));

        // 创建帖子
        PostDomain post = new PostDomain();
        post.setCategory(postDTO.getCategory());
        post.setContent(postDTO.getContent());
        post.setCreateDate(LocalDateTime.now());
        post.setModifyDate(LocalDateTime.now());
        post.setLikes(0);
        post.setSubject(postDTO.getSubject());
        post.setAuthor(author);

        return postRep.save(post);
    }

    public void updatePost(Long postId, PostDTO postDTO) {
        PostDomain post = postRep.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setSubject(postDTO.getSubject());
        post.setContent(postDTO.getContent());
        post.setCategory(postDTO.getCategory());
        post.setModifyDate(LocalDateTime.now());

        postRep.save(post);
    }

    public void deletePost(Long postId) {
        postRep.deleteById(postId);
    }

    public void addLike(Long postId) {
        PostDomain post = postRep.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setLikes(post.getLikes() + 1);
        postRep.save(post);
    }

    public void removeLike(Long postId) {
        PostDomain post = postRep.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (post.getLikes() > 0) {
            post.setLikes(post.getLikes() - 1);
        }

        postRep.save(post);
    }

    public List<PostDTO> getPostsByCategory(String category, String userId) {
    List<PostDomain> posts = postRep.findByCategory(category); // 获取 PostDomain 列表
    return posts.stream().map(post -> {
        PostDTO dto = new PostDTO();
        dto.setId(post.getId());
        dto.setSubject(post.getSubject());
        dto.setContent(post.getContent());
        dto.setCategory(post.getCategory());
        dto.setLikes(post.getLikes());
        dto.setCreateDate(post.getCreateDate());

        // 调用 isLikedByUser 方法判断是否点过赞
        dto.setIsLiked(userId != null && isLikedByUser(post.getId(), userId));

        if (post.getAuthor() != null) {
            dto.setAuthorId(post.getAuthor().getUserNum());
            dto.setAuthorName(post.getAuthor().getUserName());
        }
        return dto;
    }).collect(Collectors.toList());
}


    public int getLikeCount(Long postId) {
        PostDomain post = postRep.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return post.getLikes();
    }

    public void toggleLike(Long postId, String userId) {
        PostDomain post = postRep.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        UserDomain user = userRep.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (post.getVoter().contains(user)) {
            post.getVoter().remove(user);
            post.setLikes(post.getLikes() - 1);
        } else {
            post.getVoter().add(user);
            post.setLikes(post.getLikes() + 1);
        }

        postRep.save(post);
    }

    public boolean isLikedByUser(Long postId, String userId) {
        PostDomain post = postRep.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        UserDomain user = userRep.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return post.getVoter().contains(user);
    }




}
