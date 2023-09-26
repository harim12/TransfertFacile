package com.RimHASSANI.demo.springsecurityjwt.service;

import com.RimHASSANI.demo.springsecurityjwt.model.ProjectDemandeDTO;
import com.RimHASSANI.demo.springsecurityjwt.model.ProjectEntity;
import com.RimHASSANI.demo.springsecurityjwt.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    WebSocketService webSocketService;

    public ProjectEntity addProject(ProjectEntity projectEntity) {
        ProjectEntity project = projectRepository.save(projectEntity);
        notifyFrontend();
        return project;
    }

    protected String getEntityTopic(){
        return "change";
    }
    public void notifyFrontend(){
        final String entityTopic = getEntityTopic();
        if(entityTopic==null){

            return;
        }
        webSocketService.sendMessage(entityTopic,"project");

    }

    public List<ProjectEntity> getProjects(String email) {
        return projectRepository.findByTransporteurEmail(email);
    }
}
