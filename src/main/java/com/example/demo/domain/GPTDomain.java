package com.example.demo.domain;

import com.example.demo.OpenAIApi;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GPTDomain {


    private final OpenAIApi openAIApi;

    @Autowired
    public GPTDomain(OpenAIApi openAIApi) {
        this.openAIApi = openAIApi;
    }

    public String ask(String prompt) throws JSONException {
        return openAIApi.ask(prompt);
    }
}
