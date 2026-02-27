package com.recep.ailanguageapp.controller;

import com.recep.ailanguageapp.dto.ScenarioRequestDTO;
import com.recep.ailanguageapp.entity.Suggestion;
import com.recep.ailanguageapp.service.GeminiService;
import com.recep.ailanguageapp.service.ScenarioService;
import com.recep.ailanguageapp.service.SuggestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/scenario")
@RequiredArgsConstructor
public class ScenarioController {

    private final GeminiService geminiService;
    private final SuggestionService suggestionService;


    @PostMapping
    public String generateScenario(@RequestBody ScenarioRequestDTO request){

       String topic = request.getTopic();

       String generatedScenario = geminiService.generateScenario(topic);

        return generatedScenario;
    }
}
