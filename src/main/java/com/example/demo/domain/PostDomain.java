package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


//테이블 이름
@Table(name = "post")
@Getter
@Setter
@Entity
public class PostDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(length = 200)
    private String subject;

    @Column(name = "modify_date")
    private LocalDateTime modifyDate;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(nullable = false)
    private Integer likes = 0;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_user_num", referencedColumnName = "user_num")
    private UserDomain author;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReplyDomain> replies;

    //사진 저장
    @ElementCollection
    @CollectionTable(name = "post_images", joinColumns = @JoinColumn(name = "post_id"))
    @Column(columnDefinition = "TEXT")
    private List<String> postImages = new ArrayList<>();


    @PreRemove
    private void preRemove() {
        if (postImages != null) {
            postImages.clear();
        }
    }

    public void incrementLikes() {
        this.likes++;
    }

    public void decrementLikes() {
        if (this.likes > 0) {
            this.likes--;
        }
    }
    public LocalDateTime getPostDate() {
        return this.createDate;
    }
    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
    }

    public String getId() {
        return "";
    }

    public void setStatus(String active) {
    }

    public void setViewCount(int i) {
    }

    public void setShareCount(int i) {
    }
}