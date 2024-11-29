package com.example.demo.controller;

import com.example.demo.domain.UserDomain;
import com.example.demo.service.UserSer;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@org.springframework.stereotype.Controller
public class Controller {
    private final UserSer userSer;

    // 모든 경로를 index.html로 매핑 (정적 파일 제외)
    @GetMapping("/{path:[^\\.]*}")
    public String forward() {
        return "forward:/index.html";
    }


    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody UserDomain loginRequest,
                                   BindingResult bindingResult,
                                   HttpServletRequest httpServletRequest
    ) {

        boolean isFirstLogin;
        //검증 오류가 있는 지 먼저 확인
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(Map.of("error", "Binding Failed"));
        }

        //입력받은 id에 해당하는 데이터 가져오기
        Optional<UserDomain> userOptional = userSer.optionalUserDomain(loginRequest.getId());

        //아이디가 없는 경우
        if (userOptional.isEmpty()) {
//            bindingResult.reject("SignInError", "아이디 또는 비밀번호가 틀렸습니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "ID does not exist"));
        }

        //아이디가 존재
        UserDomain user = userOptional.get();

        //비밀번호가 틀린 경우
        if(!user.getPassword().equals(loginRequest.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid Password"));
        }
        //로그인 성공 시
        else {
            // 로그인 성공 시 JWT 발급
            String token = null;
            try {
                token = userSer.generateToken(user.getId());
            } catch (Exception e) {
                e.printStackTrace(); // 서버 콘솔에 오류 로그 출력
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Token generation failed"));
            }



            //기존 세션 파기
            httpServletRequest.getSession().invalidate();
            HttpSession session = httpServletRequest.getSession(true);

            //세션 아이디 설정
            session.setAttribute("ID",user.getId());

            //세션 유지 기간 : 30분
            session.setMaxInactiveInterval(1800);

            boolean isFirstLogin1 = user.getIsFirstLogin();

            userSer.firstLogin(user);

            return ResponseEntity.ok()
                    .body(Map.of(
                            "token", token,
                            "isFirstLogin", isFirstLogin1
                    ));
        }
    }

        @PostMapping("signUp")
        @ResponseBody
        public ResponseEntity<?> Signup(@RequestParam("id") String id,
                                        @RequestParam("password") String password,
                                        @RequestParam("userName") String userName,
                                        @RequestParam("birthDate") String birthDate,
                                        @RequestParam("phoneNum") String phoneNum,
                                        @RequestParam("profileImagePath") MultipartFile profile
                                       ){

            String Dir =
                    //이 부분 본인 프로젝트 디렉토리 경로로 변경
                    "C:\\Users\\pc\\Desktop\\Hotsix\\" +
                    //여기는 공통 경로
                    "src\\main\\resources\\static\\userProfile\\";
            String fileName = profile.getOriginalFilename();

            // UserDomain 객체 생성
            UserDomain user = new UserDomain();
            user.setId(id);
            user.setPassword(password);
            user.setUserName(userName);
            user.setBirthDate(Date.valueOf(birthDate));
            user.setPhoneNum(phoneNum);
            user.setProfileImagePath(fileName);

            // 디렉토리 확인 및 생성
            File directory = new File(Dir);
            if (!directory.exists()) {
                directory.mkdirs(); // 디렉토리 생성
            }

            try {
                // 파일 저장
                profile.transferTo(new File(Dir + fileName));

            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
            }

            //회원가입 성공
            if(userSer.createUser(user)){
                return ResponseEntity.ok("SignUp completed");
            }
            //회원가입 실패
            else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "DuplicatedId"));
            }
        }

    @GetMapping("userNameAndUserProfile/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {

        String userName = userSer.getUserNameById(id);
        String userProfile = userSer.getProfileImagePathById(id);

        return ResponseEntity.ok().body(Map.of(
                "userName", userName,
                "profileImagePath",userProfile
        ));

    }
    @GetMapping("userProfile/{id}")
    public ResponseEntity<?> getUserProfileById(@PathVariable String id) {

        String profileImagePath = userSer.getProfileImagePathById(id);

        return ResponseEntity.ok().body(Map.of("profileImagePath", profileImagePath));

    }
}
