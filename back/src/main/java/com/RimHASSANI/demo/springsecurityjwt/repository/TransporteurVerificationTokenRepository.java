package com.RimHASSANI.demo.springsecurityjwt.repository;

import com.RimHASSANI.demo.springsecurityjwt.model.VerificationTokenTransporteur;
import com.RimHASSANI.demo.springsecurityjwt.model.VerificationTokenUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransporteurVerificationTokenRepository extends JpaRepository<VerificationTokenTransporteur,Long> {
    VerificationTokenTransporteur findByToken(String token);
}
