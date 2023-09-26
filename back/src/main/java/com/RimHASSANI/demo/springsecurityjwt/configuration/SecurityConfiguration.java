package com.RimHASSANI.demo.springsecurityjwt.configuration;

import com.RimHASSANI.demo.springsecurityjwt.service.TransporteurService;
import com.RimHASSANI.demo.springsecurityjwt.service.UserService;
import com.RimHASSANI.demo.springsecurityjwt.utils.RSAKeyProperties;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

    private final RSAKeyProperties keys;

    public SecurityConfiguration(RSAKeyProperties keys){
        this.keys = keys;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

   /* @Bean
    public AuthenticationManager authManager(UserDetailsService detailsService){
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        daoProvider.setUserDetailsService(detailsService);
        daoProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(daoProvider);
    }*/


   /* @Bean(name = "userAuthenticationManager")
    public AuthenticationManager userAuthenticationManager() throws Exception {
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        daoProvider.setUserDetailsService(userDetailsService);
        daoProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(daoProvider);
    }

    @Bean(name = "transporteurAuthenticationManager")
    public AuthenticationManager transporteurAuthenticationManager() throws Exception {
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        daoProvider.setUserDetailsService(transporteurDetailsService);
        daoProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(daoProvider);
    }*/


    @Bean(name = "userAuthenticationProvider")
    public AuthenticationProvider userAuthenticationProvider(@Qualifier("userService") UserDetailsService userDetailsService) {
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        daoProvider.setUserDetailsService(userDetailsService);
        daoProvider.setPasswordEncoder(passwordEncoder());
        return daoProvider;

    }

    @Bean(name = "transporteurAuthenticationProvider")
    public AuthenticationProvider transporteurAuthenticationProvider(@Qualifier("transporteurService") TransporteurService transporteurDetailsService) {
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        daoProvider.setUserDetailsService(transporteurDetailsService);
        daoProvider.setPasswordEncoder(passwordEncoder());
        return daoProvider;
    }

    @Bean(name = "userAuthenticationManager")
    @Primary
    public ProviderManager userAuthenticationManager(@Qualifier("userAuthenticationProvider") AuthenticationProvider userAuthenticationProvider) {
        return new ProviderManager(userAuthenticationProvider);
    }

    @Bean(name = "transporteurAuthenticationManager")
    public ProviderManager transporteurAuthenticationManager(@Qualifier("transporteurAuthenticationProvider") AuthenticationProvider transporteurAuthenticationProvider) {
        return new ProviderManager(transporteurAuthenticationProvider);
    }



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/auth/**").permitAll();
                    auth.requestMatchers("/transporteur/**").permitAll();
                    auth.requestMatchers("/user/**").permitAll();
                    auth.requestMatchers("/demande/**").permitAll();
                    auth.requestMatchers("/sba-websocket/**").permitAll();
                    auth.requestMatchers("/price-suggestion/**").permitAll();
                    auth.requestMatchers("/project/**").permitAll();


                    //auth.requestMatchers("/admin/**").hasRole("ADMIN");
                    //auth.requestMatchers("/user/**").hasAnyRole("ADMIN", "USER");
                    //auth.anyRequest().authenticated();
                });

        http.oauth2ResourceServer()
                .jwt()
                .jwtAuthenticationConverter(jwtAuthenticationConverter());
        http.sessionManagement(
                session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder(){
        return NimbusJwtDecoder.withPublicKey(keys.getPublicKey()).build();
    }

    @Bean
    public JwtEncoder jwtEncoder(){
        JWK jwk = new RSAKey.Builder(keys.getPublicKey()).privateKey(keys.getPrivateKey()).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter(){
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtConverter;
    }
}
