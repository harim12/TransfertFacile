package com.RimHASSANI.demo.springsecurityjwt.controller;

import com.RimHASSANI.demo.springsecurityjwt.model.PriceSuggestionEntity;
import com.RimHASSANI.demo.springsecurityjwt.model.TransporteurPersonalInfo;
import com.RimHASSANI.demo.springsecurityjwt.service.PriceSuggestionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/price-suggestion")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class PriceSuggestionController {

    @Autowired
    private PriceSuggestionService priceSuggestionService;

   @PostMapping("/add")
    public PriceSuggestionEntity addPriceSuggestion(@RequestBody PriceSuggestionEntity priceSuggestionDTO){
        return priceSuggestionService.addPriceSuggestion(priceSuggestionDTO);
    }


    @GetMapping("/get/{demandeId}")
    public List<PriceSuggestionEntity> getPriceSuggestions(@PathVariable Integer demandeId){
        return priceSuggestionService.getPriceSuggestions(demandeId);
    }


}
