package com.RimHASSANI.demo.springsecurityjwt.repository;

import com.RimHASSANI.demo.springsecurityjwt.model.ProjectDemandeDTO;
import com.RimHASSANI.demo.springsecurityjwt.model.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity,Integer> {
    List<ProjectEntity> findByTransporteurEmail(String email);
}
