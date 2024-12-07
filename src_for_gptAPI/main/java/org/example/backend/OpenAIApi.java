package org.example.backend;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class OpenAIApi {
    private static final String API_KEY = "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";

    public String ask(String prompt) throws JSONException {
        String responseBody = "";
        String formattedPrompt = String.format("다음 키워드를 받고 데이트 코스를 추천해주세요. 장소 이름만 말해주세요. 또한 답변은 한국어로 해주세요: %s", prompt);

        // 요청 본문에서 `messages` 배열 구성
        JSONObject jsonBody = new JSONObject();
        jsonBody.put("model", "gpt-3.5-turbo");
        JSONArray messages = new JSONArray();
        messages.put(new JSONObject().put("role", "system").put("content", "You are a helpful assistant."));
        messages.put(new JSONObject().put("role", "user").put("content", formattedPrompt));
        jsonBody.put("messages", messages);
        jsonBody.put("max_tokens", 200);
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
