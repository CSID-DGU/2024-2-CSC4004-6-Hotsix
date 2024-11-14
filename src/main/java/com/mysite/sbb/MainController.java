package com.mysite.sbb;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {

	@GetMapping("/어디 갈래?")
	@ResponseBody
	public String index() {
		return "데이트 코스 추천 플랫폼 \"어디 갈래?\"입니다!";
	}

	@GetMapping("/")
	public String root() {
		return "redirect:/question/list";
	}
}
