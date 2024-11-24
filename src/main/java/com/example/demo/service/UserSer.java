package com.example.demo.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import com.example.demo.domain.UserDomain;
import com.example.demo.repository.UserRep;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserSer {
    private final UserRep userRep;

    private final String SECRET_KEY = "hotsix"; // 비밀키
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1시간
    //아이디 중복 확인 함수
    public boolean checkIdDuplicated(String id) {return userRep.existsById(id);}

    //signUp 메소드
    public boolean createUser(UserDomain user){

        //아이디 중복 체크
        if(!checkIdDuplicated(user.getId())){
            userRep.save(user);  //DB로 전송
            return true;
        }
        else {return false;}

    }
    public Optional<UserDomain> optionalUserDomain(String id){
        return userRep.findById(id);
    }

    // JWT 생성
    public String generateToken(String userId) {
        return Jwts.builder()
                .setSubject(userId) // 사용자 식별자 (ID)
                .setIssuedAt(new Date()) // 발행 시간
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // 만료 시간
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // 서명 알고리즘 및 비밀키
                .compact();
    }
    // JWT 검증 및 파싱
    public Claims validateToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
    // JWT에서 사용자 ID 추출
    public String extractUserId(String token) {
        Claims claims = validateToken(token);
        return claims.getSubject();
    }

}
