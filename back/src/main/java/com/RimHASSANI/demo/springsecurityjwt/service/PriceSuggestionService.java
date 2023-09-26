package com.RimHASSANI.demo.springsecurityjwt.service;

import com.RimHASSANI.demo.springsecurityjwt.model.PriceSuggestionEntity;
import com.RimHASSANI.demo.springsecurityjwt.model.TransporteurInfo;
import com.RimHASSANI.demo.springsecurityjwt.repository.PriceSuggestionRepository;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PriceSuggestionService {

    @Autowired
    public PriceSuggestionRepository priceSuggestionRepository;
    @Autowired
    WebSocketService webSocketService;

    public PriceSuggestionEntity addPriceSuggestion(PriceSuggestionEntity priceSuggestionEntity) {
        PriceSuggestionEntity priceSuggestion =  priceSuggestionRepository.save(priceSuggestionEntity);
        notifyFrontend();
        return priceSuggestion;
    }

    public List<PriceSuggestionEntity> getPriceSuggestions(Integer demandeId) {
        return priceSuggestionRepository.findByDemandeID(demandeId);
    }

    protected String getEntityTopic(){
        return "add-price-suggestion";
    }
    public void notifyFrontend(){
        final String entityTopic = getEntityTopic();
        if(entityTopic==null){

            return;
        }
        webSocketService.sendMessage(entityTopic,"price");

    }
}
