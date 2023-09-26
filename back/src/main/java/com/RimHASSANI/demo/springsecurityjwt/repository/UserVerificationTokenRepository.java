package com.RimHASSANI.demo.springsecurityjwt.repository;

import com.RimHASSANI.demo.springsecurityjwt.model.VerificationTokenUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserVerificationTokenRepository extends JpaRepository<VerificationTokenUser,Long> {
    VerificationTokenUser findByToken(String token);
}
