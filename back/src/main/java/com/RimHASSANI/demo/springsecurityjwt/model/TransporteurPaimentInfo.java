package com.RimHASSANI.demo.springsecurityjwt.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TransporteurPaimentInfo {
    private String cardExpiry;
    private String ccvCard;
    private String paymentCardNum;
    private String nameOnCard;

    private String streetAddress;
    private String city;


    private String email;
}

