package com.RimHASSANI.demo.springsecurityjwt.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*@Entity
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("car")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter*/
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorValue("car")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VoitureDemande extends DemandeSpecific{
    // Attributs spécifiques aux voitures...

    // Getters and setters
    @JsonProperty("voitureType")
    @Column(name = "voiture_type")
    private String voitureType;

    @JsonProperty("voitureEtat")
    @Column(name = "voiture_etat")
    private String voitureEtat;


    @JsonProperty("voiturePrice")
    @Column(name = "voiture_price")
    private String voiturePrice;


}