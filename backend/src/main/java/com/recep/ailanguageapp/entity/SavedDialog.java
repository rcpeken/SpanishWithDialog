package com.recep.ailanguageapp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SavedDialog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String deviceId;

    private String topic;

    @Column(columnDefinition = "TEXT")
    private String content;
}
