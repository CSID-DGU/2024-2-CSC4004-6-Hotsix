package org.example.backend.service;

import org.example.backend.OpenAIApi;
import org.json.JSONException;
import org.springframework.stereotype.Service;

@Service
public class GPTService {
    private OpenAIApi openAIApi;

    public GPTService() {
        this.openAIApi = new OpenAIApi();
    }

    public String ask(String prompt) throws JSONException {
        return openAIApi.ask(prompt);
    }
}