package com.example.demo.DTO;

import lombok.Data;
import lombok.Setter;

@Data
@Setter
public class ReplyDTO {
    private String content;
    private Long postId;    // 回复对应的 Post ID
    private Long authorId;  // 回复的作者 ID
}
