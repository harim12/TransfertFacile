package com.RimHASSANI.demo.springsecurityjwt.event;

import com.RimHASSANI.demo.springsecurityjwt.model.ApplicationUser;
import com.RimHASSANI.demo.springsecurityjwt.model.Transporteur;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class TransporteurRegistrationCompleteEvent extends ApplicationEvent {

    private final Transporteur transporteur;
    private final String applicationUrl;

    public TransporteurRegistrationCompleteEvent(Transporteur user, String applicationUrl) {
        super(user);
        this.transporteur = user;
        this.applicationUrl = applicationUrl;
    }
}
