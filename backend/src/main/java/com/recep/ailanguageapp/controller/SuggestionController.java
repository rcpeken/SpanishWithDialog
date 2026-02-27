package com.recep.ailanguageapp.controller;

import com.recep.ailanguageapp.entity.Suggestion;
import com.recep.ailanguageapp.service.SuggestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suggestions")
@RequiredArgsConstructor
public class SuggestionController {

    private final SuggestionService suggestionService;

    @GetMapping
    public List<Suggestion> getAllSuggestions() {
        return suggestionService.getAllSuggestions();
    }

    @PostMapping
     public Suggestion saveSuggestion(@RequestBody Suggestion suggestion) {
         return suggestionService.saveSuggestion(suggestion);
     }

}
