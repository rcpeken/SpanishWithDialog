package com.recep.ailanguageapp.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {


    private final Client client;

    public GeminiService(Client client) {
       this.client = client;
    }

    public String generateScenario(String topic) {


        String prompt = """
You are a Spanish language teacher.

Generate 20 distinct and useful daily conversation sentences related to the topic: """ + topic + """

Requirements:
1. Provide exactly 20 sentences.
2. Keep it A1 level.
3. Include a mix of questions and statements.
4. No grammar explanations, just the data.

Return strictly JSON format as an Array:
[
  {
    "spanish": "...",
    "pronunciation": "...",
    "english": "..."
  },
  {
    "spanish": "...",
    "pronunciation": "...",
    "english": "..."
  }
  // ... continue for 20 items
]
""";



        try {
            GenerateContentResponse response = client.models.generateContent(
                    "gemini-3-flash-preview",
                    prompt,
                    null
            );

            String raw = response.text().trim();

            if (!raw.startsWith("[")){
                raw = raw.substring(raw.indexOf("["));
            }
            if (!raw.endsWith("]")){
                raw = raw.substring(0,raw.lastIndexOf("]") + 1);
            }

            return raw;

        } catch (Exception e) {
            throw new RuntimeException("Gemini API hatası: " + e.getMessage());
        }
    }
}