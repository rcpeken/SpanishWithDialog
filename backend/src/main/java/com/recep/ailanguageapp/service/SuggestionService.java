package com.recep.ailanguageapp.service;

import com.recep.ailanguageapp.entity.Suggestion;
import com.recep.ailanguageapp.repository.SuggestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SuggestionService {

    private  final SuggestionRepository suggestionRepository;

    public List<Suggestion> getAllSuggestions() {
        return suggestionRepository.findAll();
    }

        public Suggestion saveSuggestion(Suggestion suggestion) {
            return suggestionRepository.save(suggestion);
        }

}
