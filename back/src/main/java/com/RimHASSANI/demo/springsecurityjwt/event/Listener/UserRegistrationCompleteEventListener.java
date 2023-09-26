package com.RimHASSANI.demo.springsecurityjwt.event.Listener;

import com.RimHASSANI.demo.springsecurityjwt.event.UserRegistrationCompleteEvent;
import com.RimHASSANI.demo.springsecurityjwt.model.ApplicationUser;
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
public class UserRegistrationCompleteEventListener implements
        ApplicationListener<UserRegistrationCompleteEvent> {

    @Autowired
    private AuthentificationUserService userService;

    @Autowired
    private EmailUtil emailUtil;

    @Override
    public void onApplicationEvent(UserRegistrationCompleteEvent event) {
        //Create the Verification Token for the User with Link
        ApplicationUser user = event.getUser();
        String token = UUID.randomUUID().toString();
        userService.saveVerificationTokenForUser(token,user);

        String url =
                event.getApplicationUrl()
                        + "/user/verifyRegistration?token="
                        + token;

        //sendVerificationEmail()

        try {
            emailUtil.sendOtpEmail(user.getEmail(), token,url);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }
        log.info("Click the link to verify your account: {}",
                url);


    }
}
