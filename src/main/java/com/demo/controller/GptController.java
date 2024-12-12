package com.example.demo.controller;

import com.example.demo.domain.GPTDomain;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GptController {
    private final GPTDomain gptDomain;

    @Autowired
    public GptController(GPTDomain gptDomain) {
        this.gptDomain = gptDomain;
    }

    @PostMapping("/ask")
    public String ask(@RequestBody String prompt) throws JSONException {
        return gptDomain.ask(prompt);
    }
}
