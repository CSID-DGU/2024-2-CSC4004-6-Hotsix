package com.example.demo.domain;


import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;

//테이블 이름
@Table(name = "user")
@Setter
@Getter
@AllArgsConstructor
@Entity
public class UserDomain {
    //userNum (유저 일련번호, PK)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_num")
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

//사용자 맞춤 코스 추천 관련//

    //MBTI
    private String mbti;

    //주당 만남 횟수
    @Min(0)
    @Max(7)
    private int meetingFrequency;

    //에상 예산
//    @Column(nullable = false)
    private String expectedBudgetRange;

    //사귄 날짜
    private Date relationshipDate;

    //액티비티 유무
    private Boolean activityPreference;

    //선호하는 데이트 코스
    private String preferredCourse;

    //교통수단
    private  String transportType;

    //데이트 시작 시간
    private LocalTime startTime;

    //선호 지역
    private String preferredLocation;

    //데이트 필수 코스
    private String RequiredCourse;

    //필수 지역
    private String RequiredLocation;

    //당일 예산
//    @Column(nullable = false)
    private String dayBudgetRange;

//--------------------------------------------------- 빙고 포인트 -------------------------------------------------------//

    //빙고 포인트 (초기값 0 으로 고정)
    private Long bingoPoint = 0L;

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

