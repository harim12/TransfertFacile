package com.RimHASSANI.demo.springsecurityjwt.repository;

import com.RimHASSANI.demo.springsecurityjwt.model.ApplicationUser;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser,Integer> {
    Optional<ApplicationUser> findByEmail(String email);

    @Query(value = "SELECT u.first_name, u.last_name, u.phone_number FROM users u WHERE u.email = :email", nativeQuery = true)
    Tuple getUserByEmail(String email);
}
