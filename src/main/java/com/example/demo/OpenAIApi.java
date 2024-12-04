package com.example.demo;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class OpenAIApi {
//    private static final String API_KEY = "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";

    public String ask(String prompt) throws JSONException {
        String responseBody = "";
        String formattedPrompt = String.format("다음 키워드를 받고 데이트 코스를 추천해주세요. 장소 이름만 말해주세요. 또한 답변은 한국어로 해주세요: %s", prompt);

        // 요청 본문에서 `messages` 배열 구성
        JSONObject jsonBody = new JSONObject();
        //gpt 모델
        jsonBody.put("model", "gpt-4");
        JSONArray messages = new JSONArray();
        messages.put(new JSONObject().put("role", "system").put("content", "You are a helpful assistant."));
        messages.put(new JSONObject().put("role", "user").put("content", formattedPrompt));
        jsonBody.put("messages", messages);
        //응답 최대 길이
        jsonBody.put("max_tokens", 200);
        //응답의 창의성
        jsonBody.put("temperature", 0.7);

        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + API_KEY)
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody.toString()))
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            responseBody = extractAnswer(response.body());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return responseBody;
    }

    private String extractAnswer(String responseJson) throws JSONException {
        JSONObject jsonObject = new JSONObject(responseJson);

        if (jsonObject.has("choices")) {
            return jsonObject.getJSONArray("choices")
                    .getJSONObject(0)
                    .getJSONObject("message") // `message` 객체로 접근
                    .getString("content")    // `content` 읽기
                    .trim();
        } else {
            System.err.println("Error in API response: " + responseJson);
            return "API 호출 중 오류가 발생했습니다.";
        }
    }
}
