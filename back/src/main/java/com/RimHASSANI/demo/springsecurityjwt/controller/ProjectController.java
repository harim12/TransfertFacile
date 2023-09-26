package com.RimHASSANI.demo.springsecurityjwt.controller;

import com.RimHASSANI.demo.springsecurityjwt.model.ProjectDemandeDTO;
import com.RimHASSANI.demo.springsecurityjwt.model.ProjectEntity;
import com.RimHASSANI.demo.springsecurityjwt.service.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @PostMapping("/add")
    public ProjectEntity addProject(@RequestBody ProjectEntity projectEntity){
        return projectService.addProject(projectEntity);
    }
    @GetMapping("/get/{transporteurEmail}")
    public List<ProjectEntity> getProjectsWithDemande(@PathVariable String transporteurEmail){
        return projectService.getProjects(transporteurEmail);
    }
}
