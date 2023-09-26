package com.RimHASSANI.demo.springsecurityjwt.service;

import com.RimHASSANI.demo.springsecurityjwt.model.*;
import com.RimHASSANI.demo.springsecurityjwt.repository.DemandeRepository;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DemandeService {

    @Autowired
    private DemandeRepository demandeRepository;

    @Autowired WebSocketService webSocketService;
    public DemandeEntity addDemande(DemandeEntity demandeEntity) {

        DemandeSpecific specificDemande = demandeEntity.getSpecificDemande();
       if (specificDemande != null) {
            // Create an instance of the specific demande (e.g., CarDemande or MeubleDemande)
            if (specificDemande instanceof VoitureDemande) {
                VoitureDemande carDemande = (VoitureDemande) specificDemande;

            } else if (specificDemande instanceof MeubleDemande) {
                MeubleDemande meubleDemande = (MeubleDemande) specificDemande;
                // Set attributes specific to MeubleDemande
            } else if(specificDemande instanceof MotoDemande){
                MotoDemande motoDemande = (MotoDemande) specificDemande;
            } else if (specificDemande instanceof ColisList) {
                ColisList colisList = (ColisList) specificDemande;

                // Set the relationship between ColisList and Colis items
                /*for (Colis colis : colisList.getColisItems()) {
                    colis.setColisList(colisList);
                }*/
            }

            specificDemande.setDemandeEntity(demandeEntity);
        }
        DemandeEntity demande  = demandeRepository.save(demandeEntity);
        notifyFrontend();

        return demande ;
    }

    public List<DemandeEntity> getDemandes() {
        return demandeRepository.findAll();
    }

    protected String getEntityTopic(){
        return "change";
    }
    public void notifyFrontend(){
        final String entityTopic = getEntityTopic();
        if(entityTopic==null){

            return;
        }
        System.out.println("sending message to front"+entityTopic);
        webSocketService.sendMessage(entityTopic,"demande");

    }

    public DemandeEntity getDemandeById(Integer id) {
        Optional<DemandeEntity> demandeOptional = demandeRepository.findById(id);
        return demandeOptional.orElse(null);
    }



}
