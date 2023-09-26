package com.RimHASSANI.demo.springsecurityjwt.controller;

import com.RimHASSANI.demo.springsecurityjwt.event.TransporteurRegistrationCompleteEvent;
import com.RimHASSANI.demo.springsecurityjwt.event.UserRegistrationCompleteEvent;
import com.RimHASSANI.demo.springsecurityjwt.model.*;
import com.RimHASSANI.demo.springsecurityjwt.service.AuthentificationTransporteurService;
import com.RimHASSANI.demo.springsecurityjwt.service.AuthentificationUserService;
import com.RimHASSANI.demo.springsecurityjwt.utils.EmailUtil;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
@Slf4j
public class AuthenticationController {

    @Autowired
    private AuthentificationUserService authentificationUserService;

    @Autowired
    private AuthentificationTransporteurService authentificationTransporteurService;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Autowired
    private EmailUtil emailUtil;

    @PostMapping("user/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationUserDTO registrationDTO, final HttpServletRequest request) {
        try {
            ApplicationUser user = authentificationUserService.registerUser(
                    registrationDTO.getFirstName(),
                    registrationDTO.getLastName(),
                    registrationDTO.getPhoneNumber(),
                    registrationDTO.getEmail(),
                    registrationDTO.getPassword()
            );
            publisher.publishEvent(new UserRegistrationCompleteEvent(
                    user,
                    applicationUrl(request)
            ));

            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            // Handle the case when the email already exists
            String errorMessage = "Email already exists";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }


    @GetMapping("/user/verifyRegistration")
    public ModelAndView verifyRegistration(@RequestParam("token") String token) {
        ModelAndView modelAndView = new ModelAndView();

        String result = authentificationUserService.validateVerificationToken(token);

        if (result.equalsIgnoreCase("valid")) {
            modelAndView.addObject("message", "User Verified Successfully");
        } else {
            modelAndView.addObject("message", "Bad User");
        }

        // Pass the token as a model attribute
        modelAndView.setViewName("verificationPage"); // Specify the name of your HTML template here
        return modelAndView;
    }


    @PostMapping("/user/login")
    public LoginResponseUserDTO loginUser(@RequestBody RegistrationUserDTO body){
        return authentificationUserService.loginUser(
                body.getEmail(),
                body.getPassword());
    }

    @PostMapping("/transporteur/register")
    public ResponseEntity<?> registerTransporteur(@RequestBody RegistrationTransporteurDTO body, final HttpServletRequest request) {
        try {
            Transporteur transporteur = authentificationTransporteurService.registerTransporteur(
                    body.getFirstName(),
                    body.getLastName(),
                    body.getPhoneNumber(),
                    body.getEmail(),
                    body.getPassword()
            );

            publisher.publishEvent(new TransporteurRegistrationCompleteEvent(
                    transporteur,
                    applicationUrl(request)
            ));


            // Return a successful response with the created transporteur
            return ResponseEntity.ok(transporteur);
        } catch (RuntimeException e) {
            // Handle the case when the email already exists
            String errorMessage = "Email already exists";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }


    @PostMapping("/transporteur/login")
    public LoginResponseTransporteurDTO loginTransporteur(@RequestBody RegistrationUserDTO body){
        return authentificationTransporteurService.loginTransporteur(
                body.getEmail(),
                body.getPassword());
    }


    @GetMapping("/transporteur/verifyRegistration")
    public ModelAndView verifyRegistrationTransporteur(@RequestParam("token") String token) {
        ModelAndView modelAndView = new ModelAndView();
        String result = authentificationTransporteurService.validateVerificationToken(token);

        if (result.equalsIgnoreCase("valid")) {
            modelAndView.addObject("message", "Transporteur Verified Successfully");
        } else {
            modelAndView.addObject("message", "Bad transporteur");
        }

        modelAndView.setViewName("verificationPage"); // Specify the name of your HTML template here
        return modelAndView;
    }




    @GetMapping("/transporteur/resendVerifyToken")
    public String resendVerificationTokenTransporteur(@RequestParam("token") String oldToken,
                                                      HttpServletRequest request) {
        VerificationTokenTransporteur verificationToken
                = authentificationTransporteurService.generateNewVerificationToken(oldToken);
        Transporteur transporteur = verificationToken.getTransporteur();
        resendVerificationTokenMailTransporteur(transporteur, applicationUrl(request), verificationToken);
        return "Verification Link Sent";
    }
    private void resendVerificationTokenMail(ApplicationUser user, String applicationUrl, VerificationTokenUser verificationToken) {
        String url =
                applicationUrl
                        + "/user/verifyRegistration?token="
                        + verificationToken.getToken();

        try {
            emailUtil.sendOtpEmail(user.getEmail(), verificationToken.getToken(),url);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }


        log.info("Click the link to verify your account: {}",
                url);
    }


    private void resendVerificationTokenMailTransporteur(Transporteur user, String applicationUrl, VerificationTokenTransporteur verificationToken) {
        String url =
                applicationUrl
                        + "/transporteur/verifyRegistration?token="
                        + verificationToken.getToken();

        //sendVerificationEmail()

        try {
            emailUtil.sendOtpEmail(user.getEmail(), verificationToken.getToken(),url);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }


        log.info("Click the link to verify your account: {}",
                url);
    }

    private String applicationUrl(HttpServletRequest request) {
        return "http://" +
                request.getServerName() +
                ":" +
                request.getServerPort() +
                "/auth"+
                request.getContextPath();
    }





}
