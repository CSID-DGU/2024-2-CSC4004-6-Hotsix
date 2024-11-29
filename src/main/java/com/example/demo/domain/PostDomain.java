package com.example.demo.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.example.demo.domain.UserDomain;
import com.example.demo.domain.ReplyDomain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


//테이블 이름
@Table(name = "post")
@Getter
@Setter
@Entity
public class PostDomain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 200)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createDate;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<ReplyDomain> replyList;

    @ManyToOne
    private UserDomain author;

    private LocalDateTime modifyDate;

    @ManyToMany
    Set<UserDomain> voter;
}
