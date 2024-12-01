package com.example.demo.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PostDTO {
	private Long id;
    private String subject;
    private String content;
    private String category;
    private Long authorId;    // 作者 ID
    private String authorName; // 作者姓名
    private LocalDateTime createDate;
    private int likes;         // 点赞数
    private boolean isLiked;   // 是否已点赞

    public boolean isLiked() {
        return isLiked;
    }

    public void setIsLiked(boolean isLiked) {
        this.isLiked = isLiked;
    }
    
}