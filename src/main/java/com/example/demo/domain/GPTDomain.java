package com.example.demo.domain;

import com.example.demo.OpenAIApi;
import org.json.JSONException;

public class GPTDomain {
    private OpenAIApi openAIApi;

    public GPTDomain() {
        this.openAIApi = new OpenAIApi();
    }

    public String ask(String prompt) throws JSONException {
        return openAIApi.ask(prompt);
    }
}
