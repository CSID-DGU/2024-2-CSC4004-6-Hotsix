package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;


//테이블 이름
@Entity
@Table(name = "reply")
@Data
public class ReplyDomain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_id")
    private Long replyId;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "modify_date")
    private LocalDateTime modifyDate;

    @Column(nullable = false)
    private Integer likes = 0;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_user_num", referencedColumnName = "user_num")
    private UserDomain author;

    @ManyToOne
    @JoinColumn(name = "post_id", referencedColumnName = "post_id", nullable = false)
    private PostDomain post;

    public Long getReplyId() {
        return replyId;
    }

    public String getContent() { 
        return content; }
    public void setContent(String content) { 
        this.content = content; }

    public LocalDateTime getModifyDate() { 
        return modifyDate; }
    public void setModifyDate(LocalDateTime modifyDate) { 
        this.modifyDate = modifyDate; }

    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
    }

    public Long getPostId() {
        return post != null ? post.getPostId() : null;
    }

    public UserDomain getAuthor() {
        return author;
    }

    public void setAuthor(UserDomain author) {
        this.author = author;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public void incrementLikes() {
        this.likes++;
    }

    public void decrementLikes() {
        if (this.likes > 0) {
            this.likes--;
        }
    }

}