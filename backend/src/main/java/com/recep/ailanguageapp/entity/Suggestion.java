package com.recep.ailanguageapp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Suggestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topic;

    @Column(columnDefinition = "TEXT")
    private String content;
}
