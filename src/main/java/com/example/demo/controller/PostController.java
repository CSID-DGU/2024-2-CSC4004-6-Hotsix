package com.example.demo.controller;

import com.example.demo.DTO.PostDTO;
import com.example.demo.domain.PostDomain;
import com.example.demo.domain.UserDomain;
import com.example.demo.repository.PostRep;
import com.example.demo.repository.UserRep;
import com.example.demo.service.PostSer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

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

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        PostDomain post = postSer.getPostById(id);
        System.out.println("postImages: " + post.getPostImages());
        return ResponseEntity.ok().body(Map.of("postDTO", postSer.convertToDto(post)));
    }

    // 게시글 작성
    @PostMapping("/{userId}")
    public ResponseEntity<?> createPost(@ModelAttribute PostDTO postDTO,
                                        @RequestParam("postImages") List<MultipartFile> postImages,
                                        @PathVariable String userId) {

        UserDomain user = userRep.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));

        // 유저 정보 저장
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
        if (postDTO.getPostImages() == null || postDTO.getPostImages().isEmpty()) {
            postDomain.setPostImages(null);
        } else {
            // 파일 저장 로직 추가
            List<String> fileNames = new ArrayList<>();
            for (MultipartFile postImage : postImages) {
                String fileName = postSer.saveFile(postImage); // 파일 저장 메서드 호출
                fileNames.add(fileName);
            }
            postDomain.setPostImages(fileNames); // 파일명을 설정
        }

        // 추가적인 초기화 메서드 호출
        initializePostDomain(postDomain);

        // 데이터 저장
        postRep.save(postDomain);

        return ResponseEntity.ok("게시글 작성 완료");
    }


    private void initializePostDomain(PostDomain postDomain) {
        // 예비 설정: 게시글의 상태를 기본값으로 설정
        postDomain.setStatus("ACTIVE");

        // 예비 필드 초기화
        postDomain.setViewCount(0);
        postDomain.setShareCount(0);

        // 로그 기록 (실제 로그로 대체 가능)
        System.out.println("PostDomain initialized with default values.");

        // 추가적인 설정이 필요한 경우 여기에 작성
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public PostDTO updatePost(@PathVariable Long id, @RequestBody PostDomain post) {
        PostDomain updatedPost = postSer.updatePost(id, post);
        logPostUpdate(updatedPost);
        return postSer.convertToDto(updatedPost);
    }


    private void logPostUpdate(PostDomain post) {
        // 실제 로그 프레임워크 사용 시 해당 부분으로 대체 가능
        System.out.println("Post updated: ID = " + post.getId() + ", Subject = " + post.getSubject());
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postSer.deletePost(id);
        logPostDeletion(id);
    }


    private void logPostDeletion(Long postId) {
        // 실제 로그 프레임워크 사용 시 해당 부분으로 대체 가능
        System.out.println("Post deleted: ID = " + postId);
    }

    @GetMapping("/category/{category}")
    public List<PostDTO> getPostsByCategory(@PathVariable String category) {
        List<PostDomain> posts = postSer.findPostsByCategory(category);
        return posts.stream()
                .sorted((p1, p2) -> p2.getPostDate().compareTo(p1.getPostDate()))
                .map(postSer::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/category/{category}/latest")
    public List<PostDTO> getLatestPostsByCategory(@PathVariable String category) {
        List<PostDomain> posts = postSer.findLatestPostsByCategory(category);
        return posts.stream().map(postSer::convertToDto).collect(Collectors.toList());
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<String> likePost(@PathVariable Long postId, @RequestParam Long userId) {
        postSer.likePost(postId, userId);
        logLikeAction(postId, userId, "LIKE");
        return ResponseEntity.ok("Post liked successfully.");
    }

    @PostMapping("/{postId}/unlike")
    public ResponseEntity<String> unlikePost(@PathVariable Long postId, @RequestParam Long userId) {
        int likes = postSer.unlikePost(postId, userId);
        logLikeAction(postId, userId, "UNLIKE");
        return ResponseEntity.ok("Post unliked successfully.");
    }


    private void logLikeAction(Long postId, Long userId, String action) {
        // 실제 로그 프레임워크 사용 시 해당 부분으로 대체 가능
        System.out.println("User " + userId + " performed " + action + " on Post " + postId);
    }

    @GetMapping("/{postId}/like-status")
    public ResponseEntity<Map<String, Object>> getLikeStatus(@PathVariable Long postId, @RequestParam Long userId) {
        boolean isLiked = postSer.isPostLikedByUser(postId, userId);
        int likeCount = postSer.getPostById(postId).getLikes();

        // 추가적인 상태 정보 수집
        Map<String, Object> additionalInfo = collectAdditionalLikeInfo(postId, userId);

        Map<String, Object> response = new HashMap<>();
        response.put("isLiked", isLiked);
        response.put("likeCount", likeCount);
        response.putAll(additionalInfo);

        return ResponseEntity.ok(response);
    }


    private Map<String, Object> collectAdditionalLikeInfo(Long postId, Long userId) {
        Map<String, Object> info = new HashMap<>();
        // 예비 데이터 수집 로직
        info.put("userId", userId);
        info.put("postId", postId);
        info.put("timestamp", new Date());
        // 필요에 따라 더 많은 정보를 추가 가능
        return info;
    }

    @GetMapping("/getUserPosts/{id}")
    public ResponseEntity<?> getUserPosts(@PathVariable String id) {
        Optional<UserDomain> optUser = userRep.findById(id);
        UserDomain user = optUser.orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + id));

        List<PostDomain> posts = postRep.findByAuthorUserNum(Long.valueOf(user.getUserNum()));

        // 게시글의 첫 번째 이미지를 가져오고, null 값 제거
        List<String> thumbnails = posts.stream()
                .map(post -> post.getPostImages() != null && !post.getPostImages().isEmpty() ? post.getPostImages().get(0) : null)
                .filter(Objects::nonNull) // null 값 제거
                .collect(Collectors.toList());

        // 추가적인 사용자 게시글 정보 처리
        UserPostsInfo userPostsInfo = compileUserPostsInfo(user, posts, thumbnails);

        return ResponseEntity.ok(userPostsInfo);
    }


    private UserPostsInfo compileUserPostsInfo(UserDomain user, List<PostDomain> posts, List<String> thumbnails) {
        UserPostsInfo info = new UserPostsInfo();
        info.setUserId(user.getId());
        info.setUserName(user.getUserName());
        info.setTotalPosts(posts.size());
        info.setThumbnails(thumbnails);
        return info;
    }


    private static class UserPostsInfo {
        private String userId;
        private String userName;
        private int totalPosts;
        private List<String> thumbnails;

        // Getters and Setters

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public int getTotalPosts() {
            return totalPosts;
        }

        public void setTotalPosts(int totalPosts) {
            this.totalPosts = totalPosts;
        }

        public List<String> getThumbnails() {
            return thumbnails;
        }

        public void setThumbnails(List<String> thumbnails) {
            this.thumbnails = thumbnails;
        }
    }


    private void additionalUtilityMethod() {

        System.out.println("Executing additional utility method.");
    }
}
