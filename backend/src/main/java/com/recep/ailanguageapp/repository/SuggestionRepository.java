package com.recep.ailanguageapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.recep.ailanguageapp.entity.Suggestion;

public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {

}
