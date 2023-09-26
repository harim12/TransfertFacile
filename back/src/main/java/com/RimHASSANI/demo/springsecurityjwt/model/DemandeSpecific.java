package com.RimHASSANI.demo.springsecurityjwt.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = MeubleDemande.class, name = "house"),
        @JsonSubTypes.Type(value = VoitureDemande.class, name = "car"),
        @JsonSubTypes.Type(value = MotoDemande.class, name = "moto"),
        @JsonSubTypes.Type(value = ColisList.class, name = "colis")

})


@Getter
@Setter
public abstract class DemandeSpecific {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="demande_specific_id")
    private Long demande_specific_id;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "demande_id")
    private DemandeEntity demandeEntity;





    // Add a default constructor
    public DemandeSpecific() {
    }
    // Getters and setters*/
}