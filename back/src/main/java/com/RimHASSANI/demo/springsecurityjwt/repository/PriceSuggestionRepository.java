package com.RimHASSANI.demo.springsecurityjwt.repository;

import com.RimHASSANI.demo.springsecurityjwt.model.PriceSuggestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriceSuggestionRepository extends JpaRepository<PriceSuggestionEntity,Integer> {
    List<PriceSuggestionEntity> findByDemandeID(Integer demandeID);
}
