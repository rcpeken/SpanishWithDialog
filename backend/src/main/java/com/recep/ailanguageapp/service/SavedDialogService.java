package com.recep.ailanguageapp.service;

import com.recep.ailanguageapp.entity.SavedDialog;
import com.recep.ailanguageapp.repository.SavedDialogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavedDialogService {

    private final SavedDialogRepository savedDialogRepository;

    public List<SavedDialog> getDialogsByDeviceId(String deviceId) {
        return savedDialogRepository.findByDeviceId(deviceId);
    }

    public SavedDialog saveDialog(SavedDialog savedDialog) {
        return savedDialogRepository.save(savedDialog);
    }

    public void deleteDialog(Long id) {
        savedDialogRepository.deleteById(id);
    }

}
