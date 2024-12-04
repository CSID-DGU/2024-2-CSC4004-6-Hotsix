package com.example.demo.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.example.demo.Converter.StringListConverter;
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
    private Long postId;

    @Column(length = 200)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<ReplyDomain> replyList;

    @ManyToOne
    @JoinColumn(name = "author_user_num")
    private UserDomain author;

    private LocalDateTime modifyDate;

    @ManyToMany
    Set<UserDomain> voter;

    @Column(length = 50)
    private String category;

    @Column(name = "likes")
    private Integer likes;

    //사진 저장
    @Convert(converter = StringListConverter.class) // JSON 변환기 사용
    @Column(columnDefinition = "TEXT") // MySQL에서는 TEXT 타입으로 저장
    private List<String> postImages;

    public PostDomain(){}
}