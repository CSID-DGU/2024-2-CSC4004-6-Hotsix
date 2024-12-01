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
    private Long replyId;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createDate;

    @ManyToOne
    @JoinColumn(name = "post_id") // 외래키
    private PostDomain post;

    @ManyToOne
    @JoinColumn(name = "author_user_num") // 외래키
    private UserDomain author;

    private LocalDateTime modifyDate;

    @ManyToMany
    Set<UserDomain> voter;
}