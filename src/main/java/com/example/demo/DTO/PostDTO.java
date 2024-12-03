package com.example.demo.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostDto {
    private Long id;
    private String category;
    private String content;
    private String subject;
    private Integer likes;
    private LocalDateTime createDate;
    private Long authorUserNum;
    private String authorName;
}
