package com.example.demo.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReplyDto {
    private Long id;
    private String content;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private Long authorUserNum;
    private String authorName;
}
