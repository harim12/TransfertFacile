package com.RimHASSANI.demo.springsecurityjwt.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="users")
@Data

@Getter
@Setter
public class ApplicationUser implements UserDetails {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer userId;

    private String firstName;
    private String lastName;
    @Column(unique=true)
    private String email;

    private String password;

    private boolean isManuallyEnabled=false;

    private Integer phoneNumber;
    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(
            name="user_role_junction",
            joinColumns = {@JoinColumn(name="user_id")},
            inverseJoinColumns = {@JoinColumn(name="role_id")}
    )
    private Set<Role> authorities;

    public ApplicationUser() {
        super();
        authorities = new HashSet<>();
    }


    public ApplicationUser(Integer userId,String firstName,String lastName, Integer phoneNumber,String email, String password, Set<Role> authorities) {
        super();
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
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
