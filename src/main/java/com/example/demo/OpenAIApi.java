package com.example.demo;

import jakarta.annotation.PostConstruct;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static java.awt.SystemColor.text;

//import static java.awt.SystemColor.text;
@Component
public class OpenAIApi {


    @Autowired
    private Environment env;


    private final String API_KEY;

    public OpenAIApi(Environment env) {
        this.API_KEY = env.getProperty("OPENAI_API_KEY");
        if (this.API_KEY == null || this.API_KEY.isEmpty()) {
            throw new IllegalStateException("API_KEY가 설정되지 않았습니다.");
        }
    }

    // GPT API 호출 메서드: 장소 추천
    public String ask(String prompt) throws JSONException {
        System.out.println("Loaded API Key: " + API_KEY);
        //
        boolean isRecommendationResult = prompt.contains("isNotCarousel");
        boolean isCarousel = prompt.contains("requestType");
        String responseBody = "";
        String formattedPrompt = "";
        //사용자 맞춤 코스 추천 결과 정보
        String query1 =  "내가 'key : value' 형태의 데이터를 줄거야." +
                "데이트 코스를 그냥 나열하지 말고 깔끔하고 보기좋게 출력해줘." +
                "이모티콘은 써도 되는데 특수문자는 너무 많이 쓰지마" +
                "마지막에 깔끔하게 요약해줘." +
                "MBTI 언급 하지마." +
                "장소를 말할 때는 반드시 실제로 존재하는 장소명을 말해줘야 해." +
                "Markdown 문법으로 대답하지말아줘." +
                "시간 단위는 10분 단위로 얘기해줘." +
                "- 각 활동은 줄바꿈으로 구분해서 출력해 주세요.\n" +
                "- 각 활동은 \"시간\", \"장소\",  순서로 작성하세요.\n" +
                "- 출력 예시:\n" +
                "- 시간: (시간)\n" +
                "- 장소: (장소)\n" +
                "출력을 보기 좋게 정렬해 주세요." +
                "번호를 붙히지 마" +
                "장소는 무조건 구체적인 이름으로 알려줘. ex) 연남동 연트럴파크, 대학로 한뼘사이" +
                "key가 'requiredLocation'인 경우 반드시 그 값에 해당하는 장소 내에서만 코스를 추천해야해. " +
                "예산은 남아도 상관없어. 억지로 채우지마." +
                "조건 %s";
        //캐서렐 섹션별 코스 정보
        String query2 = "내가 'key : value' 형태의 데이터를 줄거야. requestType: 'user_recommendations'가 있으면 너가 그 데이터를 토대로 나에게 하루 데이트 장소를 추천해줘. 총 10개를 말해주고 특정 장소이름(예시 형식 - 홍대 황곱)만 단어로 말해줘. 다른 건 말하지 말고 결과만 나열해(예시 - a,b,c,...). 예시는 포함시키지마" +
                "requestType: 'date_ideas'가 있으면 너가 그 데이터를 토대로 나에게 '여자친구가 좋아할 데이트 코스'를 추천해줘. 총 10개를 말해주고 한글 9글자 이하인 장소 이름만 말해줘. 다른 건 말하지 말고 결과만 나열해(예시 - a,b,c,...). 출력 예시는 다음과 같아. [예시) 롯데타워 81바, 아이파크몰 아웃백, 오길칠 비스트로]. 예시는 대답하지마" +
                "requestType: 'popular_spot'이 있으면 너가 그 데이터를 토대로 나에게 '대중적으로 인기가 많은 장소'를 추천해줘. 총 10개를 말해주고 한글 9글자 이하인 장소 이름만 말해줘.다른 건 말하지 말고 결과만 나열해(예시 - a,b,c,...). 출력 예시는 다음과 같아. [예시) 경복궁, 광화문 광장, 청와대]. 그리고 한국어로 말해줘. 예시는 대답하지마." +
                "requestType: 'activity_spot'이 있으면 너가 그 데이터를 토대로 나에게 '액티비티한 데이트 코스'를 추천해줘. 총 10개를 말해주고 한글 9글자 이하인 장소 이름만 말해줘.다른 건 말하지 말고 결과만 나열해(예시 - a,b,c,...). 출력 예시는 다음과 같아.[예시) 홍대 점핑배틀, 홍대 액티브모드]. 그리고 한국어로 말해줘. 예시는 포함시키지마." +
                "requestType: 'season_spot'이 있으면 'LocalDate' 값을 읽고 현재의 계절을 고려해서 '계절에 어울리는 데이트 코스'를 추천해줘. 총 10개를 말해주고 한글 9글자 이하인 장소 이름만 말해주고 다른 건 말하지 말고 결과만 나열해(예시 - a,b,c,...). 그리고 한국어로 말해줘. 그리고 내가 입력한 LocalDate값에 대해 언급하지말고  예시처럼 장소만 나열해." +
                "조건: %s";
        // 캐서랠 세부 정보
        String query3 = "내가 서울의 특정 지역의 장소명을 줄거야." +
                " 그 이름을 통해 해당 장소의 상세 주소 정보, 그 장소의 간단한 설명, 네이버 지도 기준으로 장소가 검색이 되면 평점을 주고 아니면 생략해. " +
                " 그리고 한 줄 넘기고 마지막 줄에 그 장소에 대해 웹사이트 주소 링크가 있으면 보여주고 없으면 생략해줘." +
                " 문장 맨 뒤에 'isDetailInfo'는 무시해." +
                "- 각 정보들은 줄바꿈으로 구분해서 출력해 주세요.\n" +
                "- 각 활동은 주소, 설명,평점,url,  순서로 작성하세요." +
                "- 출력 예시:" +
                " - 주소: (주소)\n\n" +
                " - 설명: (간단한 설명)\n\n" +
                " - 네이버 지도 평점: (평점)이 줄은 네이버 지도 평점이 없을 시 생략해줘.\n\n" +
                " - url: '웹사이트 주소' 이 줄은 웹사이트가 없을 시 생략해줘.그리고 웹사이트 주소의 양 옆에는 어떤 특수문자도 포함시키지마.\n\n" +
                "장소명 : %s ";

        if(isRecommendationResult){
            formattedPrompt = String.format(
                    query1
                    , prompt
            );
        }
        else if(isCarousel){
            formattedPrompt = String.format(
                    query2,
                    prompt
            );
        }
        else {
            formattedPrompt = String.format(
                    query3
                    , prompt
            );
        }
        //디버깅용
//        System.out.println("Prompt: " + prompt);
//        System.out.println("FormattedPrompt: " + formattedPrompt);

        JSONObject jsonBody = new JSONObject();
        jsonBody.put("model", "gpt-4-turbo");
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