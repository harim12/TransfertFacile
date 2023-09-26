package com.RimHASSANI.demo.springsecurityjwt.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Colis {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer colisId;

    @Column(name = "colis_type")
    private String colisType;

    @Column(name = "colis_largeur")
    private Double colisLargeur;

    @Column(name = "colis_profendeur")
    private Double colisProfendeur;

    @Column(name = "colis_hauteur")
    private Double colisHauteur;

    @Column(name = "colis_unite")
    private Double colisUnite;

    @Column(name = "colis_poids")
    private Double colisPoids;



}
