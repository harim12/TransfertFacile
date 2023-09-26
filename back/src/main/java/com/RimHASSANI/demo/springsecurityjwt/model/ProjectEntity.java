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
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer projectId;
    private String userFirstName;
    private String userLastName;
    private String userPhoneNumber;
    private Double price;

    private String transporteurEmail;

    private Integer demandeId;


}
