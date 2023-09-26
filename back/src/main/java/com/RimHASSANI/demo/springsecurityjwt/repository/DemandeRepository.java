package com.RimHASSANI.demo.springsecurityjwt.repository;

import com.RimHASSANI.demo.springsecurityjwt.model.DemandeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeRepository extends JpaRepository<DemandeEntity,Integer> {
}
