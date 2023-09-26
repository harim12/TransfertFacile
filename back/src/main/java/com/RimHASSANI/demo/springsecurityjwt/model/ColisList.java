package com.RimHASSANI.demo.springsecurityjwt.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorValue("colis")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ColisList extends DemandeSpecific{
    @Column(name = "colis_type")
    private String colisType;

    @Column(name = "colis_largeur")
    private String colisLargeur;

    @Column(name = "colis_profendeur")
    private String colisProfondeur;

    @Column(name = "colis_hauteur")
    private String colisHauteur;

    @Column(name = "colis_unite")
    private String colisUnite;

    @Column(name = "colis_poids")
    private String colisPoids;


}
