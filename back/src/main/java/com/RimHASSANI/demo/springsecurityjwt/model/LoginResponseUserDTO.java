package com.RimHASSANI.demo.springsecurityjwt.model;


public class LoginResponseUserDTO {
    private ApplicationUser user;
    private String jwt;

    public LoginResponseUserDTO(){
        super();
    }

    public LoginResponseUserDTO(ApplicationUser user, String jwt){
        this.user = user;
        this.jwt = jwt;
    }

    public ApplicationUser getUser(){
        return this.user;
    }

    public void setUser(ApplicationUser user){
        this.user = user;
    }

    public String getJwt(){
        return this.jwt;
    }

    public void setJwt(String jwt){
        this.jwt = jwt;
    }
}
