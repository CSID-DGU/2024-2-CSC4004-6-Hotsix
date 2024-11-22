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
    private Integer id;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createDate;

    @ManyToOne
    private PostDomain post;

    @ManyToOne
    private UserDomain author;

    private LocalDateTime modifyDate;

    @ManyToMany
    Set<UserDomain> voter;
}
