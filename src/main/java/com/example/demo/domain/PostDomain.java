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
    private Long id;

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

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public UserDomain getAuthor() {
        return author;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }
}
