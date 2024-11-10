package com.example.demo.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@org.springframework.stereotype.Controller
public class Controller {

    @GetMapping("/")
    public  String root(){return  "redirect:Homepage";}

    //홈페이지 이동
    @GetMapping("/Homepage")
    public String index(){
        return "index.html";
    }

    //로그인
    //SignUp 페이지 요청
    @GetMapping("SignUp")
    public String SignUp(){
        return "SignUp";
    }

    @PostMapping("")


}
