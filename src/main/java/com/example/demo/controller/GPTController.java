package com.example.demo.controller;

import com.example.demo.domain.GPTDomain;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class GPTController {
    private final GPTDomain gptDomain;

    @Autowired
    public GPTController(GPTDomain gptDomain) {
        this.gptDomain = gptDomain;
    }

    @PostMapping("/ask")
    public String ask(@RequestBody String prompt) throws JSONException {
        return gptDomain.ask(prompt);
    }
}
