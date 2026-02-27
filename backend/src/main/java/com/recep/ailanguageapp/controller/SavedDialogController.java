package com.recep.ailanguageapp.controller;

import com.recep.ailanguageapp.entity.SavedDialog;
import com.recep.ailanguageapp.service.SavedDialogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library/dialogs")
@RequiredArgsConstructor
public class SavedDialogController {

    private final SavedDialogService savedDialogService;

    @GetMapping
    public List<SavedDialog> getLibraryDialogs(@RequestHeader("X-Device-Id") String deviceId) {
        return savedDialogService.getDialogsByDeviceId(deviceId);
    }

        @PostMapping
     public SavedDialog saveLibraryDialog(@RequestHeader("X-Device-Id") String deviceId,@RequestBody SavedDialog savedDialog) {
         savedDialog.setDeviceId(deviceId);
         return savedDialogService.saveDialog(savedDialog);
     }

     @DeleteMapping("/{id}")
     public void deleteLibraryDialog(@PathVariable Long id) {
         savedDialogService.deleteDialog(id);
     }

}
