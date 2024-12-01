package com.example.demo.domain;


import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

//테이블 이름
@Table(name = "user")
@Setter
@Getter
@AllArgsConstructor
@Entity
public class UserDomain {
    //--------------------------------------------------- 개인 정보 -------------------------------------------------------//
    //userNum (유저 일련번호, PK)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNum;

    //id (회원 아이디)
    @Size(min = 6,max = 16)
    private String id;

    //password (회원 비밀번호)
    @Size(min = 8,max = 16)
    private String password;


    //userName (회원 이름)
    private String userName;

    //birthDate (생년월일)
    private Date birthDate;

    //phoneNum (전화번호)
    private String phoneNum;

    //isFirstLogin
    private Boolean isFirstLogin;

    //프로필 사진 경로
    private String profileImagePath;

    //User location
    private String userLocation;

//--------------------------------------------------- 커뮤니티 게시판 관련 -------------------------------------------------------//

    // 작성한 글 번호 (1 : 1)
    @ElementCollection
    private List<Long> myPostNum;

    //좋아요 누른 글
    @ElementCollection
    private List<Long> likedPostNum;

    //작성한 댓글
    @ElementCollection
    private  List<Long> myReplyNum;

//--------------------------------------------------- 사용자 맞춤 코스 추천 관련 -------------------------------------------------------//

    //MBTI
    private String MBTI;

    //주당 만남 횟수
    @Min(0)
    @Max(7)
    private int weeklyMeetingCount;

    //에상 예산
    //최소
    @Column(nullable = false)
    private int expectedBudgetMin;

    //최대
    @Column(nullable = false)
    private int expectedBudgetMax;

    //사귄 날짜
    private Date DatingDate;

    //액티비티 유무
    private Boolean isPreferedActivity;

    //선호하는 데이트 코스
    @ElementCollection
    private List<String> preferedDateCourse;

    //교통수단
    @Enumerated(EnumType.STRING)
    private  TransportType transportType;

    //데이트 시작 시간
    private LocalDateTime DateStartTime;

    //선호 지역
    @ElementCollection
    private List<String> preferedLocation;

    //데이트 필수 코스
    @ElementCollection
    private List<String> RequiredCourse;

    //필수 지역
    @ElementCollection
    private List<String> RequiredLocation;

    //당일 예산
    //최소
    @Column(nullable = false)
    private int dayBudgetMin;

    //최대
    @Column(nullable = false)
    private int dayBudgetMax;







    public UserDomain(String id,String password,String userName,Date birthDate,String phoneNum,String profileImagePath,boolean isFirstLogin){
        this.id = id;
        this.password = password;
        this.userName = userName;
        this.birthDate = birthDate;
        this.phoneNum = phoneNum;
        this.isFirstLogin = isFirstLogin;
        this.profileImagePath = profileImagePath;

    }
    public UserDomain(){}
}

