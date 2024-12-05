package com.example.demo.controller;

import com.example.demo.service.GPTService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class GptController {
    private final GPTService gptService;

    @Autowired
    public GptController(GPTService gptService) {
        this.gptService = gptService;
    }

    @PostMapping("/ask")
    public Map<String, String> ask(@RequestBody Map<String, Object> userInfo) throws JSONException {
        // userInfo를 문자열로 변환하거나 필요한 형태로 가공
        String prompt = createPromptFromUserInfo(userInfo);

        return gptService.ask(prompt);
    }

    // createPromptFromUserInfo 메서드 구현
    private String createPromptFromUserInfo(Map<String, Object> userInfo) {
        StringBuilder promptBuilder = new StringBuilder();

        // userInfo 맵을 기반으로 프롬프트 문자열 구성
        for (Map.Entry<String, Object> entry : userInfo.entrySet()) {
            promptBuilder.append("{")
                    .append(entry.getKey())
                    .append(" : ")
                    .append(entry.getValue())
                    .append("} , ");
        }

        // 마지막에 추가된 콤마와 공백 제거
        if (promptBuilder.length() > 2) {
            promptBuilder.setLength(promptBuilder.length() - 2);
        }

        return promptBuilder.toString();
    }
}
