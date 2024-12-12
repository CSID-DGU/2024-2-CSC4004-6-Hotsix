package com.example.demo.service;

import com.example.demo.DTO.PostDTO;
import com.example.demo.domain.PostDomain;
import com.example.demo.domain.PostVoterDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.DTO.ReplyDTO;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.PostRep;
import com.example.demo.repository.PostVoterRep;
import com.example.demo.repository.UserRep;
//import com.example.demo.exception.ResourceNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.persistence.criteria.*;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.io.FileNotFoundException;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class PostSer {

	private final PostRep postRep;
	private final UserRep userRep;
	private final PostVoterRep postVoterRep;


	public List<PostDomain> getAllPosts() {
		return postRep.findAll();
	}

	public PostDomain getPostById(Long id) {

		return postRep.findWithAuthorById(id).get();

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
	public PostDTO convertToDto(PostDomain post) {
		PostDTO dto = new PostDTO();
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
		dto.setPostImagesNames(post.getPostImages());

		return dto;
	}


	public List<PostDomain> findPostsByCategory(String category) {
		return postRep.findByCategory(category);
	}

	public List<PostDomain> findLatestPostsByCategory(String category) {
		return postRep.findTop4ByCategoryOrderByCreateDateDesc(category);
	}

	// like
	@Transactional
	public int likePost(Long postId, Long userId) {
		PostDomain post = postRep.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post not found"));
		UserDomain user = userRep.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		if (postVoterRep.existsByPostAndVoter(post, user)) {
			throw new IllegalStateException("User has already liked this post.");
		}

		PostVoterDomain postVoter = new PostVoterDomain();
		postVoter.setPost(post);
		postVoter.setVoter(user);
		postVoterRep.save(postVoter);

		post.incrementLikes();
		postRep.save(post);

		return post.getLikes();
	}

	//unlike
	@Transactional
	public int unlikePost(Long postId, Long userId) {
		PostDomain post = postRep.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post not found"));
		UserDomain user = userRep.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		if (!postVoterRep.existsByPostAndVoter(post, user)) {
			throw new IllegalStateException("User has not liked this post.");
		}

		postVoterRep.deleteByPostAndVoter(post, user);

		post.decrementLikes();
		postRep.save(post);

		return post.getLikes();
	}

	@Transactional
	public boolean isPostLikedByUser(Long postId, Long userId) {
		PostDomain post = postRep.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post not found"));
		UserDomain user = userRep.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		return postVoterRep.existsByPostAndVoter(post, user);
	}


	public String saveFile(MultipartFile file) {
		String Dir =
//                    이 부분 본인 프로젝트 디렉토리 경로로 변경

//                     명훈 디렉토리 경로1
//				"C:\\Users\\pc\\Desktop\\Hotsix\\" +
//                    명훈 디렉토리 경로2
                "C:\\Users\\hsson\\IdeaProjects\\2024-2-CSC4004-6-Hotsix/" +
//
						//여기는 윈도우 공통 경로
//						"src\\main\\resources\\static\\asset\\Images\\postImage\\";
						//여기는 mac 공통 경로
						"src/main/resources/static/asset/Images/postImage/";
		String fileName = file.getOriginalFilename();


//		String filePath = Dir + UUID.randomUUID() + "_" + fileName; // 고유 파일명 생성

		try {
			File dest = new File(Dir + fileName);
			file.transferTo(dest); // 파일 저장
			System.out.println("파일 저장 성공");
			System.out.println(Dir + fileName);
			return fileName;
		} catch (IOException e) {
			System.out.println("파일 저장 실패");
			throw new RuntimeException("Failed to save file: " + fileName, e);
		}
	}

}