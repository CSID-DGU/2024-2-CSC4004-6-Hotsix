package com.example.demo.service;

import com.example.demo.OpenAIApi;
import org.json.JSONException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class GPTService {
    private OpenAIApi openAIApi;

    public GPTService() {
        this.openAIApi = new OpenAIApi();
    }

    public Map<String, String> ask(String prompt) throws JSONException {
        // GPT API 호출로 텍스트 응답 가져오기
        String gptResponse = openAIApi.ask(prompt);

        // GPT 응답을 기반으로 이미지 URL 가져오기
        String imageUrl = openAIApi.fetchImageUrl(gptResponse);

        // 응답 데이터를 JSON 형식으로 구성
        Map<String, String> response = new HashMap<>();
        response.put("text", gptResponse);
        response.put("imageUrl", imageUrl);

        return response;
    }
}
