package com.recep.ailanguageapp.repository;

import com.recep.ailanguageapp.entity.SavedDialog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedDialogRepository extends JpaRepository<SavedDialog, Long> {

    List<SavedDialog> findByDeviceId(String deviceId);
}
