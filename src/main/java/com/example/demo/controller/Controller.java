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
    @GetMapping("login")
    public String login(Model model){
        model.addAttribute("loginRequest",new UserDomain());
        return "login";
    }
    @PostMapping("login")
    public String login(@ModelAttribute("loginRequest")UserDomain loginRequest,
                        BindingResult bindingResult,
                        HttpServletRequest httpServletRequest,
                        Model model
                        ) {
//        UserDomain user = userSer.

        //검증 오류가 있는 지 먼저 확인
        if (bindingResult.hasErrors()) {
            return "login";
        }

        if (loginRequest == null) {
            bindingResult.reject("SignInError", "아이디 또는 비밀번호가 틀렸습니다.");
            return "login";

        }

        //로그인 성공 시
        //기존 세션 파기
        httpServletRequest.getSession().invalidate();
        HttpSession session = httpServletRequest.getSession(true);
        //세션 아이디 설정
//        session.setAttribute("num",.getNum());

        //세션 유지 기간 : 30분
        session.setMaxInactiveInterval(1800);

        return "redirect:/";
    }



//    //SignUp 페이지 요청
//    @GetMapping("signUp")
//    public String SignUp(){
//        return "signUp";
//    }

    @PostMapping("signUp")
    @ResponseBody
    public ResponseEntity<String> Signup(@RequestBody UserDomain signUpReq, BindingResult bindingResult){

        //회원가입 성공
        if(userSer.createUser(signUpReq)){
            return ResponseEntity.ok("회원가입이 완료되었습니다.");
        }
        //회원가입 실패
        else {
            bindingResult.reject("DuplicatedId","이미 존재하는 아이디입니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 존재하는 아이디입니다.");
        }
    }



}
