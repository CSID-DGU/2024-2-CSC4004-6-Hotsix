package com.example.demo.DTO;

import lombok.Data;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Setter
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
    //사진 저장
    private List<String> postImages;

    public void setIsLiked(boolean b) {
        this.isLiked = b;
    }
}
