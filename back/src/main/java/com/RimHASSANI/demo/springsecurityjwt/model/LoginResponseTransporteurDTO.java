package com.RimHASSANI.demo.springsecurityjwt.model;

public class LoginResponseTransporteurDTO {
    private Transporteur transporteur;
    private String jwt;

    public LoginResponseTransporteurDTO(){
        super();
    }

    public LoginResponseTransporteurDTO(Transporteur transporteur, String jwt){
        this.transporteur = transporteur;
        this.jwt = jwt;
    }

    public Transporteur getUser(){
        return this.transporteur;
    }

    public void setUser(Transporteur transporteur){
        this.transporteur = transporteur;
    }

    public String getJwt(){
        return this.jwt;
    }

    public void setJwt(String jwt){
        this.jwt = jwt;
    }
}
