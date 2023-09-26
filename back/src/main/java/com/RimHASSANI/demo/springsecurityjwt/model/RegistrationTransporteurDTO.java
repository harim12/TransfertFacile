package com.RimHASSANI.demo.springsecurityjwt.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class RegistrationTransporteurDTO {

    private String username;

    private String firstName;
    private String lastName;

    private Integer phoneNumber;
    private String password;
    private String email;
}
