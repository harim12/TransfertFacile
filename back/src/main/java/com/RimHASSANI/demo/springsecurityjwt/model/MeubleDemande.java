package com.RimHASSANI.demo.springsecurityjwt.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorValue("meuble")
@Getter
@Setter


public class MeubleDemande extends DemandeSpecific {

    @JsonProperty("items")
    @Column(name = "items")
    private String items;

    @JsonProperty("enlevementType")
    @Column(name = "enlevementType")
    private String enlevementType;
    @JsonProperty("enlevementEtage")
    @Column(name = "enlevementEtage")
    private String enlevementEtage;
    @JsonProperty("enlevementAvecSansAssenceur")
    @Column(name = "enlevementAvecSansAssenceur")
    private String enlevementAvecSansAssenceur;

    @JsonProperty("livraisonType")
    @Column(name = "livraisonType")
    private String livraisonType;

    @JsonProperty("livraisonEtage")
    @Column(name = "livraisonEtage")
    private String livraisonEtage;

    @JsonProperty("livraisonAvecSansAssenceur")
    @Column(name = "livraisonAvecSansAssenceur")
    private String livraisonAvecSansAssenceur;




}
