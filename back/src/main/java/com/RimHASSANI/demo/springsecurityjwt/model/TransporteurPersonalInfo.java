package com.RimHASSANI.demo.springsecurityjwt.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TransporteurPersonalInfo {
    private String firstName;
    private String lastName;
    private String imageUrl;
    private Integer phoneNumber;
    private String city;
    private String email;
}