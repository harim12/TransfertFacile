package com.RimHASSANI.demo.springsecurityjwt;

import com.RimHASSANI.demo.springsecurityjwt.model.ApplicationUser;
import com.RimHASSANI.demo.springsecurityjwt.model.Role;
import com.RimHASSANI.demo.springsecurityjwt.repository.RoleRepository;
import com.RimHASSANI.demo.springsecurityjwt.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class                                                                                                                                                                      Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncode){
		return args ->{
			if(roleRepository.findByAuthority("TRANSPORTEUR").isPresent()) return;
			Role adminRole = roleRepository.save(new Role("TRANSPORTEUR"));
			roleRepository.save(new Role("USER"));

			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);


		};
	}
}