package com.RimHASSANI.demo.springsecurityjwt.service;

import com.RimHASSANI.demo.springsecurityjwt.model.*;
import com.RimHASSANI.demo.springsecurityjwt.repository.RoleRepository;
import com.RimHASSANI.demo.springsecurityjwt.repository.TransporteurRepository;
import com.RimHASSANI.demo.springsecurityjwt.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {
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

    public ApplicationUser registerUser(String firstName, String lastName,Integer phoneNumber,String email,String password){

        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);

        return userRepository.save(new ApplicationUser(0, firstName,lastName,phoneNumber,email, encodedPassword, authorities));
    }

    public LoginResponseUserDTO loginUser(String email, String password){

        try{
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            String token = tokenService.generateJwt(auth);

            return new LoginResponseUserDTO(userRepository.findByEmail(email).get(), token);

        } catch(AuthenticationException e){
            return new LoginResponseUserDTO(null, "");
        }
    }



    public Transporteur registerTransporteur(String firstName, String lastName, Integer phoneNumber, String email, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("TRANSPORTEUR").get();

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);

        return transporteurRepository.save(new Transporteur(0, firstName,lastName,phoneNumber,email, encodedPassword, authorities));

    }
}
