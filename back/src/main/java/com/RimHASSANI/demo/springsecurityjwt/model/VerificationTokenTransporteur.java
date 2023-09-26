package com.RimHASSANI.demo.springsecurityjwt.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;
import java.util.Date;

@Entity
@Data
@Table(name = "verification_token_transporteur")
@NoArgsConstructor
public class VerificationTokenTransporteur {
    private static  final int EXPIRATION_TIME = 10;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private Date expirationTime;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "transporteur_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "FK_TRANSPORTEUR_VERIFY_TOKEN"))
    private Transporteur transporteur;

    public VerificationTokenTransporteur(Transporteur transporteur, String token) {
        super();
        this.token = token;
        this.transporteur = transporteur;
        this.expirationTime = calculateExpirationDate(EXPIRATION_TIME);
    }

    public VerificationTokenTransporteur(String token) {
        super();
        this.token = token;
        this.expirationTime = calculateExpirationDate(EXPIRATION_TIME);
    }

    private Date calculateExpirationDate(int expirationTime) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE, expirationTime);
        return new Date(calendar.getTime().getTime());
    }

}
