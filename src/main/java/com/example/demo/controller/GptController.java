package com.example.demo.controller;

import com.example.demo.service.GPTService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // 프론트엔드 URL 명시
public class GptController {
    private final GPTService gptService;

    @Autowired
    public GptController(GPTService gptService) {
        this.gptService = gptService;
    }

    @PostMapping("/ask")
    public Map<String, String> ask(@RequestBody Map<String, String> prompt) throws JSONException {
        String promptData = promptToString(prompt);
        Map<String, String> responseMap = gptService.ask(promptData); // Map<String, String> 반환
        return responseMap; // { "text": "응답 텍스트", "imageUrl": "이미지 URL" }
    }

    private String promptToString(Map<String, String> prompt) {
        StringBuilder sb = new StringBuilder();
        prompt.forEach((key, value) -> {
            sb.append(key).append(": ").append(value).append("\n");
        });
        return sb.toString();
    }
}
