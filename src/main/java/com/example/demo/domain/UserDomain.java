package com.example.demo.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.Size;

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

    public UserDomain(String id,String password,String userName,Date birthDate,String phoneNum){
        this.id = id;
        this.password = password;
        this.userName = userName;
        this.birthDate = birthDate;
        this.phoneNum = phoneNum;
    }
    public UserDomain(){}
}

