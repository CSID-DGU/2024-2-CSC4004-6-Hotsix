package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "post_voter")
@Data
public class PostVoterDomain {
   	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 如果表中没有单独的主键列，可以改用复合主键（见后文）

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_domain_post_id", referencedColumnName = "post_id")
    private PostDomain post; // 关联帖子

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voter_user_num", referencedColumnName = "user_num")
    private UserDomain voter; // 关联用户
}
