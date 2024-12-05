package com.example.demo.domain;

import java.time.LocalDateTime;
import java.util.Set;

import com.example.demo.domain.UserDomain;
import com.example.demo.domain.PostDomain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


//테이블 이름
@Table(name = "reply")
@Getter
@Setter
@Entity
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



    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
    }

    public Long getPostId() {
        return post != null ? post.getPostId() : null;
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