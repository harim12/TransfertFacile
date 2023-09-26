package com.RimHASSANI.demo.springsecurityjwt.service;

import com.RimHASSANI.demo.springsecurityjwt.model.*;
import com.RimHASSANI.demo.springsecurityjwt.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@Transactional
public class AuthentificationTransporteurService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransporteurRepository transporteurRepository;

    @Autowired
    private RoleRepository roleRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private TransporteurVerificationTokenRepository verificationTokenRepository;

    @Qualifier("transporteurAuthenticationManager")
    private final AuthenticationManager transporteurAuthenticationManager;

    @Autowired
    public AuthentificationTransporteurService(

            @Qualifier("transporteurAuthenticationManager") AuthenticationManager transporteurAuthenticationManager) {

        this.transporteurAuthenticationManager = transporteurAuthenticationManager;
    }

    public Transporteur registerTransporteur(String firstName, String lastName, Integer phoneNumber, String email, String password) {
        try {
            String encodedPassword = passwordEncoder.encode(password);
            Role userRole = roleRepository.findByAuthority("TRANSPORTEUR").get();

            Set<Role> authorities = new HashSet<>();
            authorities.add(userRole);

            return transporteurRepository.save(new Transporteur(0, firstName, lastName, phoneNumber, email, encodedPassword, authorities));
        } catch (DataIntegrityViolationException e) {
            // Handle the case when the email already exists
            throw new RuntimeException("Email already exists");
        }
    }

    public LoginResponseTransporteurDTO loginTransporteur(String email, String password){

        try{
            Authentication auth = this.transporteurAuthenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            String token = tokenService.generateJwt(auth);

            return new LoginResponseTransporteurDTO(transporteurRepository.findByEmail(email).get(), token);

        } catch(AuthenticationException e){
            return new LoginResponseTransporteurDTO(null, "");
        }
    }


    public void saveVerificationTokenForUser(String token, Transporteur user) {
        VerificationTokenTransporteur verificationToken
                = new VerificationTokenTransporteur(user, token);

        verificationTokenRepository.save(verificationToken);
    }


    public String validateVerificationToken(String token) {
        VerificationTokenTransporteur verificationToken = verificationTokenRepository.findByToken(token);

        if (verificationToken == null) {
            return "invalid";
        }

        Transporteur user = verificationToken.getTransporteur();
        Calendar cal = Calendar.getInstance();

        if ((verificationToken.getExpirationTime().getTime()
                - cal.getTime().getTime()) <= 0) {
            verificationTokenRepository.delete(verificationToken);
            return "expired";
        }
        user.setManuallyEnabled(true);
        transporteurRepository.save(user);  // Save the updated user
        return "valid";
    }



    public VerificationTokenTransporteur generateNewVerificationToken(String oldToken) {
        VerificationTokenTransporteur verificationToken
                = verificationTokenRepository.findByToken(oldToken);
        verificationToken.setToken(UUID.randomUUID().toString());
        verificationTokenRepository.save(verificationToken);
        return verificationToken;
    }
}
