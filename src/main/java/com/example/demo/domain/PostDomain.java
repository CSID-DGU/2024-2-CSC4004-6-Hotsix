package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

//테이블 이름
@Entity
@Table(name = "post")
@Data
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

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<ReplyDomain> replies;

    public Long getPostId() {
        return postId;
    }

    public String getCategory() { 
        return category; 
    }
    public void setCategory(String category) { 
        this.category = category; 
    }

    public String getContent() { 
        return content; 
    }
    public void setContent(String content) { 
        this.content = content; 
    }

    public String getSubject() { 
        return subject; 
    }
    public void setSubject(String subject) { 
        this.subject = subject; 
    }

    public LocalDateTime getModifyDate() { 
        return modifyDate; 
    }
    public void setModifyDate(LocalDateTime modifyDate) { 
        this.modifyDate = modifyDate; 
    }

    // 自定义方法：点赞
    public void incrementLikes() {
        this.likes++;
    }

    // 自定义方法：取消点赞
    public void decrementLikes() {
        if (this.likes > 0) {
            this.likes--;
        }
    }

    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
    }

}