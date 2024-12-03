package org.example.backend.controller;

import org.example.backend.service.GPTService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class GptController {
    private final GPTService gptService;

    @Autowired
    public GptController(GPTService gptService) {
        this.gptService = gptService;
    }

    @PostMapping("/ask")
    public String ask(@RequestBody String prompt) throws JSONException {
        return gptService.ask(prompt);
    }
}