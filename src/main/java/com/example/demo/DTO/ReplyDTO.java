package com.example.demo.dto;

import lombok.Data;

@Data
public class ReplyDTO {
    private String content;
    private Long postId;    // 回复对应的 Post ID
    private Long authorId;  // 回复的作者 ID
}
