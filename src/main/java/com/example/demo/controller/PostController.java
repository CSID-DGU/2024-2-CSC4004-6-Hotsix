package com.example.demo.controller;

import com.example.demo.DTO.PostDTO;
import com.example.demo.repository.PostRep;
import com.example.demo.service.PostSer;
import com.example.demo.domain.PostDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.repository.UserRep;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;


@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostSer postSer;
    private final PostRep postRep;
    private final UserRep userRep;


    @GetMapping
    public List<PostDTO> getAllPosts() {
        return postSer.getAllPosts().stream()
                .map(postSer::convertToDto)
                .collect(Collectors.toList());
    }
    //게시물 보여주기
//    @GetMapping("/{postId}")
//    public ResponseEntity<?> getPostByPostId(@PathVariable Long postId){
//        Optional<PostDomain> optionalPostDomain = postRep.findById(postId);
//        if(optionalPostDomain.isEmpty()){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "No Post"));
//        }
//        else {
//            PostDomain post = optionalPostDomain.get();
//            return ResponseEntity.ok().body(Map.of(
//                    "Likes",post.getLikes(),
//                    "PostImages",post.getPostImages()
//
//            ));
//        }
//    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        PostDomain post = postSer.getPostById(id);
        System.out.println("postImages: " + post.getPostImages());
        return ResponseEntity.ok().body(Map.of("postDTO",postSer.convertToDto(post)));
    }
    //게시글 작성
    @PostMapping("/{userId}")
    public ResponseEntity<?> createPost(@ModelAttribute PostDTO postDTO,
                              @RequestParam("postImages") List<MultipartFile> postImages,
                              @PathVariable String userId
                              ) {

        UserDomain user = userRep.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));

        //유저 정보 저장
        UserDomain user1 = new UserDomain();
        user1.setUserName(postDTO.getAuthorName());
        user1.setUserNum(postDTO.getAuthorUserNum());

        // PostDTO에서 PostDomain으로 변환
        PostDomain postDomain = new PostDomain();
        postDomain.setSubject(postDTO.getSubject());
        postDomain.setContent(postDTO.getContent());
        postDomain.setCategory(postDTO.getCategory());
        postDomain.setAuthor(user1);
        postDomain.setCreateDate(postDTO.getCreateDate());

        // postImages가 null인 경우
        if (postDTO.getPostImages() == null || postDTO.getPostImages().isEmpty()){
            postDomain.setPostImages(null);
        }
        else {
            // 파일 저장 로직 추가
            List<String> fileNames = new ArrayList<>();
            for (MultipartFile postImage : postImages) {
                String fileName = postSer.saveFile(postImage); // 파일 저장 메서드 호출
                fileNames.add(fileName);
            }
            postDomain.setPostImages(fileNames); // 파일명을 설정
        }


        // 데이터 저장
        postRep.save(postDomain);

        return ResponseEntity.ok("게시글 작성 완료");
    }
    //게시글 수정
    @PutMapping("/{id}")
    public PostDTO updatePost(@PathVariable Long id, @RequestBody PostDomain post) {
        PostDomain updatedPost = postSer.updatePost(id, post);
        return postSer.convertToDto(updatedPost);
    }
    //게시글 삭제
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postSer.deletePost(id);
    }

    @GetMapping("/category/{category}")
    public List<PostDTO> getPostsByCategory(@PathVariable String category) {
        List<PostDomain> posts = postSer.findPostsByCategory(category);
        return posts.stream().map(postSer::convertToDto).toList();
    }

    @GetMapping("/category/{category}/latest")
    public List<PostDTO> getLatestPostsByCategory(@PathVariable String category) {
        List<PostDomain> posts = postSer.findLatestPostsByCategory(category);
        return posts.stream().map(postSer::convertToDto).toList();
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<String> likePost(@PathVariable Long postId) {
        int likes = postSer.likePost(postId);
        return ResponseEntity.ok("Post liked successfully. Current likes: " + likes);
    }

    @PostMapping("/{postId}/unlike")
    public ResponseEntity<String> unlikePost(@PathVariable Long postId) {
        int likes = postSer.unlikePost(postId);
        return ResponseEntity.ok("Post unliked successfully. Current likes: " + likes);
    }


}