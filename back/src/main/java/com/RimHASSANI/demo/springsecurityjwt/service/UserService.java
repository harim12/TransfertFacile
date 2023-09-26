package com.RimHASSANI.demo.springsecurityjwt.service;

import com.RimHASSANI.demo.springsecurityjwt.model.DemandeEntity;
import com.RimHASSANI.demo.springsecurityjwt.model.TransporteurInfo;
import com.RimHASSANI.demo.springsecurityjwt.model.UserInfo;
import com.RimHASSANI.demo.springsecurityjwt.repository.UserRepository;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        System.out.println("In the user details service");

        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));
    }


    public UserInfo getUserInfoByEmail(String email) {
        Tuple tuple = userRepository.getUserByEmail(email);

        if (tuple != null) {
            String firstName = tuple.get("first_name", String.class);
            String lastName = tuple.get("last_name", String.class);
            Integer phoneNumber = tuple.get("phone_number", Integer.class);

            return new UserInfo(firstName, lastName, phoneNumber);
        }

        return null;
    }
}



