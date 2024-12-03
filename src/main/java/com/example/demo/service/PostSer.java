package com.example.demo.service;

import com.example.demo.domain.PostDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.dto.PostDto;
import com.example.demo.repository.PostRep;
import com.example.demo.repository.UserRep;
import com.example.demo.exception.ResourceNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.persistence.criteria.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.io.FileNotFoundException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PostSer {

	private final PostRep postRep;
    private final UserRep userRep;

	// @SuppressWarnings("unused")
	// private Specification<PostDomain> search(String kw) {
	// 	return new Specification<>() {
	// 		private static final long serialVersionUID = 1L;

	// 		@Override
	// 		public Predicate toPredicate(Root<PostDomain> q, CriteriaQuery<?> query, CriteriaBuilder cb) {
	// 			query.distinct(true); // 중복을 제거
	// 			Join<PostDomain, UserDomain> u1 = q.join("author", JoinType.LEFT);
	// 			Join<PostDomain, ReplyDomain> a = q.join("answerList", JoinType.LEFT);
	// 			Join<ReplyDomain, UserDomain> u2 = a.join("author", JoinType.LEFT);
	// 			return cb.or(
	// 				cb.like(q.get("subject"), "%" + kw + "%"), // 제목
	// 				cb.like(q.get("content"), "%" + kw + "%"), // 내용
	// 				cb.like(u1.get("username"), "%" + kw + "%"), // 질문 작성자
	// 				cb.like(a.get("content"), "%" + kw + "%"), // 답변 내용
	// 				cb.like(u2.get("username"), "%" + kw + "%")); // 답변 작성자
	// 		}
	// 	};
	// }

    public List<PostDomain> getAllPosts() {
        return postRep.findAll();
    }

    public PostDomain getPostById(Long id) {
        return postRep.findWithAuthorById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
    }


    public PostDomain createPost(PostDto postDto) {
        UserDomain user = userRep.findById(postDto.getAuthorUserNum())
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + postDto.getAuthorUserNum()));

        // Constructing a PostDomain Object
        PostDomain post = new PostDomain();
        post.setCategory(postDto.getCategory());
        post.setContent(postDto.getContent());
        post.setSubject(postDto.getSubject());
        post.setAuthor(user);
        post.setCreateDate(LocalDateTime.now());

        return postRep.save(post);
    }

    public PostDomain updatePost(Long id, PostDomain post) {
        PostDomain existingPost = getPostById(id);
        existingPost.setCategory(post.getCategory());
        existingPost.setContent(post.getContent());
        existingPost.setSubject(post.getSubject());
        existingPost.setModifyDate(LocalDateTime.now());
        return postRep.save(existingPost);
    }

    public void deletePost(Long id) {
        postRep.deleteById(id);
    }

    // DTO Conversion
    public PostDto convertToDto(PostDomain post) {
        PostDto dto = new PostDto();
        dto.setId(post.getPostId());
        dto.setCategory(post.getCategory());
        dto.setContent(post.getContent());
        dto.setSubject(post.getSubject());
        dto.setLikes(post.getLikes());
        dto.setCreateDate(post.getCreateDate());
        if (post.getAuthor() != null) {
            dto.setAuthorUserNum(post.getAuthor().getUserNum());
            dto.setAuthorName(post.getAuthor().getUserName());
        } else {
            dto.setAuthorUserNum(null);
            dto.setAuthorName("Unknown");
        }
        return dto;
    }


    public List<PostDomain> findPostsByCategory(String category) {
        return postRep.findByCategory(category);
    }

    public List<PostDomain> findLatestPostsByCategory(String category) {
        return postRep.findTop4ByCategoryOrderByCreateDateDesc(category);
    }

    public int likePost(Long postId) {
        PostDomain post = postRep.findById(postId)
            .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
        post.incrementLikes();
        postRep.save(post);
        return post.getLikes();
    }

    public int unlikePost(Long postId) {
        PostDomain post = postRep.findById(postId)
            .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
        post.decrementLikes();
        postRep.save(post);
        return post.getLikes();
    }
	
}
