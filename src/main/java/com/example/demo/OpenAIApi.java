package com.example.demo;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class OpenAIApi {

    private static final String API_KEY = "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";

    // GPT API 호출 메서드: 장소 추천
    public String ask(String prompt) throws JSONException {
        String responseBody = "";

        // GPT 요청 프롬프트 구성
        String formattedPrompt = String.format(
                "내가 다음 질문에 'key : value' 형태의 데이터를 주면 너가 그 데이터를 토대로 나에게 하루 데이트 코스를 시간을 포함해서 추천해줘. 총 5개를 말해주고 장소만 알려줘. 출력 예시는 다음과 같아. 예시) [경복궁], [북촌마을], [청와대]. 조건: %s", prompt
        );

        JSONObject jsonBody = new JSONObject();
        jsonBody.put("model", "gpt-3.5-turbo");
        JSONArray messages = new JSONArray();
        messages.put(new JSONObject().put("role", "system").put("content", "You are a helpful assistant."));
        messages.put(new JSONObject().put("role", "user").put("content", formattedPrompt));
        jsonBody.put("messages", messages);
        jsonBody.put("max_tokens", 1000);
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

    // GPT 응답 처리 메서드
    private String extractAnswer(String responseJson) throws JSONException {
        JSONObject jsonObject = new JSONObject(responseJson);

        if (jsonObject.has("choices")) {
            return jsonObject.getJSONArray("choices")
                    .getJSONObject(0)
                    .getJSONObject("message")
                    .getString("content")
                    .trim();
        } else {
            System.err.println("Error in API response: " + responseJson);
            return "GPT 응답 처리 중 오류가 발생했습니다.";
        }
    }

    // 추천 장소의 사진 URL 가져오기
    public String fetchImageUrl(String placeName) {
        try {
            // Google 이미지 검색 URL
            String searchUrl = "https://www.google.com/search?tbm=isch&q=" + placeName;

            // Jsoup으로 HTML 파싱
            Document doc = Jsoup.connect(searchUrl).userAgent("Mozilla/5.0").get();
            Elements images = doc.select("img"); // img 태그 선택

            // Google 로고 등 첫 번째 이미지를 제외한 두 번째 이미지를 가져오기
            if (images.size() > 1) {
                return images.get(1).absUrl("src");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "이미지를 가져오지 못했습니다.";
    }
}
