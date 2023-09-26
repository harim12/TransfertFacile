package com.RimHASSANI.demo.springsecurityjwt.event;

import com.RimHASSANI.demo.springsecurityjwt.model.ApplicationUser;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class UserRegistrationCompleteEvent extends ApplicationEvent {

    private final ApplicationUser user;
    private final String applicationUrl;

    public UserRegistrationCompleteEvent(ApplicationUser user, String applicationUrl) {
        super(user);
        this.user = user;
        this.applicationUrl = applicationUrl;
    }
}
