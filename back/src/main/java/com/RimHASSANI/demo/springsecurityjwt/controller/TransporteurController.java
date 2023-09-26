package com.RimHASSANI.demo.springsecurityjwt.controller;

import com.RimHASSANI.demo.springsecurityjwt.model.*;
import com.RimHASSANI.demo.springsecurityjwt.service.TransporteurService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("transporteur")
@CrossOrigin(origins = "http://localhost:4200")
public class TransporteurController {
    @Autowired
    private TransporteurService transporteurService;

    @GetMapping("/get/{email}/info")
    public ResponseEntity<TransporteurInfo> getTransporteurInfo(@PathVariable String email) {
        TransporteurInfo transporteurInfo = transporteurService.getTransporteurInfoByEmail(email);
        if (transporteurInfo != null) {
            return ResponseEntity.ok(transporteurInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get/{email}/personal-info")
    public ResponseEntity<TransporteurPersonalInfo> getTransporteurPersonalInfo(@PathVariable String email) {
        TransporteurPersonalInfo transporteurPersonalInfo = transporteurService.getTransporteurPersonalInfoByEmail(email);
        if (transporteurPersonalInfo != null) {
            return ResponseEntity.ok(transporteurPersonalInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/update-personal-info")
    public TransporteurPersonalInfo addTeste(@RequestParam("testeEntity") String testDataJson,
                                  @RequestParam(value = "image", required = false) MultipartFile image){
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            TransporteurPersonalInfo transporteurPersonalInfo = objectMapper.readValue(testDataJson, TransporteurPersonalInfo.class);
            String imagePath = "C:\\Users\\hassa\\OneDrive\\Documents\\GitHub\\TransfertFacile\\front\\src\\assets\\assetsBack" + image.getOriginalFilename();
            Files.copy(image.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING);

            transporteurPersonalInfo.setImageUrl(imagePath);

            return transporteurService.updateTransporteurInfo(transporteurPersonalInfo,imagePath);

        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/get/{email}/paiment-info")
    public ResponseEntity<TransporteurPaimentInfo> getTransporteurPaimentInfo(@PathVariable String email) {
        TransporteurPaimentInfo transporteurPersonalInfo = transporteurService.getTransporteurPaimentInfo(email);
        if (transporteurPersonalInfo != null) {
            return ResponseEntity.ok(transporteurPersonalInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/paiment-info")
    public ResponseEntity<TransporteurPaimentInfo> updateTransporteurPaimentInfo(@RequestBody TransporteurPaimentInfo transporteurPaimentInfo){
        return transporteurService.updateTransporteurPaimentInfo(transporteurPaimentInfo);
    }

    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody PasswordEntity passwordEntity){
        System.out.println("inside the update function");

        return transporteurService.changePassword(passwordEntity);
    }

    @GetMapping("/get/{email}/vehicule-info")
    public ResponseEntity<TransporteurVehiculeInfo> getTransporteurVehiculeInfo(@PathVariable String email) {
        TransporteurVehiculeInfo transporteurVehiculeInfo = transporteurService.getTransporteurVehiculeInfo(email);
        if (transporteurVehiculeInfo != null) {
            return ResponseEntity.ok(transporteurVehiculeInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update-vehicule-info")
    public ResponseEntity<TransporteurVehiculeInfo> updateVehiculeInfo(@RequestParam("testeEntity") String testDataJson,
                                             @RequestParam(value = "image", required = false) MultipartFile image){
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println("updating vehicule=============================" +
                ">");
        try {
            TransporteurVehiculeInfo transporteurVehiculeInfo = objectMapper.readValue(testDataJson, TransporteurVehiculeInfo.class);
            String imagePath = "C:\\Users\\hassa\\OneDrive\\Documents\\GitHub\\TransfertFacile\\front\\src\\assets\\assetsBack" + image.getOriginalFilename();
            Files.copy(image.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING);

            transporteurVehiculeInfo.setImageVehiculeUrl(imagePath);

            return transporteurService.updateTransporteurVehiculeInfo(transporteurVehiculeInfo,imagePath);

        } catch (Exception e) {
            return null;
        }
    }


}
