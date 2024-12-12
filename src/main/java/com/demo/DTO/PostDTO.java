package com.example.demo.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Setter
@Getter
public class PostDTO {
    private Long id;
    private String subject;
    private String content;
    private String category;
    private Long authorUserNum;    // 作者 ID
    private String authorName; // 作者姓名
    private LocalDateTime createDate;
    private int likes;         // 点赞数
    private boolean isLiked;   // 是否已点赞
    //사진 저장
    private List<MultipartFile> postImages;

    private List<String> postImagesNames;

    public void setIsLiked(boolean b) {
        this.isLiked = b;
    }
}
