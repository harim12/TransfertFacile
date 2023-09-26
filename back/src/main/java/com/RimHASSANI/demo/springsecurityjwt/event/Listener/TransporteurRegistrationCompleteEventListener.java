package com.RimHASSANI.demo.springsecurityjwt.event.Listener;

import com.RimHASSANI.demo.springsecurityjwt.event.TransporteurRegistrationCompleteEvent;
import com.RimHASSANI.demo.springsecurityjwt.model.ApplicationUser;
import com.RimHASSANI.demo.springsecurityjwt.model.Transporteur;
import com.RimHASSANI.demo.springsecurityjwt.service.AuthentificationTransporteurService;
import com.RimHASSANI.demo.springsecurityjwt.service.AuthentificationUserService;
import com.RimHASSANI.demo.springsecurityjwt.utils.EmailUtil;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Slf4j
public class TransporteurRegistrationCompleteEventListener implements ApplicationListener<TransporteurRegistrationCompleteEvent> {
    @Autowired
    private AuthentificationTransporteurService transporteurService;

    @Autowired
    private EmailUtil emailUtil;

    @Override
    public void onApplicationEvent(TransporteurRegistrationCompleteEvent event) {
        //Create the Verification Token for the User with Link
        Transporteur transporteur = event.getTransporteur();
        String token = UUID.randomUUID().toString();
        transporteurService.saveVerificationTokenForUser(token,transporteur);

        String url =
                event.getApplicationUrl()
                        + "/transporteur/verifyRegistration?token="
                        + token;

        //sendVerificationEmail()

        try {
            emailUtil.sendOtpEmail(transporteur.getEmail(), token,url);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }
        log.info("Click the link to verify your account teste url: {}",
                url);
    }
}
