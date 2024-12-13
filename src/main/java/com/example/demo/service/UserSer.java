package com.example.demo.service;

import com.example.demo.domain.UserDomain;
import com.example.demo.repository.UserRep;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserSer {
    private final UserRep userRep;

    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1시간
    //아이디 중복 확인 함수
    public boolean checkIdDuplicated(String id) {return userRep.existsById(id);}

    //signUp 메소드
    public boolean createUser(UserDomain user){

        //아이디 중복 체크
        if(!checkIdDuplicated(user.getId())){
            user.setIsFirstLogin(true);
            userRep.save(user);  //DB로 전송
            return true;
        }
        else {return false;}

    }
    //설문 조사 결과 저장 메소드
    public void saveSurveyResult(UserDomain user){
        userRep.save(user);
    }

    public Optional<UserDomain> optionalUserDomain(String id){
        return userRep.findById(id);
    }

    // JWT 생성
    public String generateToken(String userId) {
        try {
            return Jwts.builder()
                    .setSubject(userId)
                    .setExpiration(new Date(System.currentTimeMillis() +EXPIRATION_TIME)) // 1시간 유효
                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // 비밀 키 확인
                    .compact();
        } catch (Exception e) {
            e.printStackTrace(); // 서버 로그에 예외 출력
            throw new RuntimeException("Token generation failed: " + e.getMessage(), e);
        }
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

    public String getUserNameById(String id){

        Optional<UserDomain> optionalUser = userRep.findById(id);
        UserDomain user = optionalUser.get();
        return user.getUserName();
    }
    public String getProfileImagePathById(String id){

        Optional<UserDomain> optionalUser = userRep.findById(id);
        UserDomain user = optionalUser.get();
        return user.getProfileImagePath();
    }
    public void firstLogin(UserDomain user){

        Optional<UserDomain> userOpt = userRep.findById(user.getId());

        UserDomain user1 = userOpt.get();

        user1.setIsFirstLogin(false);

        userRep.save(user1);
    }
    public Long getUserNumById(String id) {
        Optional<UserDomain> userOptional = userRep.findById(id); // 通过 id 查找用户

        if (userOptional.isPresent()) {
            return userOptional.get().getUserNum(); // 返回 userNum
        } else {
            return null; // 如果用户不存在，返回 null
        }
    }

}
