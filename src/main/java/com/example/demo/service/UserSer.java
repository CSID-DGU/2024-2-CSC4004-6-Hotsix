package com.example.demo.service;

import com.example.demo.domain.UserDomain;
import com.example.demo.repository.UserRep;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserSer {
    private final UserRep userRep;

    //아이디 중복 확인 함수
    public boolean checkIdDuplicated(String id) {return userRep.existsById(id);}

    //signUp 메소드
    public boolean createUser(UserDomain user){

        //아이디 중복 체크
        if(!checkIdDuplicated(user.getId())){
            this.userRep.save(user);  //DB로 전송
            return true;
        }
        else {return false;}

    }

}
