package com.example.demo.controller;

import com.example.demo.domain.UserDomain;
import com.example.demo.repository.UserRep;
import com.example.demo.service.UserSer;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@org.springframework.stereotype.Controller
public class Controller {
    private final UserSer userSer;

//    @GetMapping("/")
//    public  String root(){return  "redirect:homepage";}

    //홈페이지 이동
    @GetMapping("/")
    public String homepage(){
        return "index";
    }

    //로그인
//    @GetMapping("login")
//    public String login(Model model){
//        model.addAttribute("loginRequest",new UserDomain());
//        return "login";
//    }
    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody UserDomain loginRequest,
                        BindingResult bindingResult,
                        HttpServletRequest httpServletRequest
                        ) {

        //검증 오류가 있는 지 먼저 확인
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Binding Failed");
        }

        //입력받은 id에 해당하는 데이터 가져오기
        Optional<UserDomain> userOptional = userSer.optionalUserDomain(loginRequest.getId());

        //아이디가 없는 경우
        if (userOptional.isEmpty()) {
//            bindingResult.reject("SignInError", "아이디 또는 비밀번호가 틀렸습니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ID does not exist");
        }

        //아이디가 존재
        UserDomain user = userOptional.get();

        //비밀번호가 틀린 경우
        if(!user.getPassword().equals(loginRequest.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Password");
        }
        //로그인 성공 시
        else {

            // 로그인 성공 시 JWT 발급
            String token = userSer.generateToken(user.getId()); // JWT 생성 메서드 호출

            //기존 세션 파기
            httpServletRequest.getSession().invalidate();
            HttpSession session = httpServletRequest.getSession(true);

            //세션 아이디 설정
            session.setAttribute("ID",user.getId());

            //세션 유지 기간 : 30분
            session.setMaxInactiveInterval(1800);

            return ResponseEntity.ok().body(Map.of("token", token)); // 클라이언트에 토큰 반환

//            return ResponseEntity.ok("로그인 성공");

        }
    }


//    //SignUp 페이지 요청
//    @GetMapping("signUp")
//    public String SignUp(){
//        return "signUp";
//    }

    @PostMapping("signUp")
    @ResponseBody
    public ResponseEntity<String> Signup(@RequestBody UserDomain signUpReq, BindingResult bindingResult){
        System.out.println("Received Request: " + signUpReq);
        //회원가입 성공
        if(userSer.createUser(signUpReq)){
            return ResponseEntity.ok("SignUp completed");
        }
        //회원가입 실패
        else {
            bindingResult.reject("DuplicatedId","이미 존재하는 아이디입니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("DuplicatedId");
        }
    }



}
