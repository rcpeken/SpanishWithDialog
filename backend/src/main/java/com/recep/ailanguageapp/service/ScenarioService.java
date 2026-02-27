package com.recep.ailanguageapp.service;

import org.springframework.stereotype.Service;

@Service
public class ScenarioService {
    public String generateScenario(String topic) {

            return "Generated scenario for topic: " + topic;
        }
}
