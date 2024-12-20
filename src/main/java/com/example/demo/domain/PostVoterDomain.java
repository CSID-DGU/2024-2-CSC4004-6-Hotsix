package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "post_voter")
@Data
public class PostVoterDomain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_domain_post_id", referencedColumnName = "post_id")
    private PostDomain post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voter_user_num", referencedColumnName = "user_num")
    private UserDomain voter;
}