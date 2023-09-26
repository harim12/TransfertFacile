package com.RimHASSANI.demo.springsecurityjwt.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TesteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer testeId;

    private String villeDepart;

    //private String imagePath;
}
