package com.RimHASSANI.demo.springsecurityjwt.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="transporteurs")
@Data

@Getter
@Setter
public class Transporteur implements UserDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer transporteurId;

    private String firstName;
    private String lastName;

    private Integer phoneNumber;

    @Column(unique=true)
    private String email;

    private String password;

    private String carType;

    private String imageUrl;
    private String streetAddress;
    private String city;
    private String nameOnCard;
    private String cardExpiry;

    private String ccvCard;
    private String paymentCardNum;

    private String imageVehiculeUrl;

    private String driverLiscence;
    private String nationalIdentity;
    private String vehiculeRegistrationNumber;

    private boolean isManuallyEnabled=false;
    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
            name="transporteur_role_junction",
            joinColumns = {@JoinColumn(name="transporteur_id")},
            inverseJoinColumns = {@JoinColumn(name="role_id")}
    )
    private Set<Role> authorities;

    public Transporteur() {
        super();
        authorities = new HashSet<>();
    }


    public Transporteur(Integer transporteurId,String firstName,String lastName,Integer phoneNumber,String email, String password, Set<Role> authorities,
                        String streetAddress,String city,String imageUrl,String nameOnCard,String paymentCardNum,String cardExpiry,String ccvCard,
                        String imageVehiculeUrl,String driverLiscence,String nationalIdentity,String vehiculeRegistrationNumber) {
        super();
        this.transporteurId = transporteurId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.streetAddress = streetAddress;
        this.city = city;
        this.paymentCardNum = paymentCardNum;
        this.imageUrl = imageUrl;
        this.nameOnCard = nameOnCard;
        this.cardExpiry = cardExpiry;
        this.ccvCard = ccvCard;
        this.imageVehiculeUrl = imageVehiculeUrl;
        this.driverLiscence = driverLiscence;
        this.nationalIdentity = nationalIdentity;
        this.vehiculeRegistrationNumber = vehiculeRegistrationNumber;
    }

    public Transporteur(Integer transporteurId, String firstName, String lastName, Integer phoneNumber, String email, String encodedPassword, Set<Role> authorities) {
        super();
        this.transporteurId = transporteurId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = encodedPassword;
        this.authorities = authorities;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        return this.authorities;
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return this.password;
    }



    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return this.email;
    }



    /* If you want account locking capabilities create variables and ways to set them for the methods below */
    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return isManuallyEnabled;
    }
}
