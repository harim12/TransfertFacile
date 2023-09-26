package com.RimHASSANI.demo.springsecurityjwt.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DemandeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer demandeId;

    private String villeDepart;
    private String villeArrivee;
    private String adresseDepart;
    private String adresseArrivee;

    private String horaire;

    private String firstImageUrl;
    private String secondImageUrl;
    private String thirdImageUrl;
    private String informationSpecial;
    private String trajet;
    @OneToOne(mappedBy = "demandeEntity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "demande_id")
    private DemandeSpecific specificDemande;
}
