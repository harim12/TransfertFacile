package com.RimHASSANI.demo.springsecurityjwt.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProjectDemandeDTO {
    ProjectEntity projectEntity;
    DemandeEntity demandeEntity;
}
