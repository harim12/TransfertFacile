package com.RimHASSANI.demo.springsecurityjwt.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TransporteurVehiculeInfo {

    private String imageVehiculeUrl;
    private String driverLiscence;
    private String nationalIdentity;
    private String vehiculeRegistrationNumber;

    private String email;

}
