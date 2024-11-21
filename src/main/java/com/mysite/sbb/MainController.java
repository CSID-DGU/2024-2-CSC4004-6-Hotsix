package com.mysite.sbb;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String root() {
        return "index"; // "index.html" 파일 이름에서 확장자를 제외하고 반환
    }
}
